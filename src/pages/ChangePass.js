import React, {useState} from 'react'
import axios from 'axios'

function ChangePass() {
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")

    const ChangePassWord = ()=>{
        axios.put('http://localhost:3005/auth/changepassword', {oldPassword:oldPassword, newPassword:newPassword},
        {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }).then((res)=>{
            setOldPassword("");
            setNewPassword("");
            console.log(res.data.error)
            alert(res.data)
          })
    }

  return (
    <div>
        <h1>Change PassWord</h1>
        <input type="text" placeholder = "Old Password" onChange={(e)=>{setOldPassword(e.target.value)}}></input>
        <input type="text" placeholder = "New Password" onChange={(e)=>{setNewPassword(e.target.value)}}></input>
        <button onClick={ChangePassWord} >Save</button>
    </div>
  )
}

export default ChangePass