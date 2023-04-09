import React, { useContext, useEffect } from 'react';
import './App.css';
import SignUp from './Pages/Signup'
import Login from './Pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from './Pages/Home';
import Create from './Pages/Create';
import View from './Pages/ViewPost'
import Post from './store/PostContext';



function App() {

  const { user, setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  })

  return (
    <div>
      <Post>

        <Router>
          <Routes>

            <Route exact path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/view' element={<View />} />

          </Routes>
        </Router>
      </Post>

    </div>
  );
}

export default App;
