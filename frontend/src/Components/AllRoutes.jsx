import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import CreateBlog from '../Pages/CreateBlog'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import BlogDetails from '../Pages/BlogDetails'
import YourBlogs from '../Pages/yourBlogs'

export default function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/create' element={<CreateBlog />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/blogs/:id' element={<BlogDetails />}></Route>
      <Route path='/your-blogs' element={<YourBlogs/>}></Route>
    </Routes>
  )
}
