import React from "react";

class Pagination extends React.Component {
    state = {
    }
    render(){
        let {articlesCount,articlesPerPage,activePage,updateCurrentPageIndex} = this.props;
        let pageCount = Math.ceil(articlesCount / articlesPerPage);
        let pageNumber = [];
        for(let i=1; i <= pageCount; i++){
            pageNumber.push(i);
        }
        return(
            <div>
                <ul className="flex flex-wrap">
                    {
                        pageNumber.map((ele) => (
                            <li key={ele} className={activePage === ele ? "my-2 bg-green-500 w-10 h-10 flex justify-center items-center text-gray-50":"border-2 my-2 border-green-500 w-10 h-10 flex justify-center items-center"} onClick={() => updateCurrentPageIndex(ele)}>{ele}</li>
                        ))
                    }
                </ul>
            </div>
        )
    }
} 

export default Pagination;