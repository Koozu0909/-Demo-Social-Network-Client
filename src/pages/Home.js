import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiTwotoneLike } from "react-icons/ai";
import {AuthContext} from '../helpers/AuthContext';
import { Link } from "react-router-dom";

function Home() {
  const [listPosts, setListPosts] = useState([]);
  const [likePosts, setLikePosts] = useState([]);
  const { authState } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {

    if(!localStorage.getItem("accessToken")){
        navigate("/login")
    }
    else{
        axios.get("https://minor-eggnog-production.up.railway.app/posts",
        {
        headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
          setListPosts(res.data.listOfPosts);
          setLikePosts(res.data.likeOfPosts.map((like)=>{
            return like.PostId;
          }))
        });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        `https://minor-eggnog-production.up.railway.app/likes`,
        { PostId: postId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setListPosts(
          listPosts.map((post) => {
            if (post.id === postId) {   
              if (res.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likePosts.includes(postId)){
            setLikePosts(likePosts.filter((id)=>{
                return id !== postId;
            }))
        }else{
            setLikePosts([...likePosts, postId])
        }
      });
  };

  return (
    <div className="postHome">
      {listPosts.map((value, index) => {
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
              <divc className="username"> <Link to={`/profile/${value.UserId}`} >{value.username}</Link></divc>
              <div className="likeBtn">
                <AiTwotoneLike
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={likePosts.includes(value.id) ? "like-btn" : "unlike-btn"}
                />
                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
