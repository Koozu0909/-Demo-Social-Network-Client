import './App.css';
import {BrowserRouter as Router ,Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Registration from './pages/Registration';
import PageNotFound from './pages/PageNotFound';
import ProfilePage from './pages/ProfilePage';
import ChangePass from './pages/ChangePass'
import {AuthContext} from './helpers/AuthContext';
import { useState , useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState]  = useState({
    username:"",
    id:0,
    status:false,
  });

  const navigate = useNavigate()

  useEffect(()=>{
    axios.get(`http://localhost:3005/auth/check`,{ headers:{
      accessToken:localStorage.getItem("accessToken") 
    }}).then((res)=>{
      if(res.data.error){
        setAuthState({ ...authState, status:false});
      }else{
        setAuthState({
          username:res.data.username,
          id:res.data.id,
          status:true,
        });
      }
    })
  },[])

  const logOut = () =>{
    localStorage.removeItem("accessToken") ;
    setAuthState({
      username:"",
      id:0,
      status:false,
    });

    navigate("/login")
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
          <div className='navbar'>
          
          {!authState.status ? (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/registration'>Registration</Link>
            </>
          ):(
            <>
            <Link to='/'>Home Page</Link>
            <Link to='/createpost'>Create A Post</Link>
            <div className='login_info'>
              <button onClick={logOut}>Log out</button>
              <div className='user'><Link to={`/profile/${authState.id}`} >{authState.username}</Link></div>
            </div>
            </>
          )
          }
          </div>
            <Routes>
              <Route exact path='/'  element={<Home/>} />
              <Route exact path='/createpost'  element={<CreatePost/>} />
              <Route exact path='/post/:id'  element={<PostDetail/>} />
              <Route exact path='/profile/:id'  element={<ProfilePage/>} />
              <Route exact path='/login'  element={<Login/>} />
              <Route exact path='/registration'  element={<Registration/>} />
              <Route exact path='/changepassword'  element={<ChangePass/>} />
              <Route path="*" exact element={<PageNotFound/>} />
            </Routes>
      </AuthContext.Provider> 
    </div>
  );
}

export default App;
