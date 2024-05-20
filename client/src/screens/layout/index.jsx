import React from 'react'
import { useState } from 'react'
import {Box,useMediaQuery} from "@mui/material"
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
// import { useGetDataQuery } from '../../state/api';
import useFetchData from '../../state/useFetchData';
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen,setIsSidebarOpen] = useState(true)
  const dataId = useSelector((state)=>state.global.dataId);
  // console.log("dataid",dataId);
const { data } = useFetchData(dataId);


  return (
    <Box display={isNonMobile ? "flex":"block"} width = "100%" height= "100%">
      <Sidebar
      data = {data || {}}
      isNonMobile={isNonMobile} drawerWidth="250px" isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <Box flexGrow={1}>
<Navbar 
      data = {data || {}}

isSidebarOpen={isSidebarOpen} 
setIsSidebarOpen={setIsSidebarOpen}


/>
        <Outlet/>
      </Box>
    </Box>
  )
}

export default Layout
