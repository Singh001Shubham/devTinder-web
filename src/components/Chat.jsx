import { useParams } from "react-router"
import { useEffect } from "react";
import { initialiseSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useState } from "react";
import  axios from "axios";
import API_BASE_URL from "../constants/constant";
const Chat = ()=>{
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    // console.log({targetUserId})
    const user = useSelector((store)=>store.user);
    const userId = user?._id
    const firstName = user?.firstName
    // console.log(userId)
    const getChats = async()=>{
       try{
         const getMessages = await axios.get(API_BASE_URL+"chats/"+targetUserId,{withCredentials:true})
        console.log({getMessages});
        const mesg = getMessages?.data?.chat?.messages.map((msg)=>{
            return {
                'firstName' : msg.senderId.firstName,
                'lastName' : msg.senderId.lastName,
                'newMessage': msg.text,
                'targetUserId' : msg.senderId
            }
        })
        setMessages(mesg)
       }catch(err){
        console.log("Error : "+err.message)
       }
    }

    useEffect(()=>{
        getChats();
    },[]);

    useEffect(()=>{
        const socket = initialiseSocketConnection();

        socket.emit("joinChat",({targetUserId,userId}))
        socket.on("newMessageReceived",({targetUserId,firstName,newMessage})=>{
            setMessages((messages)=>[...messages,{firstName,newMessage,targetUserId}])
        })
        return ()=>{
            socket.disconnect();
        }
    },[userId,targetUserId]);

    const sendNewMessage = ()=>{
        const socket = initialiseSocketConnection();
        socket.emit("sendMessage",({targetUserId,userId,newMessage,firstName}))
       
        setMessages((messages)=>[...messages,{firstName,newMessage,targetUserId}])
         setNewMessage("")
    }

    console.log({messages})
    return (
        <>
          <div className="flex flex-col mx-auto w-full max-w-2xl h-[70vh] m-5 border border-gray-600 rounded-lg bg-gray-900 shadow-lg">
            <h2 className="p-4 border-b border-gray-600 text-xl font-semibold text-white">
                Chat
            </h2>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-white">
                 {messages.map((msg, index) => (
            <div
            key={index}
            className={`chat ${msg.targetUserId._id === userId ? "chat-end" : "chat-start"}`}
            >
            <strong>{msg.firstName}:</strong> {msg.newMessage}
          </div>
        ))}

        </div>
      

        <div className="p-4 border-t border-gray-600 flex items-center gap-3 bg-gray-800 rounded-b-lg">
            <input
            type="text"
            onChange = {(e)=>setNewMessage(e.target.value)} value={newMessage}
            className="flex-1 border border-gray-600 text-white rounded-lg p-2 bg-transparent focus:outline-none focus:border-green-500"
            placeholder="Type your message..."
            />
            <button onClick={sendNewMessage} className="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded-lg transition">
            Send
            </button>
        </div>
        </div>

        </>
    )
}


export default Chat