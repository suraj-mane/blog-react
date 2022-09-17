import React from "react";
import { articlesURL } from "../utils/Constant";
import Posts from "./Posts";
import ProfileBanner from "./ProfileBanner";
import { withRouter } from "react-router-dom";

class Profile extends React.Component{
    state = {
        activeTab:"author",
        articles:[]
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData = () =>{
        let username = this.props.match.params.username;
        let user = "";
        if(username){
            user = username.replace(/[^0-9]/, ''); 

        } else{
            user = this.props.user.username;
        }
        fetch(articlesURL + `/?${this.state.activeTab}=${user}`).then((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json()
        }).then((data) => this.setState({articles:data.articles}))
        .catch((error) => this.setState({error:"Not able to fetch articles!"}));  
    }
    
    handelActive = (tab) => {
        this.setState({activeTab:tab},() => {this.fetchData()})
    }

    render(){
        let {activeTab, articles} = this.state;
        return(
            <div>
                <div className="bg-green-500">
                    {
                        articles.length ? <ProfileBanner user={articles[0]} loginuser={this.props.user}/> :""
                    }
                </div>
                    <div className="w-3/4 mx-auto mt-5">
                        <ul className="flex border-b-2 gap-6 ">
                            <li className={activeTab === "author" ? "font-medium border-b-2 border-green-500 text-green-500":"font-medium text-gray-500"} onClick={() => this.handelActive('author')}>My Article</li>
                            <li className={activeTab === "favorited" ? "font-medium border-b-2 border-green-500 text-green-500":"font-medium text-gray-500"} onClick={() => this.handelActive('favorited')}>Favorited Article</li>
                        </ul>
                        <Posts articles={articles}/>
                    </div>
            </div>
        )
    }
}

export default withRouter(Profile);