import React, { useEffect } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import axios from "axios"
import { useContext } from 'react';
import {useNavigate  } from "react-router-dom";
import {AuthContext} from '../helpers/AuthContext'



function CreatePost() {
const { authState } = useContext(AuthContext);
const initialValues ={
  title :"",
  postText:""
}

const validationSchema= Yup.object().shape({
  title:Yup.string().required("You must input a title"),
  postText:Yup.string().required(),
})

let navigate = useNavigate()

useEffect(()=>{
  
  if(!localStorage.getItem("accessToken")){
    navigate("/login")
}
},[])

const onSubmit=(data)=>{
  
  console.log(data)
  axios.post("https://minor-eggnog-production.up.railway.app/posts", data, {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  }).then((res)=>{
    navigate("/");
  })
  
}



  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit}  validationSchema={validationSchema} >
            <Form className='formContainer' id='inputCreatePost' >
                <label>Title</label>
                <ErrorMessage name='title' component="span" />
                <Field autoComplete="off" type="text" id="inputCratePost" name="title" placeholder = "EX.title" />
                <label>Title Post</label>
                <ErrorMessage name='titlePost' component="span" />
                <Field autoComplete="off" type="text" id="inputCratePost" name="postText" placeholder = "EX.postText" />
                <button type='submit' >Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost