import axios from "axios";
import API_BASE_URL from "../constants/constant";
import { useEffect, useState } from "react";

const Premium = ()=>{
    const [premiumMember,setpremiumMember] = useState(false);
    const isPremium = async()=>{
        try{
            const check = await axios.get(API_BASE_URL+"premium/check",{
                withCredentials:true
            })
            // console.log(check.data.userType)
            setpremiumMember(check.data.userType)
            // console.log(premiumMember)
        }catch(err){
            console.log("Error : "+err.message)
        }
    }
    const createOrder = async(memberShipType)=>{

        try{
            const order = await axios.post(API_BASE_URL+"premium/createOrder",{
                memberShipType
            },{withCredentials:true}) 
            const {key,amount,currency,notes,id,emailId,OrderId} = order?.data;
            var options = {
                "key": key, // Enter the Key ID generated from the Dashboard
                "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": currency,
                "name": notes.firstName + " "+ notes.lastName,
                "order_id": OrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "prefill": {
                "name": notes.firstName + " "+ notes.lastName,
                "email": emailId,
                "contact": "9000090000"
            },
                "theme": {
                "color": "#3399cc"
            }
            };
            var rzp1 = new Razorpay(options);
             rzp1.open();
        }catch(err){
            console.log("Error : "+err.message)
        }

    }

    useEffect(()=>{
        isPremium()
    },[]);
                // console.log(premiumMember)

    return premiumMember==='false'?(
        <>
            <div className="m-10">
                <div className="flex w-full">
                    <div className="card bg-base-800 rounded-box grid h-80 grow place-items-center border-4 border-purple-500 rounded-lg">
                        <h2>Silver Membership</h2>
                        <ul>
                            <li>100 Connection Requests per day</li>
                            <li>Blue Tick</li>
                            <li>Lorem ipsum</li>
                        </ul>
                        <button className="btn btn-secondary bg-sky-500/100" onClick = {()=>{createOrder("silver")}}>Buy Silver</button>
                    </div>
                    <div className="divider divider-horizontal">OR</div>
                    <div className="card bg-base-800 rounded-box grid h-80 grow place-items-center border-4 border-purple-500 rounded-lg">
                        <h2>Gold Membership</h2>
                        <ul>
                            <li>1000 Connection Requests per day</li>
                            <li>Blue Tick</li>
                            <li>chat</li>
                        </ul>
                        <button className="btn btn-primary bg-yellow-500/100"  onClick = {()=>{createOrder("gold")}}>Buy Gold</button>
                    </div>
                </div>
            </div>
        </>
    ):<div>You are already a premium member</div>
}

export default Premium;