import{ React }from "react";
import { ROOT_URL,localstoragkey } from "../utils/Constant";

class CreatComment extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            body:""
        }
    }

    handelChange = (event) => {
        const {name,value} = event.target;
        this.setState({[name]:value});
    }

    handelSubmit = () => {
        const {body} = this.state;
        const {slug} = this.props;
        const storagekey = localStorage[localstoragkey];
        const URL = `articles/${slug}/comments`;
        fetch(ROOT_URL + URL,{
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
        })
        .catch((error) => this.setState((error)));
    }

    render() {
        return(
            <div className="w-2/4 mx-auto mb-5">
                <form className="relative" onSubmit={this.handelSubmit}>
                    <textarea className="border-2 w-full rounded py-2 pl-10 my-3" cols="50" name="body" placeholder="Write a Comment...." rows="4" type="text"   onChange={this.handelChange}/>
                    <div className="bg-gray-300 rounded p-2 text-right w-full inset-x-0 bottom-0 absolute">
                        <button className="bg-green-500 p-1 font-semibold rounded text-gray-50" type="submit">Post Comment</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreatComment;