import { Route, Routes } from "react-router-dom";
import Hero from "./Hero";
import Login from "./Login";
import Signup from "./Signup";
import SingleArticle from "./SingleArticle";

function Main(){
    return(
        <Routes>
            <Route path="/" exct element={<Hero/>}/>
            <Route path="/#tag" element={<Hero/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/singleArticle/:slug" element={<SingleArticle/>}/>
        </Routes>
    )
}

export default Main;