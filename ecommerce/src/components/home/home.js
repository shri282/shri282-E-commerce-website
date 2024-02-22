import React from 'react'
import Header from '../header/header'
import { Outlet } from 'react-router-dom';


function Home() {
  

  return (
    <div>
        <Header></Header>
        <Outlet /> 
    </div>
  )
}

export default Home