import { useState } from "react";
import  FeedCard  from "./FeedCard";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import API_BASE_URL from "../constants/constant"
const EditProfile = ({user})=>{
        const dispatch = useDispatch();
         const [firstName,setfirstName] = useState(user.firstName)
         const [lastName,setlastName] = useState(user.lastName)
         const [age,setage] = useState(user.age)
         const [gender,setgender] = useState(user.gender)
         const [photo_url,setphoto_url] = useState(user.photo_url)
         const [error,seterror] = useState("");
         const [showToast,setshowToast] = useState(false)


    const SaveProfile = async()=>{
        seterror("")
        try{
          const res =  await axios.patch(API_BASE_URL+"profile/edit",{
            firstName,
            lastName,
            age,
            gender,
            photo_url
           },{withCredentials:true}) 
           dispatch(addUser(res.data?.data))
           setshowToast(true)
           setTimeout(()=>{
            setshowToast(false)
           },5000)
        }catch(err){
            seterror(err.response.data)
        }
    }

    return (
        <>
        <div className="flex justify-center mx-10">
        <div className="loginContainer">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Edit Profile</legend>

                <label className="label">First Name</label>
                    <input type="text" className="input" value={firstName} onChange={(e)=>{setfirstName(e.target.value)}} placeholder="" />
                <label className="label">Last Name</label>
                    <input type="text" className="input" value={lastName} onChange={(e)=>setlastName(e.target.value)} placeholder="" />
                <label className="label">Age</label>
                    <input type="text" className="input" value={age} onChange={(e)=>setage(e.target.value)} placeholder="" />
                <label className="label">Gender</label>
                    <input type="text" className="input" value={gender} onChange={(e)=>setgender(e.target.value)} placeholder="" />
                <label className="label">Photo Url</label>
                    <input type="text" className="input" value={photo_url} onChange={(e)=>setphoto_url(e.target.value)} placeholder="" />
                    <p>{error}</p>
                <button className="btn btn-neutral mt-4" onClick={SaveProfile}>Save</button>
            </fieldset>
        </div>
            <FeedCard data = {{firstName,lastName,age,gender,photo_url}}/>
            </div>
            {showToast && <div className="toast toast-top toast-start">
               
                <div className="alert alert-success">
                    <span>Profile Updated successfully.</span>
                </div>
            </div>}
        </>
    )
}

export default EditProfile;
