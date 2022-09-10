import React from "react";
import { NavLink } from "react-router-dom";

class Sidebar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allTags:[]
        }
    }
    componentDidMount(){
        this.getAllTags();
    }
    getAllTags = () => {
        fetch('https://mighty-oasis-08080.herokuapp.com/api/tags').then((res) => res.json()).then((data) => this.setState({allTags:data.tags}));
    }
    render(){
        return(
            <div className="bg-gray-200 ml-5 w-1/4 py-3 px-3">
                <h6>Popular Tags</h6>
                <ul className="flex flex-wrap gap-2 mt-2">
                    {
                        this.state.allTags.map((ele,i) => (
                            <li key={i} className= "bg-gray-400 px-2 rounded-3xl font-semibold" onClick={() => this.props.getTag(ele)}><NavLink to={`/#${ele}`}>{ele}</NavLink></li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default Sidebar;