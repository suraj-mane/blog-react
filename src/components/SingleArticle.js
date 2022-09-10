import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SingleArticle(){
    const [article, setArtcile] = useState(null);
    let {slug} = useParams();
    let newSlug = slug.replace(/[:]/g, '');
    useEffect(() => {
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${newSlug}`).then((res) =>res.json()).then((data) => setArtcile(data.article));
    },[])
    console.log(article)
    return(
        <section> 
            {
                !article  ? <p className='container w-10/12 mx-auto'> Loading..</p> :
                <> 
                    <div className="bg-gray-700">
                        <div className="py-10 container w-10/12 mx-auto">
                             <h1 className="font-semibold text-6xl text-gray-50">{article.title}</h1>
                             <div className="flex mt-10">
                                 <img className="rounded-full w-10 h-10" src={article.author.image} alt="author_name"/>
                                 <div className="ml-2">
                                    <h5 className="text-gray-50">{article.author.username}</h5>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div className='container w-10/12 mx-auto'>
                         <p className='text-2xl my-10'>{article.body}</p>
                         {
                             article.tagList.map((tag,i)=>(
                                 <span key={i} className=" border-2 border-gray-300 text-gray-300 px-3 rounded-3xl font-semibold">{tag}</span>
                             ))
                         }
                         <hr className='mt-10'/>
                    </div>
                </>
            }
        </section>
    )
}

export default SingleArticle;