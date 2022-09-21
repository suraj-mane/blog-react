import React from "react";
import { NavLink,withRouter } from "react-router-dom";
import validate from '../utils/validate';
import { loginURL } from "../utils/Constant";

class Login extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email:"",
            password:"",
            errors:{
                email:"",
                password:"",
            },
        };
    }

    handleChange = (event) => {
       const {name,value} = event.target;
       const errors={...this.state.errors}
       validate(errors,name,value);
       this.setState({[name]:value, errors: {...errors}});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {email,password} = this.state;
        fetch(loginURL, {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user:{email,password}
            })
        }).then(async (res) => {
            if(!res.ok) {
                const { errors } = await res.json();
                return await Promise.reject(errors);
            }
            return res.json();
        }).then(({user}) =>{
            this.props.updateUser(user);
            this.props.history.push('/');
        })   
        .catch((errors) => this.setState({errors}));
    }

    render(){
        const {email,password,errors,error} = this.state;
        return(
            <div className="mt-10">
                <div className="text-center mb-3">
                    <h1 className="text-4xl font-medium">Sign In</h1>
                    <p className="mt-2 text-green-500"><NavLink to="/signup">Need an Account?</NavLink></p>
                </div>
                {
                    error ? <p className="text-center text-red-500">Email or Password{error}</p> :""
                }
                <div className="w-1/2 mx-auto text-right">
                    <form onSubmit={this.handleSubmit}>
                        <input className="border-2 rounded-xl w-full my-3 py-3 px-4" name="email" placeholder="Email" type="text" value={email} onChange={this.handleChange}/>
                        <p className="text-center text-red-500">{errors.email}</p>
                        <input  className="border-2 rounded-xl w-full my-3 py-3 px-4" name="password" placeholder="Password" type="text" value={password} onChange={this.handleChange}/>
                        <p className="text-center text-red-500">{errors.password}</p>
                        <button className="bg-green-500 rounded-xl font-medium py-3 px-10 text-center text-gray-50" type="button">Sign in</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);