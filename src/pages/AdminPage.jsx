import { SideBar } from "../components/SideBar"
import { Outlet } from "react-router-dom"

export const AdminPage = () => {
    return (
        <main style = {{display: 'flex'}}>
            <section style = {{ background: '#e6e6e6', position: 'fixed', left: 0, top: 0, bottom: 0, width: 300 }} className = 'left-section'>
                <SideBar /> 
            </section>
            <section style = {{ position: 'fixed', left: 300, top: 0, bottom: 0, right: 0 }} className = 'right-section'>
                <Outlet/>
            </section>
        </main>

    )
}