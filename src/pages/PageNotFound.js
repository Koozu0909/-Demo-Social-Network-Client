import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
        <h1>PageNotFound :/</h1>
        <h1>Try this Link:   <Link to='/'>Home Page</Link></h1>
    </div>
  )
}

export default PageNotFound