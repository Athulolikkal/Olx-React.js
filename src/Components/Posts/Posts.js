import React,{useContext,useEffect,useState} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext,AuthContext } from '../../store/FirebaseContext';
import {getDocs,collection} from 'firebase/firestore'
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';



function Posts () {
  const{user}=useContext(AuthContext)
  const {db}=useContext(FirebaseContext)
  const [products,setProducts]=useState([])
  const {setPostDetails,postDetails}=useContext(PostContext)
  const navigate=useNavigate()

  useEffect(()=>{

    const fetchData=async()=>{

    const snapShot=await getDocs(collection(db,'products'));
const allpost=snapShot.docs.map((product)=>{
  return {
    ...product.data(),
    id:product.id
  }
})
console.log(allpost,'allpostss')
setProducts(allpost)
   }
   fetchData();
   
  },[])

  const handleCardClick = (product) => {
    setPostDetails(product);
    navigate('/view');
  };
  const logininfo=()=>{
    alert('you have to login first')
    navigate('/login')
  }

  return (
     <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
         
         

         
        
         {products.map((product)=>{
          console.log(product,'products');
        return ( <div
            className="card" 
           onClick={()=>{
            console.log('Before state update', postDetails);
           
         user? handleCardClick(product):logininfo();
            console.log('After state update', postDetails);
            
           }}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
        

          ) })
          }

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
