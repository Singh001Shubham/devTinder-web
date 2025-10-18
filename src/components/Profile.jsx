import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import API_BASE_URL from "../constants/constant"


function Profile(){
    const user = useSelector((store)=>store.user)
   
    return user && (
        <>
            <div>
                <EditProfile user={user}/>
               
            </div>
        </>
    )
}

export default Profile;