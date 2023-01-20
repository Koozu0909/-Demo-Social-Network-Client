import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";


function ProfilePage() {
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfPost, setListOfPost] = useState([])
  const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    
    useEffect(()=>{
      axios.get(`https://minor-eggnog-production.up.railway.app/auth/basicinfo/${id}`).then((res)=>{
        setUsername(res.data.username)
      })

      axios.get(`https://minor-eggnog-production.up.railway.app/posts/byuserid/${id}`).then((res)=>{
        setListOfPost(res.data)
      })
    },[])

  return (
    <div className='profileContainer' >
        <div className='basicInfo' >
          {username}  
        </div>
          {(authState.username ===  username) &&
            <button onClick={()=>{navigate('/changepassword')}}>Change password</button>
          }
        <div className='listOfPosts'>
        {listOfPost.map((value, index) => {
        return (
          <div className="post" key={index}>
            <div className="post-title">{value.title}</div>
            <div
              className="post-text"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="post-name">
              <div>{value.username }</div>
              <div>
                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
        </div>
    </div>
  )
}

export default ProfilePage