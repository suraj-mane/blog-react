import React from "react"
import { ROOT_URL,localstoragkey } from "../utils/Constant";

class ShowComment extends React.Component{
    state = {
        comments:[]
    }
    fetchData = () =>{
        let slug = this.props.slug;
        fetch(ROOT_URL + `articles/${slug}/comments` ).then((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json()
        }).then((data) => this.setState({comments:data.comments}))
        .catch((error) => this.setState({error:"Not able to fetch articles!"}));  
    }
    componentDidMount(){
        this.fetchData();
    }
    deleteComment = (id) => {
        let slug = this.props.slug;
        let storagekey = localStorage[localstoragkey];
        fetch(ROOT_URL + `articles/${slug}/comments/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Token ${storagekey}`,
            },
        }).then((res) => console.log(res.json()))
    }
    render(){
        let {comments} = this.state;
        return(
            <>
                {
                    comments.map((comment,i) => (
                        <div key={i} className="w-2/4 mx-auto mb-5">
                            <div className="">
                                <div className="py-5 px-2 border-2 rounded">{comment.body}</div>
                                <div className="bg-gray-300 rounded p-2 text-right w-full flex justify-between">
                                    <div className="flex">
                                        <img className="h-10 w-10 rounded-full" src={comment.author.image} alt="profile"/>
                                        <h2 className="ml-2 text-green-500">{comment.author.username}</h2>
                                    </div>
                                    <button className="p-1 font-semibold rounded text-green-500" onClick={() => this.deleteComment(comment.id)}><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        </div>)
                    )
                }
            </>
        )
    }
}

export default ShowComment;