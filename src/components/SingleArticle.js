import React from "react";
import Loader from "./Loader";
import { articlesURL, ROOT_URL,localstoragkey } from "../utils/Constant";
 import { Link, NavLink } from "react-router-dom";
import CreateComment from "./CreateComment";
import ShowComment from "./ShowComment";
import { withRouter } from 'react-router';

class SingleArticle extends React.Component{
    state = {
        article: null,
        error:"",
    }
    componentDidMount(){
        let slug = this.props.match.params.slug;
        fetch(articlesURL + "/" + slug).then((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json()
        }).then((data) => this.setState({article:data.article}))
        .catch((error) => this.setState({error:"Not able to fetch articles!"}));
    }

    handleDelete = () => {
        let slug = this.props.match.params.slug;
        let storagekey = localStorage[localstoragkey];
        fetch(ROOT_URL + `articles/${slug}`, {
            method:"DELETE",
            headers:{
                Authorization: `Token ${storagekey}`,
            },
        }).then((res) => {
            this.props.history.push('/');
        })
    }
    render(){
        let {article,error} = this.state;
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
                                this.props.user ? (
                                    <div>
                                        <button className="border-2 border-red-500 text-red-500 p-1 ml-2" onClick={this.handleDelete}>Delete Post</button>
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
                         article.tagList.map((tag,i)=>(
                             <span key={i} className=" border-2 border-gray-300 text-gray-300 px-3 rounded-3xl font-semibold">{tag}</span>
                         ))
                     }
                     <hr className='mt-10'/>
                </div>
                {
                    this.props.user === null ? (
                    <footer className="text-center">
                        <p>
                            <Link className="text-green-500" to='/login'>Sign in</Link> or  
                            <Link className="text-green-500 ml-1" to='/signup'>Sign up</Link> to add comment on this article.
                        </p>
                    </footer>):<> <CreateComment  slug={this.props.match.params.slug}/><ShowComment slug={this.props.match.params.slug}/></>
                }
            </section>
        )
   }
}

export default withRouter(SingleArticle);