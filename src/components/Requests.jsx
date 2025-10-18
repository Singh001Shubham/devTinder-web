import axios from "axios";
import { useEffect } from "react";
import { addRequest,removeRequest } from "../utils/requestSlice";
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
 const Requests = ()=>{


    const dispatch = useDispatch();
    const getPendingRequests = async()=>{
      
        try{
            const res = await axios.get(API_BASE_URL+"user/pendingRequests",{withCredentials:true})
           
            dispatch(addRequest(res.data.data))
            
        }catch(err){
            console.log(err.message)
        }
        

    }

    const handleRequests = async(status,id)=>{
       // e.preventDefault();
       console.log(status,id)
        try{
            const res = await axios.post("http://localhost:3000/request/review/"+status+"/"+id,{},{withCredentials:true})
            //console.log(res)
            dispatch(removeRequest(id))
            
        }catch(err){
            console.log(err.message)
        }
        

    }

     useEffect(()=>{
        getPendingRequests();
    },[]);

    const response = useSelector((store)=>store.request);

     console.log(response);
    return (
        <>
            <div className="flex justify-center my-10">
                <div>
                    <h2>Requests</h2>
                </div>
                <div className="w-full max-w-5xl">
                    <Carousel responsive={responsive}>
                        {Array.isArray(response) && response.map((user) => (
                               <div className="max-w-sm bg-white border border-gray-200 rounded-sm shadow-sm dark:bg-gray-700 dark:border-gray-800">
                   
                                    <div className='userImg flex justify-center'>
                                        <img className="rounded-t-sm"  src={user.fromUserId.photo_url} alt="aaaaa" />
                                    </div>
                                    <div className='flex justify-center'>
                                        <p className='userText'>{user.fromUserId.firstName}</p>
                                    </div>
                                    <div className="p-5">
                                        
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.fromUserId.age} - {user.fromUserId.gender || 'M'}</h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                    <div className='flex justify-center my-4'>
                                    <button className='btn btn-primary m-8 bg-green-400' onClick={()=>handleRequests('Accepted',user._id)}>Accept</button>
                                    <button className='btn btn-primary m-8 bg-red-400' onClick={()=>handleRequests('Rejected',user._id)}>Ignore</button>
                    </div>
                    </div>
                </div>
                            ))}
                    
                    </Carousel>
                    </div>
            </div>
        </>
    )
}




export default Requests