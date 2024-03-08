import React, { useEffect,  useState } from "react";
import { updateCourse } from "../features/course/courseSlice";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useParams, useNavigate  } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import CustomSnackBar from './CustomSnackBar';
import {FaAnglesLeft} from "react-icons/fa6";



export const UpdateCourse = () => {
    const { courseId }= useParams();
    const Navigate = useNavigate();
    const [editCourse, setEditCourse] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        adminId: ''
    });


    const dispatch = useDispatch();
    
    // get all the information that are already present about the course and then set it to  initial value of form
    useEffect(() => {
        axios.get("http://localhost:8080/admin/getcourse/" + courseId)
        .then((res) => setEditCourse(res.data))
        .catch(error => console.log("Error Ocurred! ", error));

    }, [])     
    

        
    const handleUpdateForm = () => {
        if (editCourse.title && editCourse.description && editCourse.imageUrl && editCourse.price){
            const updatedCourse = {
                courseId: courseId,
                title: editCourse.title,
                description: editCourse.description,
                imageUrl: editCourse.imageUrl,
                price: editCourse.price,
                adminId: editCourse.adminId
            }
           dispatch(updateCourse(updatedCourse));
        }
    }
    
    
    return (
        <main className="add-new-course-section" >
            <Button
                variant="text"
                color = 'secondary'
                style = {{color:'#3333ff', fontFamily: "Nunito Sans,  sans-serif"}}
                onClick = {() => Navigate('..')}
            >
                <FaAnglesLeft style = {{marginRight: 5, color: '#3333ff'}}/> Go back
            </Button>
            <center>
            <Card sx={{ maxWidth: 500, padding: '20px',  marginTop: '30px', alignItems: "center"}}>
            <Typography variant = "h4" component="h2" style={{color:  '#4d4dff', marginBottom: '30px', fontFamily: "Nunito Sans,  sans-serif"}}>Update Course Details</Typography>

                <TextField
                    value = {editCourse.title}
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    size='normal'
                    color="primary"
                    onChange = {(e) => {
                        setEditCourse((preveCourse) => {
                            return {
                                ... preveCourse,
                                title: e.target.value
                            }
                        })
                    }}
                />
                <br /><br />
                <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onChange = {(e) =>
                        setEditCourse((preveCourse) => {
                            return {
                                ... preveCourse,
                                description: e.target.value
                            }
                        })
                    }
                    value = {editCourse.description}
                />
                <br /><br />
                <TextField
                    value = {editCourse.imageUrl}
                    id="outlined-basic"
                    label="ImageUrl"
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onChange = {(e) =>
                        setEditCourse((preveCourse) => {
                            return {
                                ... preveCourse,
                                imageUrl: e.target.value
                            }
                        })
                    }
                />
                <br /><br />
                <TextField
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onChange = {(e) =>
                        setEditCourse((preveCourse) => {
                            return {
                                ... preveCourse,
                                price: e.target.value
                            }
                        })
                    }
                    value = {editCourse.price}
                />
                <br /><br />
                <Button
                    variant="contained"
                    size = "large"
                    style={{background: '#4d4dff'}}
                    onClick = {() => handleUpdateForm()}
                >
                    Save
                </Button>
            </Card>
            <CustomSnackBar message={"Course Updated Successfully!"}/>



            </center>
                
        </main>
    )
}



