import React from "react";
import { withRouter } from 'react-router-dom';
import { addPostURL, ROOT_URL, localstoragkey } from "../utils/Constant";

class NewPost extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title:"",
            description:"",
            body:"",
            tag:"",
            error:"",
        }
    }

    componentDidMount(){
        this.getPost();
    }

    getPost = () => {
        const {slug} = this.props.match.params.slug;
        const URL = `articles/${slug}`
        fetch(ROOT_URL + URL, {
            method:"GET",
        }).then((res) => res.json())
        .then((data) => {
            const {article} = data.article
            this.setState(article);
        });
    }
    
    handelChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]:value})
    }

    addPost = (event) => {
        event.preventDefault();
        const {title,description,body,tag} = this.state;
        const tagList = tag.split(" ");
        const storagekey = localStorage[localstoragkey];
        const {slug} = this.props.match.params;
        let URL = "";
        let method = "";
        const slugURL = `/${slug}`;
        if(slug){
            method="PUT";
            URL = addPostURL + slugURL;
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
        const {title,description,body,tag,error} = this.state;
        return(
            <div className="w-10/12 mt-10 mx-auto">
                {
                    error ? <p className="text-red-500">{error}</p> :""
                }
                <form className="text-right" onSubmit={this.addPost}>
                    <input  className="border-2 w-full rounded py-2 pl-10" name="title" placeholder="Article Title" type="text"   value={title} onChange={this.handelChange} />
                    <input className="border-2 w-full rounded py-2 pl-10 my-3" name="description" placeholder="What's this article about?" type="text" value={description} onChange={this.handelChange} />
                    <textarea className="border-2 w-full rounded py-2 pl-10 my-3" cols="50" name="body" placeholder="Write you article(in markdown)" rows="4" type="text" value={body} onChange={this.handelChange}/>
                    <input className="border-2 w-full rounded py-2 pl-10 my-3" name="tag" placeholder="Enter tags" type="text" value={tag} onChange={this.handelChange}/>
                    <button className="bg-green-500 px-10 py-3 rounded text-gray-50 font-semibold" type="button">Publish Article</button>
                </form>
            </div>
        )
    }
}

export default withRouter(NewPost);