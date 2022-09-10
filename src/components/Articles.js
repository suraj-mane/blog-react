import {NavLink,Link} from "react-router-dom";

function Articles(props){
    return(
        <div className="container w-3/4 px-3">
            <ul className="flex border-b-2">
                <li className=""><NavLink to="/" className={({ isActive }) => (isActive ? 'border-b-2 border-green-500' : 'inactive')} >Globel Feed</NavLink></li>
                {
                    props.tag ?  <li className="ml-2"><NavLink to={`/#${props.tag}`} className={({ isActive }) => (isActive ? 'border-b-2 border-green-500' : 'inactive')}>#{props.tag}</NavLink></li> : ""
                }
            </ul>
            {
                props.articles.length ?
                <div>
                    {
                        props.articles.map((ele,i) => (
                            <div key={i} className="border-b-2">
                                <div className="flex mt-5 mb-2 justify-between">
                                    <div className="flex">
                                        <img className="rounded-full w-10 h-10" src={ele.author.image} alt="author_name"/>
                                        <div className="ml-2">
                                            <h5 className="text-green-500">{ele.author.username}</h5>
                                        </div>
                                    </div>
                                    <div className="">
                                        {
                                            <p className="border-2 border-green-500 px-3 rounded text-green-500"><i className="fa-solid fa-heart"></i>  {ele.favoritesCount}</p> 
                                        }
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-semibold break-all"><Link to={`/singleArticle/:${ele.slug}`}>{ele.title}</Link></h1>
                                    <p className="text-gray-300">{ele.description}</p>
                                    <div className="flex justify-between my-5">
                                        <p className=" text-gray-300"><NavLink  to={`/singleArticle/:${ele.slug}`}>Read more...</NavLink></p>
                                        <div className="flex">
                                            {
                                                ele.tagList.map((tag,i)=>(
                                                    <p key={i} className=" border-2 border-gray-300 text-gray-300 px-3  mx-1 rounded-3xl font-semibold">{tag}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div> : <p className="mt-5 text-2xl font-semibold">Loading.....</p>
            }
        </div>
    )
}

export default Articles;