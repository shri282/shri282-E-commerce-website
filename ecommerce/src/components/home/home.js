import React,{useContext} from 'react'
import Header from '../header/header'
import { Outlet } from 'react-router-dom';
import contextProvider from '../../contextProvide';


function Home() {
  
  const headerHandler = useContext(contextProvider)[1];

  return (
    <div>
        <Header updateData = {headerHandler}></Header>
        <Outlet /> 
    </div>
  )
}

export default Home