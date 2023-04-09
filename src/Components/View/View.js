import React,{useEffect,useContext,useState} from 'react';

import './View.css';
import { PostContext}  from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import {collection,query,where,getDocs } from 'firebase/firestore';
 
function View() {
  const [userDetails,setUserDetails]=useState()
  const {postDetails} = useContext(PostContext)
  const{db}=useContext(FirebaseContext)
   
  console.log(postDetails,'postdetails are here');
  
  useEffect(()=>{
    console.log(postDetails,'post detailss');
    console.log(postDetails?.userId,'userid ');
    const userId=postDetails?.userId
     
   
    const details=query(collection(db,'users'),where('id','==',userId));
    getDocs(details).then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        setUserDetails(doc.data());
        // console.log(userDetails,'userDetails');
      });
    }).catch((err)=>{
      console.log(err,'errorr');
    })
  
  },[postDetails]);
 
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.email}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
