import './Article.css';
import { useState, useEffect } from 'react';

function Article(props) {
    return ( 
        <>
            <div className='article'>
                <div>
                    <h2>{props.title}</h2>
                    <p>{props.text}</p>
                </div>
                <img src={props.img} alt="Placeholder" />
            </div>
        </>
    );
}

export default Article;