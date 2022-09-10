import React from "react";
import { NavLink } from "react-router-dom";
import validator from 'validator';

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email:"",
            password:"",
            error:""
        }
    }
    userLoginData = (event) => {
        this.setState({email:event.target.value,
        password:event.target.value});
    }
    submitUserData = (event) => {
        event.preventDefault();
        let {email, password} = this.state;
        if(!email) {
            this.setState({error:"Email is required"});
        } else if(validator.isEmail(email)) {
            this.setState({error:"plz enter vaild email"});
        } else {
            this.setState({error:""});
        }
        if(!password){
            this.setState({error:"password is required"});
        } else {
            this.setState({error:""});
        }
        if(!email && !password){
            this.setState({error:"Email and Password is required"});
        } else {
            this.setState({error:""});
        }
    }
    render(){
        console.log(this.state.error);
        return(
            <div className="mt-10">
                <div className="text-center mb-3">
                    <h1 className="text-4xl font-medium">Sign In</h1>
                    <p className="mt-2 text-green-500"><NavLink to="/signup">Need an Account?</NavLink></p>
                    <ul>
                        {
                            this.state.error ? <li className="text-red-500 font-medium">{this.state.error}</li> : ""
                        }
                    </ul>
                </div>
                <div className="w-1/2 mx-auto text-right">
                    <form onSubmit={this.submitUserData}>
                        <input type="text" name="email" className="border-2 rounded-xl w-full my-3 py-3 px-4" placeholder="Email" onChange={this.userLoginData}/>
                        <input type="text" name="password" className="border-2 rounded-xl w-full my-3 py-3 px-4" placeholder="Password" onChange={this.userLoginData}/>
                        <button className="bg-green-500 rounded-xl font-medium py-3 px-5 text-gray-50">Sign in</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;