import SNavbar from "../SNavbar/SNavbar.tsx";
import {Outlet} from "react-router";

const SLayout = () => {
    return (
        <>
            <SNavbar/>
            <Outlet/>
        </>
    )
}

export default SLayout;