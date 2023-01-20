import { useParams } from "react-router-dom";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../helpers/AuthContext";


function PostDetail() {
  let { id } = useParams();

  const [postObject, setPostObject] = useState({});
  const [postComments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://minor-eggnog-production.up.railway.app/posts/byId/${id}`).then((res) => {
      setPostObject(res.data);
    });
    axios.get(`https://minor-eggnog-production.up.railway.app/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, []);

  const addComment = () => {
    axios.post(
        `https://minor-eggnog-production.up.railway.app/comments`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: res.data.username,
          };
          setComments([...postComments, commentToAdd]);
          setNewComment(" ");
        }
      });
  };

  const deleteComment = (id)=>{
    axios.delete(
      `https://minor-eggnog-production.up.railway.app/comments/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then(()=>{
      setComments(
        postComments.filter((value)=>{
          return value.id !== id;
        })
      )
    })
    
  }
  const deletePost = (id)=>{
    axios.delete(
      `https://minor-eggnog-production.up.railway.app/posts/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then(()=>{
        navigate("/")
    })
  }

  const editPost = (option)=>{
    if(option === "title"){
      let newTitle = prompt("Enter new title");
      if(newTitle){
        axios.put(  `https://minor-eggnog-production.up.railway.app/posts/title`, {newTitle:newTitle, id:id},
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then(()=>{
       setPostObject({...postObject, title: newTitle})
      })
      }
    }else{
      let newText = prompt("Enter new Text");
      if(newText){
        axios.put(  `https://minor-eggnog-production.up.railway.app/posts/postText`, {newText:newText, id:id},
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then(()=>{
        setPostObject({...postObject, postText: newText})
      })
      }
    }
  }

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title" onClick={()=>{ if(authState.username ===  postObject.username){ editPost("title")}}} >{postObject.title}</div>
          <div className="postText" onClick={()=>{ if(authState.username ===  postObject.username){editPost("text")}}} >{postObject.postText}</div>
          <div className="footer">{postObject.username} {authState.username ===  postObject.username && <button onClick={()=>{
            deletePost(postObject.id)
          }} >Delete Post</button>}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="listOfComments">
          {postComments.map((comment, index) => {
            return (
              <div className="comment" key={index}>
                <div className="comment-content">{comment.commentBody}</div>
                {authState.username === comment.username && <button onClick={()=>deleteComment(comment.id)}>X</button>}
                <label>Username:{comment.username}</label>
              </div>
            );
          })}
        </div>
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <button onClick={addComment}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
