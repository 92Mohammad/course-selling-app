import React from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CustomSnackBar from './CustomSnackBar';
import {useRef } from 'react'
import { addNewCourse} from '../features/course/courseSlice';
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaAnglesLeft } from "react-icons/fa6";
import { Typography } from '@mui/material';
export const AddNewCourse = () => {

    const titleRef = useRef();
    const descriptionRef = useRef();
    const ImageUrlRef = useRef();
    const priceRef = useRef();
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const handleCourseForm = () => {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const imageUrl  = ImageUrlRef.current.value;
        const price = priceRef.current.value;

        const isContainValue = Boolean(title) && Boolean(description) && Boolean(imageUrl) && Boolean(price);
        if (isContainValue){
            const newCourse = {
                title,
                description,
                imageUrl,
                price
            }
            dispatch(addNewCourse(newCourse));
            titleRef.current.value = "";
            descriptionRef.current.value  = "";
            ImageUrlRef.current.value = "";
            priceRef.current.value = "";
        }
    }

    return (
        <main className="add-new-course-section">
            <Button 
                    variant="text" 
                    color = 'secondary'                    
                    style = {{color:'#3333ff', fontFamily: "Nunito Sans,  sans-serif"}}
                    onClick = {() => Navigate('..')}
                > 
                    <FaAnglesLeft style = {{marginRight: 5, color: '#3333ff'}}/> Go back
            </Button>
             <center>
             
                <Card sx={{ maxWidth: 450, padding: '20px' , marginTop: 10 }}>
                    <Typography variant = "h4" component="h2" style={{color:  '#4d4dff', marginBottom: '10px', fontFamily: "Nunito Sans,  sans-serif"}}>New Course</Typography>
                    <TextField 
                        required
                        id="outlined-basic" 
                        label="Title" 
                        variant="outlined" 
                        fullWidth 
                        size='normal' 
                        color="primary" 
                        inputRef={titleRef}
                        
                    />
                    <br /><br />
                    <TextField 
                        required
                        id="outlined-basic" 
                        label="Description" 
                        variant="outlined" 
                        fullWidth 
                        color="primary" 
                        inputRef={descriptionRef}

                    />
                    <br /><br />
                    <TextField 
                        required
                        id="outlined-basic" 
                        label="ImageUrl" 
                        variant="outlined" 
                        fullWidth 
                        color="primary"  
                        inputRef={ImageUrlRef}

                    />
                    <br /><br />
                    <TextField 
                        required
                        id="outlined-basic" 
                        label="Price" 
                        variant="outlined" 
                        fullWidth 
                        color="primary" 
                        inputRef={priceRef}
                    />
                    <br /><br />
                    <Button 
                        variant="contained"  
                        size = "medium" 
                        style={{background: '#4d4dff'}}
                        onClick = {() => handleCourseForm()}
                    >
                        Create
                    </Button>
                </Card>
                <CustomSnackBar message={"Course Created successfully"}/>
            </center>
        </main>
    )
}


