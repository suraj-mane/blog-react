import React from "react";
import Banner from "./Banner";
import FeedNav from "./FeedNav";
import Pagination from "./Pagination";
import Posts from "./Posts";
import Sidebar from "./Sidebar";
import { articlesURL,localstoragkey } from "../utils/Constant";

class Hero extends React.Component {
    state = {
        articles:[],
        error:"",
        articlesCount:0,
        articlesPerPage:10,
        activePage:1,
        activeTab:""
    }

    emptyTab = () => {
        this.setState({ activeTab : "" });
    }

    addTab = (tab) => {
        this.setState({activeTab:tab});
    }

    componentDidMount(){
       this.fetchData();
    }

    componentDidUpdate(_prevProps, prevState){
        if(prevState.activePage !== this.state.activePage || prevState.activeTab !== this.state.activeTab ){
            this.fetchData();
        }
    }

    fetchData = () =>{
        let limit = this.state.articlesPerPage;
        let offset =  (this.state.activePage - 1) * limit;
        let tag = this.state.activeTab;
        let storagekey = localStorage[localstoragkey];
    
        fetch(articlesURL, {
            method:"GET",
            headers: {
                Authorization: `Token ${storagekey}`,
            }
        }).then((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json()
        }).then((data) => this.setState({articles:data.articles, articlesCount:data.articlesCount}))
        .catch((error) => this.setState({error:"Not able to fetch articles!"}));  
    }

    updateCurrentPageIndex = (index) => {
        this.setState({activePage:index},this.fetchData);
    }

    handelFavoriteArticle = (slug) => {
        let storagekey = localStorage[localstoragkey];
        fetch(articlesURL + `/${slug}/favorite`, {
            method:"POST",
            headers:{
                Authorization: `Token ${storagekey}`,
            }
        }).then((res) => res.json())
        .then((data) => this.fetchData());
    }

    handelRemoveFavoriteArticle = (slug) => {
        let storagekey = localStorage[localstoragkey];
        fetch(articlesURL + `/${slug}/favorite`, {
            method:"DELETE",
            headers:{
                Authorization: `Token ${storagekey}`,
            }
        }).then((res) => res.json())
        .then((data) => console.log(data));
    }

    handleClickToggle = (slug,favorited) => {
        if(favorited){
            this.handelRemoveFavoriteArticle(slug);
        } else {
            this.handelFavoriteArticle(slug);
        }
    }

    render(){
        let {error,articles,articlesCount,articlesPerPage,activePage,activeTab} = this.state;
        return(
            <main>
                <Banner/>
                <FeedNav activeTab={activeTab} emptyTab={this.emptyTab}/>
                <section className=" flex container w-10/12 px-3 mx-auto">
                    <div className="w-3/4">
                        <Posts articles={articles} error={error} handleClickToggle={this.handleClickToggle}/>
                        <Pagination articlesCount={articlesCount} articlesPerPage={articlesPerPage} activePage={activePage} updateCurrentPageIndex={this.updateCurrentPageIndex}/>
                    </div>
                    <div className="w-1/4">
                        <Sidebar  addTab={this.addTab}/>
                    </div>
                </section>
            </main> 
        )
    } 
}

export default Hero;