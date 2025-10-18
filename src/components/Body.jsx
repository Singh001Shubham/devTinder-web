import { Outlet,useLocation } from "react-router"
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from 'axios';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import API_BASE_URL from "../constants/constant"

function Body(){
  //  const location = useLocation();
    const loggedInUser = useSelector((store)=>store.user)
     console.log({loggedInUser})
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("Body Called")
    const fetchUser = async()=>{
        if(loggedInUser){
        return;
        }
     try {
      const userData = await axios.get(API_BASE_URL+"profile", {
        withCredentials: true
     });
     dispatch(addUser(userData.data))
      console.log("User Data:", userData.data);
    } catch (error) {
        if(error.status==401 || error.status==400 ){
            navigate("/login")
        }
      console.error("Error fetching user:", error);
    }
    }
    useEffect(()=>{
        fetchUser()
    },[])
    
    return (
        <>   
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Body
