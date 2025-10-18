import '../App.css';
import axios from "axios";
import {useDispatch} from "react-redux";
import { removeFeed } from '../utils/feedSlice';
import API_BASE_URL from "../constants/constant"
const FeedCard = (data)=>{
    const dispatch = useDispatch();

    const handleFeeds = async(status,toUserId)=>{
        try{
            const res = await axios.post(API_BASE_URL+"request/"+status+"/"+toUserId,{},{withCredentials:true});
            dispatch(removeFeed(toUserId));
        }catch(err){
            console.log("ERROR : "+err.message);
        }
        
    }
    

    return (
        <>
            <div className="max-w-sm bg-white border border-gray-200 rounded-sm shadow-sm dark:bg-gray-700 dark:border-gray-800">
                   
                    <div className='userImg flex justify-center'>
                        <img className="rounded-t-sm"  src={data?.data?.photo_url} alt="aaaaa" />
                    </div>
                    <div className='flex justify-center'>
                         <p className='userText'>{data?.data?.firstName}</p>
                    </div>
                    <div className="p-5">
                        
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data?.data?.age} - {data?.data?.gender || 'M'}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <div className='flex justify-center my-4'>
                        <button className='btn btn-primary m-8 bg-green-400' onClick={()=>{handleFeeds('Interested',data?.data?._id)}}>Accept</button>
                        <button className='btn btn-primary m-8 bg-red-400' onClick={()=>{handleFeeds('Ignored',data?.data?._id)}}>Ignore</button>
                    </div>
                    </div>
                </div>
        </>
    )
}

export default FeedCard;