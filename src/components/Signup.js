import React from "react";
import { NavLink } from "react-router-dom";
import validate from "../utils/validate";
import { signupURL } from "../utils/Constant";
import { withRouter } from 'react-router';

class Signup extends React.Component{
    state = {
        username:"",
        email:"",
        password:"",
        user:"",
        errors:{
            username:"",
            email:"",
            password:""
        },
    };
    handleChange = (event) => {
        let {name,value} = event.target;
        let errors={...this.state.errors}
        validate(errors,name,value);
        console.log(errors, "=======")
        this.setState({[name]:value, errors});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let {username,email,password} = this.state
        fetch(signupURL, {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user:{username,email,password}
            })
        }).then((res) => {
            if(!res.ok) {
                return res.json().then(({errors}) => {
                    return Promise.reject(errors);
                });
            }
            return res.json();
        }).then(({user}) => {
            this.props.updateUser(user);
            this.setState({username:'',email:'',password:''})
            this.props.history.push('/');
        })
        .catch((errors) => {
            console.log(errors, "------after fetch----")
            this.setState({errors:errors})
        })
    }  
    render(){
        const {username,email,password,errors} = this.state;
        return(
            <div className="mt-10">
                <div className="text-center mb-3">
                    <h1 className="text-4xl text-gray-600 font-medium">Sign Up</h1>
                    <p className="mt-2 text-green-500"><NavLink to="/login">Have an Account?</NavLink></p>
                </div>
                <div className="w-1/2 mx-auto text-right">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="username" className="border-2 rounded-xl w-full my-3 py-3 px-5" value = {username} placeholder="Username" onChange={this.handleChange}/>
                        <p className="text-center text-red-500">{errors.username}</p>
                        <input type="text" name="email" className="border-2 rounded-xl w-full my-3 py-3 px-5" value = {email} placeholder="Email" onChange={this.handleChange}/>
                        <p className="text-center text-red-500">{errors.email}</p>
                        <input type="text" name="password" className="border-2 rounded-xl w-full my-3 py-3 px-5" value = {password} placeholder="Password" onChange={this.handleChange}/>
                        <p className="text-center text-red-500">{errors.password}</p>
                        <button  className="bg-green-500 rounded-xl font-medium py-3 px-10 text-center text-gray-50">Sign up</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Signup);