import React from "react"
import { ROOT_URL,localstoragkey } from "../utils/Constant";

class ShowComment extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            comments:[]
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = () =>{
        const {slug} = this.props;
        const URL = `articles/${slug}/comments`;
        fetch(ROOT_URL + URL).then((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json()
        }).then((data) => this.setState({comments:data.comments}))  
    }

    deleteComment = (id) => {
        const {slug} = this.props;
        const storagekey = localStorage[localstoragkey];
        const URL = `articles/${slug}/comments/${id}`
        fetch(ROOT_URL + URL,{
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Token ${storagekey}`,
            },
        }).then((res) => console.log(res.json()))
    }
    
    render() {
        const {comments} = this.state;
        return (
            <div>
                {
                    comments.map(comment => (
                        <div className="w-2/4 mx-auto mb-5" key={comment.id} >
                            <div>
                                <div className="py-5 px-2 border-2 rounded">{comment.body}</div>
                                <div className="bg-gray-300 rounded p-2 text-right w-full flex justify-between">
                                    <div className="flex">
                                        <img  alt="profile" className="h-10 w-10 rounded-full" src={comment.author.image}/>
                                        <h2 className="ml-2 text-green-500">{comment.author.username}</h2>
                                    </div>
                                    <button className="p-1 font-semibold rounded text-green-500" type="submit" onClick={() => this.deleteComment(comment.id)}/><i className="fa-solid fa-trash" />
                                </div>
                            </div>
                        </div>
                    )) 
                }
            </div>
        )
    }
}

export default ShowComment;