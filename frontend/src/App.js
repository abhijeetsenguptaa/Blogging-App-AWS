import React from 'react'
import NavBar from './Components/NavBar'
import AllRoutes from './Components/AllRoutes'

export default function App() {
  return (
    <div className='flex gap-2 h-screen'>
      <div>
        <NavBar />
      </div>
      <div className='absolute right-0 p-4 w-9/12'>
        <AllRoutes />
      </div>
    </div>
  )
}
