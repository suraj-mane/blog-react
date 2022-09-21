import React from "react";
import { Link, NavLink,withRouter } from "react-router-dom";
import { articlesURL, ROOT_URL,localstoragkey } from "../utils/Constant";
import Loader from "./Loader";
import CreateComment from "./CreateComment";
import ShowComment from "./ShowComment";

class SingleArticle extends React.Component{
    constructor() {
        super();
        this.state = {
            article: null,
            error:"",
        }
    }

    componentDidMount(){
        const {slug} = this.props.match.params;
        const URL = `/${slug}`;
        fetch(articlesURL + URL).then((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json()
        }).then((data) => this.setState({article:data.article}))
        .catch((error) => this.setState({error}));
    }

    handleDelete = () => {
        const {slug} = this.props.match.params.slug;
        const storagekey = localStorage[localstoragkey];
        const URL = `articles/${slug}`
        fetch(ROOT_URL + URL , {
            method:"DELETE",
            headers:{
                Authorization: `Token ${storagekey}`,
            },
        }).then( 
            this.props.history.push('/')
        )
    }

    render(){

        const {article,error} = this.state;
        const {user} = this.props;
        const {slug} = this.props.match.params;
        if(error){
            return <p>{error}</p>
        }
        if(!article) {
            return (
                <Loader/>
            )
        } 

        return(
            <section>  
                <div className="bg-gray-700">
                    <div className="py-10 container w-10/12 mx-auto">
                         <h1 className="font-semibold text-6xl text-gray-50">{article.title}</h1>
                         <div className="flex mt-10">
                             <img className="rounded-full w-10 h-10" src={article.author.image} alt="author_name"/>
                             <div className="ml-2">
                                <h5 className="text-gray-50">{article.author.username}</h5>
                             </div>
                            {
                                user ? (
                                    <div>
                                        <button className="border-2 border-red-500 text-red-500 p-1 ml-2" type="button" onClick={this.handleDelete}>Delete Post</button>
                                        <NavLink className="text-green-500 border-2 border-green-500 p-1 ml-2" to={`/new-post/${article.slug}`}>Edit Post</NavLink>
                                    </div>
                                ) : " "
                            }
                         </div>
                     </div>
                 </div>
                 <div className='container w-10/12 mx-auto'>
                     <p className='text-2xl my-10'>{article.body}</p>
                     {
                         article.tagList.map(tag  => (
                             <span  className=" border-2 border-gray-300 text-gray-300 px-3 rounded-3xl font-semibold" key={tag}>{tag}</span>
                         ))
                     }
                     <hr className='mt-10'/>
                </div>
                {
                    user === null ? 
                    (
                    <footer className="text-center">
                        <p>
                            <Link className="text-green-500" to='/login'>Sign in</Link> or  
                            <Link className="text-green-500 ml-1" to='/signup'>Sign up</Link> to add comment on this article.
                        </p>
                    </footer>
                    ):<> <CreateComment  slug={slug}/><ShowComment slug={slug}/></>
                }
            </section>
        )
   }
}

export default withRouter(SingleArticle);