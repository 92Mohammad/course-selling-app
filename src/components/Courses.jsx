import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material-next/Button';
import { LuPlus } from "react-icons/lu";
import { Outlet, useNavigate } from 'react-router-dom';


export const Courses = () => {
    const Navigate = useNavigate();
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return (
        <main style = {{padding: 20 , position : "fixed", top: 0, bottom: 0, right: 0, left: 300}}>
            <h1 style = {{color: '#4d4dff', fontSize: 40 ,margin: 0}}>Courses</h1>            
            <nav 
                style = {{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, borderBottom: '0.5px solid lightGray'}}> 

                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                >
                    <Tab 
                        value="one" 
                        label="My Courses" 
                        onClick={() => Navigate('')}  
                    />
                    <Tab 
                        value="two" 
                        label="Lecture Pdf" 
                        onClick={() => Navigate('lectures-notes')} 
                    />
                    <Tab 
                        value="three" 
                        label="Quizes" 
                        onClick={() => Navigate('quizes')} 
                    />

                </Tabs>
                <div>
                    <Button 
                        variant="filled"
                        onClick = {() => Navigate('addnewcourse')}
                        style = {{fontFamily: "Nunito Sans,  sans-serif", fontsize: '20px', backgroundColor :'#4d4dff'}}
                    >
                        <LuPlus style = {{marginRight: 5}}/> 
                        New Course
                    </Button>
                </div>
            </nav>

            <section style = {{ position: "fixed", bottom: 0, top: 140 , right: 20, left: 320}}>
                <Outlet/>
            </section>
        </main>
    )
}