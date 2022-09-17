import React from "react";
import { NavLink } from "react-router-dom";
import { tagsURL } from "../utils/Constant";
import Loader from "./Loader";

class Sidebar extends React.Component{
    state = {
        allTags:null,
        error:"",
    }
    componentDidMount(){
        this.getAllTags();
    }
    getAllTags = () => {
        fetch(tagsURL).then((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json();
        }
        ).then((data) => this.setState({allTags:data.tags}))
        .catch((error) => this.setState({error:"Not able to fetch tags!"}))
    }
    render(){
        const {error,allTags} = this.state;
        if(error){
            return(
                <p>{error}</p>
            )
        }
        if(!allTags){
            return(
                <Loader/>
            )
        } else {
            return(
                <div className="bg-gray-200 ml-5 py-3 px-3">
                    <h6>Popular Tags</h6>
                    <ul className="flex flex-wrap gap-2 mt-2">
                        {
                            allTags.map((ele,i) => (
                                <li key={i} onClick={() => this.props.addTab(ele)} className= "bg-gray-400 px-2 rounded-3xl font-semibold"><NavLink to={`/#${ele}`}>{ele}</NavLink></li>
                            ))
                        }
                    </ul>
                </div>
            )
        }
    }
}

export default Sidebar;