import React, { useState,useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {setDoc,doc,collection} from 'firebase/firestore'
import {app}  from '../../firebase/config';
import {useNavigate} from 'react-router-dom'

const auth = getAuth(app);


export default function Signup() {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
const {db}=useContext(FirebaseContext)

const navigate = useNavigate();

const handleSubmit=(e)=>{
 e.preventDefault()
 createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
    const user = userCredential.user;

    console.log(user,'user is this');
    console.log(userCredential,'userrr');

    //updateProfile
    updateProfile(user,{displayName:username}).then(async(res)=>{
    console.log('profile Updated');
    const docRef=doc(collection(db,'users'));
    console.log(user.uid,'uid of user');
    await setDoc(docRef,{id:user.uid,username:username,email:email})
    navigate('/login')
    console.log('added');
     }).catch((err)=>{
      console.log('error on profile update',err);
     })
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,'error');
    console.log(errorMessage,'error');
  });

}


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
           value={username}
           onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button >Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
