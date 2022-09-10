import React from "react";
import { NavLink } from "react-router-dom";
import validator from 'validator';

class Signup extends React.Component{
    constructor(){
        super()
        this.state = {
            username:"",
            email:"",
            password:"",
            error:""
        }
    }
    userData = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }
    submitUserRegisterData = (event) => {
        event.preventDefault();
        let {username,email,password} = this.state;
        // if(!email){
        //     this.setState({error:"Email is required"});
        // } else if(validator.isEmail(email)){
        //             this.setState({error:""})
        //         } else {
        //             this.setState({error:"Email is is not valid"});
        //         }
        //     }
        // }    
        // if(!username){
        //     this.setState({error:"Username is required"});

        // } else {
        //     if(validator.isAlpha(username)){
        //         this.setState({error:"Enter vaild Username"});
        //     } else {
        //         this.setState({error:""})
        //     }
        // } 
        // if(!password){
        //     this.setState({error:"Password is requried."});

        // } else {
        //     this.setState({error:""})
        // }
    }
       
    userRegister = () => {
        let {username,email,password} = this.state;
        fetch('https://mighty-oasis-08080.herokuapp.com/api/users', {
            method:'POST',
            headers:{'Content-Type': ' application/json'},
            body: JSON.stringify({
                user: { username, email, password },
              })
        })
        .then((res) => res.json()).then((data) => console.log(data))
        .catch((err) => console.log(err))
    }
    render(){
        console.log(this.state)
        return(
            <div className="mt-10">
                <div className="text-center mb-3">
                    <h1 className="text-4xl text-gray-600 font-medium">Sign Up</h1>
                    <p className="mt-2 text-green-500"><NavLink to="/login">Have an Account?</NavLink></p>
                    <ul>
                        {
                            this.state.error ? <li className="text-red-500 font-medium">{this.state.error}</li> : ""
                        }
                    </ul>
                </div>
                <div className="w-1/2 mx-auto text-right">
                    <form onSubmit={this.submitUserRegisterData}>
                        <input type="text" name="username" className="border-2 rounded-xl w-full my-3 py-3 px-5" value = {this.state.username} placeholder="Username" onChange={this.userData}/>
                        <input type="text" name="email" className="border-2 rounded-xl w-full my-3 py-3 px-5" value = {this.state.email} placeholder="Email" onChange={this.userData}/>
                        <input type="text" name="password" className="border-2 rounded-xl w-full my-3 py-3 px-5" value = {this.state.password} placeholder="Password" onChange={this.userData}/>
                        <button className="bg-green-500 rounded-xl font-medium py-3 px-5 text-gray-50">Sign up</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Signup;