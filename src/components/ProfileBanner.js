import React from "react";
import { NavLink } from "react-router-dom";
import { ROOT_URL,localstoragkey } from "../utils/Constant";
import Loader from "./Loader";

class ProfileBanner extends React.Component{
    state = {
        profile:[]
    }
    componentDidMount(){
        this.getUser()
    }

    getUser = () => {
        let username = this.props.user.author.username;
        fetch(ROOT_URL + `profiles/${username}`)
        .then((res) => res.json())
        .then((data) => {
            this.setState({profile:data.profile})
        })
    }

    handleFollowUnfollow = (follow,name) => {
        let method = "";
        let storagekey = localStorage[localstoragkey];
         if(follow){
            method="DELETE";
         } else {
            method="POST";
         }
        fetch(ROOT_URL + `profiles/${name}/follow`,{
            method,
            headers:{
                Authorization: `Token ${storagekey}`,
            }
        }).then((res) => res.json())
        .then((data) => {
            this.setState({profile:data.profile})
        });
    }

    render(){
        let {username,bio,image,following} = this.state.profile;
        return(
            <div className="py-10 text-center w-3/4 mx-auto">
                <img className="rounded-full w-20 h-20 mx-auto border-4 border-gray-50" src={image || "https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png"} alt=""/>
                <h1 className="text-3xl font-semibold text-gray-50 my-3">{username}</h1>
                <p className="text-gray-50">{bio}</p>
                <div className="text-right">
                    {
                        this.props.loginuser.username === this.props.user.author.username ?
                        <NavLink to="/setting"><button className="border-2 p-2 text-gray-50 font-semibold "><i class="fa-solid fa-gear"></i> Edit Profile Settings</button></NavLink> : 
                        <button className={following === true ? "border-2 border-red-500 p-2 text-red-500 font-semibold":"border-2 p-2 text-gray-50 font-semibold"} onClick={() => this.handleFollowUnfollow(following,username)}>+ Follow {this.props.user.author.username}</button>
                    }
                </div>
            </div>
        )
    }

    
}

export default ProfileBanner;