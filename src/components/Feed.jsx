import { useEffect } from "react";
import  FeedCard  from "./FeedCard";
import axios from 'axios';
import { addFeed,removeFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
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
export default function Feed(){
    const dispatch = useDispatch();

    const getFeed = async()=>{
        try{
<<<<<<< HEAD
            const data = await axios.get(API_BASE_URL+"feeds?page=1&limit=10",{withCredentials:true});
=======
            const data = await axios.get("/api/feeds?page=1&limit=10",{withCredentials:true});
>>>>>>> a9684e75126a057b19bec4a0dee736624f6ed0d1
            dispatch(addFeed(data?.data?.data))
        }catch(error){
            console.log("Error : "+error.message)
        }
    }
    const userFeeds = useSelector((store)=>store.feed)
   // console.log(userFeeds.length)
    useEffect(()=>{
        getFeed();
    },[]);
    return (
        <>
       <div className="flex justify-center">
        <div className="w-full max-w-5xl">
        <Carousel responsive={responsive}>
             {Array.isArray(userFeeds) && userFeeds.map((user) => (
                    <FeedCard key={user._id} data= {user}/>
                ))}
           
        </Carousel>
        </div>
        </div>
        </>
    )
}
