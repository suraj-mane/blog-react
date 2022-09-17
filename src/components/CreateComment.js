import React from "react"
import { ROOT_URL,localstoragkey } from "../utils/Constant";

class CreatComment extends React.Component{
    state = {
        body:""
    }
    handelChange = (event) => {
        let {name,value} = event.target;
        this.setState({[name]:value});
    }
    handelSubmit = () => {
        let {body} = this.state;
        let slug = this.props.slug;
        let storagekey = localStorage[localstoragkey];
        fetch(ROOT_URL + `articles/${slug}/comments`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Token ${storagekey}`,
            },
            body:JSON.stringify({
                comment:{body}
            })
        }).then((res) => {
            if(res.ok){
                return res.json();
            }
             throw new Error('can not create new Comment!');
        }).then((article) => {
            console.log(article);
        })
        .catch((error) => this.setState((error)));
    }
    render(){
        return(
            <div className="w-2/4 mx-auto mb-5">
                <form className="relative" onSubmit={this.handelSubmit}>
                    <textarea type="text" name="body" className="border-2 w-full rounded py-2 pl-10 my-3" rows="4" cols="50" placeholder="Write a Comment...."  onChange={this.handelChange}></textarea>
                    <div className="bg-gray-300 rounded p-2 text-right w-full inset-x-0 bottom-0 absolute">
                        <button className="bg-green-500 p-1 font-semibold rounded text-gray-50">Post Comment</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreatComment;