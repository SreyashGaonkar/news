import React from 'react'
import './listItem.css'
import star from '../../assets/images/star.png'

 const Card = (props)=>{
     //console.log(props.item)
     return(
         <div className='Container'>
             <h4 className='title'>{props.item.title}</h4>
             <img
                src={props.item.urlToImage}
                height="350"

            />
            <p className='description'>{props.item.description}</p>
            <div className='author-container'>
                <h6 className='author'>Author: {props.item.author}</h6>
                <h6 className='date'>Published At: {props.item.publishedAt.substring(0, 10)}</h6>
            </div>
            <div className='fav-btn-container' onClick={()=> props.click(props.item)} >
            <img
                src={star}
                width='40'
                height='40'
                
            />
            </div>
           
        </div>
     )
 }

 export default Card