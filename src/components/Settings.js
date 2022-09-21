import React from "react";
import validate from "../utils/validate";
import { updateUserURL,localstoragkey } from "../utils/Constant";


class Settings extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            image:this.props.user.image,
            username:this.props.user.username,
            bio:this.props.user.bio,
            email:this.props.user.email,
            password:"",
            errors:{
                email:"",
                password:"",
            },
            error:"",
        }
    }

    handelChange = (event) => {
        let {name,value} = event.target;
        let errors={...this.state.errors}
        validate(errors,name,value);
        console.log(name,value)
        this.setState({[name]:value,errors});
    }
    
    handelSubmit = (event) => {
        event.preventDefault();
        const storagekey = localStorage[localstoragkey];
        const {username,email,image,bio,password} = this.state;
        fetch(updateUserURL,{
            method:"PUT",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Token ${storagekey}`,
            },
            body:JSON.stringify({
                user:{username,email,image,bio,password}
            })
        }).then((res) => {
            if(res.ok){
               return res.json();
            }
            return res.json().then(({errors}) => {
                return Promise.reject(errors)
            });
        })
        .catch((error) => this.setState({error}));
    }

    render(){
        let {errors,email,username,image,bio,error} = this.state;
        return(
            <div className="w-1/2 mx-auto">
                <h1 className="my-3 text-4xl text-center text-gray-600">Your Settings</h1>
                {
                    error ? <p className="text-center text-red-500">{error}</p> : ""
                }
                <form className="text-right" onSubmit={this.handelSubmit}>
                    <input type="text" name="image" className="border-2 w-full  rounded py-2 pl-10" placeholder="URL of Profile Picture" value={image} onChange={this.handelChange}/>
                    <input type="text" name="username" className="border-2 w-full my-3 rounded py-2 pl-10" placeholder="" value={username} onChange={this.handelChange}/>
                    <textarea type="text" name="bio" className="border-2 w-full rounded py-2 pl-10 my-3"  rows="4" cols="50" placeholder="Short bio about you" value={bio} onChange={this.handelChange}></textarea>
                    <input type="text" name="email" className="border-2 w-full my-3 rounded py-2 pl-10" placeholder="" value={email} onChange={this.handelChange} />
                    <p className="text-center text-red-500">{errors.email}</p>
                    <input type="text" name="password" className="border-2 w-full my-3 rounded py-2 pl-10" placeholder="New Password" onChange={this.handelChange}/>
                    <p className="text-center text-red-500">{errors.password}</p>
                    <button className="bg-green-500 px-10 py-3 rounded text-gray-50 font-semibold">Update Settings</button>
                </form>
                <hr className="my-3"/>
                <button className="border-2 border-red-900 text-red-900 font-semibold py-2 px-2 mb-5 rounded" type="button" onClick={this.props.logout}>Or click here to logout</button>
            </div>
        )
    }
    
}

export default Settings;