import { NavLink } from "react-router-dom";


function Header(props){
    return(
        <nav className="container shadow-md mx-auto">
            <div className="container w-10/12 mx-auto flex py-5">
                <div className="w-1/2">
                    <NavLink to="/" className="text-2xl font-bold text-green-500">Blog</NavLink>
                </div>
                {
                    props.isLoggedIn ? <AuthHeader/> : <NonAuthHeader/>
                }
            </div>

        </nav>
    )
}

function NonAuthHeader(){
    return(        
        <div className="w-1/2">
            <ul className="flex justify-end mt-1 gap-5">
                <li className="font-medium text-gray-500">
                    <NavLink activeClassName="font-medium text-green-500" to="/" exact>Home</NavLink>
                </li>
                <li className="font-medium text-gray-500">
                    <NavLink activeClassName="font-medium text-green-500" to="/login">Sign in</NavLink>
                </li>
                <li className="font-medium text-gray-500">
                    <NavLink activeClassName="font-medium text-green-500" to="/signup">Sign up</NavLink>
                </li>
            </ul>
        </div>
    )
}
function AuthHeader(){
    return(
        <div className="w-1/2">
            <ul className="flex justify-end mt-1 gap-5">
                <li className="font-medium text-gray-500">
                    <NavLink activeClassName="font-medium text-green-500" to="/" exact>Home</NavLink>
                </li>
                <li className="font-medium text-gray-500">
                    <NavLink activeClassName="font-medium text-green-500" to="/new-post">New Article</NavLink>
                </li>
                <li className="font-medium text-gray-500">
                    <NavLink activeClassName="font-medium text-green-500" to="/setting">Settings</NavLink>
                </li>
                <li className="font-medium text-gray-500">
                    <NavLink activeClassName="font-medium text-green-500" to="/profile">Profile</NavLink>
                </li>
            </ul>
        </div>
    )
}



export default Header;

