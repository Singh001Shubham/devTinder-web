import axios from "axios";
import { useEffect } from "react";
import { addConnections,removeConnections } from "../utils/connectionSlice";
import {useDispatch, useSelector} from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import API_BASE_URL from "../constants/constant"
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const Connections = ()=>{
    const dispatch = useDispatch();
    const getConnections = async()=>{
      
        try{
<<<<<<< HEAD
            const connection = await axios.get(API_BASE_URL+ "user/connections",{withCredentials:true})
=======
            const connection = await axios.get("/api/user/connections",{withCredentials:true})
>>>>>>> a9684e75126a057b19bec4a0dee736624f6ed0d1
           
            dispatch(addConnections(connection.data.data))
            
        }catch(err){
            console.log(err.message)
        }
        

    }

     useEffect(()=>{
        getConnections();
    },[]);

    const response = useSelector((store)=>store.connection);
     console.log(response);
    return (
        <>
            <div className="flex justify-center my-10">
                <div>
                    <h2>Connections</h2>
                </div>
                <div className="w-full max-w-5xl">
                    <Carousel responsive={responsive}>
                        {Array.isArray(response) && response.map((user) => (
                               <div className="max-w-sm bg-white border border-gray-200 rounded-sm shadow-sm dark:bg-gray-700 dark:border-gray-800">
                   
                                    <div className='userImg flex justify-center'>
                                        <img className="rounded-t-sm"  src={user.photo_url} alt="aaaaa" />
                                    </div>
                                    <div className='flex justify-center'>
                                        <p className='userText'>{user.firstName}</p>
                                    </div>
                                    <div className="p-5">
                                        
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.age} - {user.gender || 'M'}</h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                    
                    </div>
                </div>
                            ))}
                    
                    </Carousel>
                    </div>
            </div>
        </>
    )
}

export default Connections
