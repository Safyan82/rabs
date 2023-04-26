import { Outlet } from "react-router-dom";
import ResponsiveDrawer from "./components/drawer"
export const Layout = () =>{
    return (
        <>
        <ResponsiveDrawer component = {<Outlet/>}/>
        </>
    )
}