import { NavLink } from "react-router-dom";


function Header(){
    return(
        <nav className="container shadow-md mx-auto">
            <div className="container w-10/12 mx-auto flex py-5">
                <div className="w-1/2">
                    <NavLink to="/home" className="text-2xl font-bold text-green-500">Blog</NavLink>
                </div>
                <div className="w-1/2">
                    <ul className="flex justify-end mt-1 gap-5">
                        <li className="font-medium text-gray-300"><NavLink to="/home">Home</NavLink></li>
                        <li className="font-medium text-gray-300"><NavLink to="/login">Sign in</NavLink></li>
                        <li className="font-medium text-gray-300"><NavLink to="/signup">Sign up</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;