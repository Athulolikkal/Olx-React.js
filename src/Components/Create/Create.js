import React, { Fragment, useContext, useState,useEffect } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/FirebaseContext'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {setDoc,doc,collection} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const {db}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  // const storage = getStorage();
  
  const [name, setName]=useState('');
  const [category, setCategory]=useState('');
  const [price, setPrice]=useState('');
  const [image, setImage]=useState(null);
  const [storage, setStorage] = useState(null);
  const date= new Date();
  const navigate=useNavigate()

  useEffect(() => {
    setStorage(getStorage());
  }, []);

 
  const handleSubmit=()=>{
   
    if (!storage || !image) {
     alert('add image')
      return;
    }

    const storageRef = ref(storage, `/image/${image.name}`);
    uploadBytes(storageRef, image).then(async(snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
     await getDownloadURL(ref(storage, `/image/${image.name}`)).then(async(url) => {
        console.log('File available at', url);
      
        const docRef=doc(collection(db,'products'));
        await setDoc(docRef,{
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()

        })
        
        console.log('added');
        
        navigate('/')
     
     
      });
    });



  }
 
 
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          {/* <form> */}
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e)=>
                setName(e.target.value)
              }
              name="Name"
             
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
             value={category}
              id="fname"
             onChange={(e)=>setCategory(e.target.value)}
              name="category"
             
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} id="fname" onChange={(e)=>setPrice(e.target.value)} name="Price" />
            <br />
          {/* </form> */}
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?.name?URL.createObjectURL(image):''}></img>
          {/* <form> */}
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" required/>
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
          {/* </form> */}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
