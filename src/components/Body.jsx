import { Outlet } from "react-router"
import Navbar from "./navbar"

function Body(){
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}

export default Body