import io from "socket.io-client";
import API_BASE_URL from "../constants/constant";

export const initialiseSocketConnection = () =>{
   if(location.hostname==="localhost"){
     return io(API_BASE_URL)
   }else{
     return io("/",{path:"/api/socket.io"});
   }
}