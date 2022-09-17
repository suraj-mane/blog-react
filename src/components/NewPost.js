import React from "react";
import { addPostURL, ROOT_URL } from "../utils/Constant";
import { localstoragkey } from "../utils/Constant";
import { withRouter } from 'react-router';


class NewPost extends React.Component{
    state = {
        title:"",
        description:"",
        body:"",
        tag:"",
        error:"",
    }

    componentDidMount(){
        this.getPost();
    }

    getPost = () => {
        let slug = this.props.match.params.slug;
        fetch(ROOT_URL + `articles/${slug}`, {
            method:"GET",
        }).then((res) => res.json())
        .then((data) => {
            let article = data.article
            this.setState(article);
        });
    }
    
    handelChange = (event) => {
        let {name, value} = event.target;
        this.setState({[name]:value})
    }

    addPost = (event) => {
        event.preventDefault();
        let {title,description,body,tag} = this.state;
        let tagList = tag.split(" ");
        let storagekey = localStorage[localstoragkey];
        let slug = this.props.match.params.slug;
        let URL = "";
        let method = "";
        if(slug){
            method="PUT";
            URL = addPostURL + `/${slug}`;
        } else {
            method="POST";
            URL = addPostURL;
        }
        
        if(storagekey){
            fetch(URL,{
                method,
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Token ${storagekey}`,
                },
                body:JSON.stringify({
                    article:{title,description,body,tagList}
                })
            }).then((res) => {
                if(res.ok){
                    return res.json();
                }
                 throw new Error('can not create new article!');
            }).then((article) => {
                this.props.history.push(`/article/${article.article.slug}`);
            })
            .catch((error) => this.setState((error)));
        }
    }
    
    render(){
        let {title,description,body,tag,error} = this.state;
        return(
            <div className="w-10/12 mt-10 mx-auto">
                {
                    error ? <p className="text-red-500">{error}</p> :""
                }
                <form className="text-right" onSubmit={this.addPost}>
                    <input type="text" name="title" className="border-2 w-full rounded py-2 pl-10" placeholder="Article Title" value={title} onChange={this.handelChange} />
                    <input type="text" name="description" className="border-2 w-full rounded py-2 pl-10 my-3" placeholder="What's this article about?" value={description} onChange={this.handelChange} />
                    <textarea type="text" name="body" className="border-2 w-full rounded py-2 pl-10 my-3" rows="4" cols="50" placeholder="Write you article(in markdown)" value={body} onChange={this.handelChange}></textarea>
                    <input type="text" name="tag" className="border-2 w-full rounded py-2 pl-10 my-3" placeholder="Enter tags" value={tag} onChange={this.handelChange}/>
                    <button className="bg-green-500 px-10 py-3 rounded text-gray-50 font-semibold">Publish Article</button>
                </form>
            </div>
        )
    }
}

export default withRouter(NewPost);