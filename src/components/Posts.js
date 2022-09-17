import React from "react";
import Loader from "./Loader";
import Post from "./Post";

function Posts(props){
    let {error,articles,handleClickToggle} = props;
    if(error){
        return <p>{this.state.error}</p>
    }
    if(!articles) {
        return (
            <Loader/>
        )
    } else {
        return(
            articles.map((article) => <Post key={articles.slug} {...article} handleClickToggle={handleClickToggle} />)
        )
    }
}

export default Posts;