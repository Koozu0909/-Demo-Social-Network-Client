import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function Registration() {

const navigate = useNavigate();

const initialValues ={
    username:"",
    password:"",
    confirmPassword:""
}

const validationSchema= Yup.object().shape({
    username:Yup.string().min(3).max(15).required("You must input your name"),
    password:Yup.string().min(4).max(20).required("You must input your password"),
    confirmPassword: Yup.string().min(4).max(20).required("You must input your confirm password").oneOf([Yup.ref('password'), null], 'Passwords must match'),
})


const onSubmit=(data)=>{

    if(data.confirmPassword === data.password){
        axios.post("http://localhost:3005/auth", data).then((res)=>{
        console.log("work")
        navigate('/login')
    })
    }
}


  return (
    <div>
    <div>Registration</div>
    <div className='createAccount'>
        <Formik initialValues={initialValues} onSubmit={onSubmit}  validationSchema={validationSchema} >
            <Form className='formContainer' id='inputCreatePost' >
                <label>Username</label>
                <ErrorMessage name='username' component="span" />
                <Field autoComplete="off" type="text" id="inputCratePost" name="username" placeholder = "username" />
                <label>Password</label>
                <ErrorMessage name='password' component="span" />
                <Field autoComplete="off" type="password" id="inputCratePost" name="password" placeholder = "password" />
                <label>Confirm Password</label>
                <ErrorMessage name='confirmPassword' component="span" />
                <Field autoComplete="off" type="password" id="inputCratePost" name="confirmPassword" placeholder = " confirm password" />
                <button type='submit' >Create Account</button>
            </Form>
        </Formik>
    </div>
    </div>
    
  )
}

export default Registration