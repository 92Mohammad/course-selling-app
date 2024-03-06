import Avatar from '@mui/material/Avatar';
import { NavLink,  useNavigate } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import { SiCoursera } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';
import { IoLogOut } from "react-icons/io5";
import { adminLogOut, setLogout } from '../features/admin/adminSlice';
import { useEffect , useState } from 'react';
import axios from 'axios'

export const SideBar = () => {
    const dispatch = useDispatch();
    const { isLogout } = useSelector (state => state.admin);
    const Navigate = useNavigate();
    const [admin, setAdmin] = useState({
        adminName: "Avtar",
        firstLetter: "Y",
        avtarBgColor: ""
    });

    

    const logout = () => {
        dispatch(adminLogOut());
    }

    useEffect(() =>{
        // hit the admin/me end point and then get the admin name 
        axios.get('http://localhost:8080/admin/me', {
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("authToken")
            }
        })
        .then((res) => res.status === 200 && setAdmin(res.data))
        .catch(error => console.log("Error Ocuured! ", error));
    }, [])

    useEffect(() => {
        if (isLogout){
            dispatch(setLogout(false));
            Navigate('/signin')
        }

    }, [dispatch, isLogout, Navigate])

    const activeStyles =  {
        backgroundColor: '#d3cce5'
    }

    return (
        <section className="sidebar-section" style = {{width: "100%"}}>
            <div className='profile-section'  style = {{display: 'flex', flexDirection: 'column' ,alignItems: 'center', justifyContent: 'center', padding: 20, borderBottom: '0.5px solid #8080ff'}} >
                <span style = {{width: "140px", height: "140px", borderRadius: 80 , fontSize: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center',  color: 'black' , backgroundColor: `${admin.avtarBgColor}`,  marginBottom: 5}}>{admin.firstLetter}</span>
                <span style = {{color: 'black', fontSize: '18px', fontWeight: 400}}>{ admin.adminName }</span>
            </div>
            <div className='below-section' style = {{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'fixed', left: 0, width: 300, bottom: 0, top: 228}}>
                <div className='link-section' style = {{display: 'flex', flexDirection: 'column', width: "100%", }}>
                    <NavLink 
                        to = '/admin' 
                        className='links default-link'><MdSpaceDashboard className='icons'
                        style={({ isActive }) => (isActive ? activeStyles : null)} 
                    /> 
                        Dashboard
                    </NavLink>
                    <NavLink 
                        to = 'courses' 
                        style={({ isActive }) => (isActive ? activeStyles : null)} 
                        className='links'
                    >
                        <SiCoursera className='icons'/> 
                        Courses
                    </NavLink>

                    <NavLink 
                        to =  'contents' 
                        style={({ isActive }) => (isActive ? activeStyles : null)} 
                        className='links' 
                    >
                        <BiSolidVideos className='icons' /> Content
                    </NavLink>
                </div>
                <div className='logout-section ' style = {{width: "100%"}}>
                     <button 
                        className = 'logout-btn links'
                        style = {{width: "100%", border: "none", background: 'none', cursor: 'pointer', fontSize: '16px'}} 
                        onClick={() => logout()}
                    >
                        <IoLogOut className='icons'/> Log out
                    </button>
                </div>
            </div>
        </section>
    )
}   