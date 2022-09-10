import React from "react";
import Articles from "./Articles";
import Sidebar from "./Sidebar";

class Hero extends React.Component {
    constructor(){
        super()
        this.state = {
            articles:[],
            tag:"",
            error:"",
            startcount: 0,
            endcount:10,
            count:1
        }
    }
    componentDidMount(){
        this.getAllArticles();
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.tag !== this.state.tag){
            this.getFilterArticles();
        }
    }
    getAllArticles = () => {
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles`).then((res) => res.json()).then((data) => this.setState({articles:data.articles}))
    }
    getFilterArticles = () =>{
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?tag=${this.state.tag}`).then((res) => res.json()).then((data) => this.setState({articles:data.articles}))
    }
    getTag = (tag) => {
        this.setState({tag})
    }
    nextTenArticles = (number) => {
        let {count, startcount,endcount} = this.state;
        if(number > count){
            startcount = startcount + 10;
            endcount = endcount + 10;
            count = count + 1;
        } else {
            startcount = startcount - 10;
            endcount = endcount - 10;
            count = count - 1;
        }
        this.setState({
            count,
            startcount,
            endcount
        })
    }
    render(){
        let onlyTenArticles = this.state.articles.slice(this.state.startcount,this.state.endcount);
        let pageNumber = [];
        for (let index = 1; index <= this.state.articles.length / 10; index++) {
            pageNumber.push(index);
        }
        console.log(this.state.tag)
        return(
            <section>
                <div className="bg-green-500">
                    <div className="text-center py-10 container w-10/12 mx-auto">
                        <h1 className="font-bold text-6xl text-gray-50">Blog</h1>
                    </div>
                </div>
                <div className="flex container w-10/12 mt-10 mx-auto">
                    <Articles articles={onlyTenArticles} tag={this.state.tag}/>
                    <Sidebar getTag={this.getTag} />
                </div>
                <div className="container w-3/4 my-10 mx-auto">
                    <ul className="flex">
                        {
                            pageNumber.map(ele => (
                                <li key={ele} className="p-2 border-2 border-green-500" onClick={() => this.nextTenArticles(ele)}>{ele}</li>
                            ))
                        }
                    </ul>
                </div>
            </section> 
        )
    } 
}

export default Hero;