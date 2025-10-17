import { useState } from "react";
import axios from 'axios';
import userSlice, { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [emailId,setEmail] = useState();
    const [password,setPassword] = useState();//"Elon1@123"
    const [firstName,setfirstName] = useState()
    const [lastName,setlastName] = useState()
    const [age,setage] = useState()
    const [gender,setgender] = useState()
    const [error,seterror] = useState("");
    const [loginPage,setloginPage] = useState(true);

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
          const response = await axios.post("/api/login",{
            emailId:emailId,
            password:password
          },{withCredentials:true}) 
            dispatch(addUser(response.data))
            return navigate("/") 
        }catch(err){
            console.log("Error : "+err.message)
            return navigate("/login") 
        }
       // console.log(emailId,password)
    }

    const handleSignup= async(e)=>{
        e.preventDefault();
        try{
          const response = await axios.post("/api/signup",{
            emailId:emailId,
            password:password,
            firstName : firstName,
            lastName : lastName,
            age : age,
            gender : gender,

          },{withCredentials:true}) 
            dispatch(addUser(response.data))
            return navigate("/profile") 
        }catch(err){
            console.log("Error : "+err.message)
            return navigate("/login") 
        }
    }
    return (
        <>
            <div className="loginContainer">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">{loginPage ?"Login" :"signup"}</legend>
                {!loginPage && 
                <>
                <label className="label">First Name</label>
                    <input type="text" className="input" value={firstName} onChange={(e)=>{setfirstName(e.target.value)}} placeholder="" />
                <label className="label">Last Name</label>
                    <input type="text" className="input" value={lastName} onChange={(e)=>setlastName(e.target.value)} placeholder="" />
                <label className="label">Age</label>
                    <input type="text" className="input" value={age} onChange={(e)=>setage(e.target.value)} placeholder="" />
                <label className="label">Gender</label>
                    <input type="text" className="input" value={gender} onChange={(e)=>setgender(e.target.value)} placeholder="" />
                    </>
                }    
                <label className="label">Email</label>
                    <input type="email" className="input" value={emailId} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />

                <label className="label">Password</label>
                    <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />

                <button className="btn btn-neutral mt-4" onClick={loginPage ? handleSubmit : handleSignup }>{loginPage ?"Login" :"signup"}</button>

                <p className="m-auto cursor-pointer py-2" onClick={()=>setloginPage((value)=>!value)}>{loginPage ?"signup" :"login"}</p>
            </fieldset>
            </div>
        </>
    )
}

export default Login;
