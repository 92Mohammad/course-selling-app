import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    courses: [],
    success: false,
    error: false

}

export const addNewCourse = createAsyncThunk('/course/addNewCourse', async(newCourse) => {
    try {
        const response = await axios.post('http://localhost:8080/admin/addnewcourse', {
            title: newCourse.title,
            description: newCourse.description,
            imageUrl: newCourse.imageUrl,
            price: newCourse.price,

        }, {
            headers:{
                'Content-Type': 'application/json',
                "authorization": localStorage.getItem("authToken")
            }
        })
        return response.data;

    }
    catch(error){
        console.log('Error occurred in addnewcourse : ', error);
    }   
})

export const updateCourse = createAsyncThunk('/course/updateCourse', async(updatedCourse) => {
    try {
        const res = await axios.post('http://localhost:8080/admin/updateCourse', {

                updatedCourse: updatedCourse,
            }, {

            headers: {
                "Content-Type" : "application/json"
            }
        })
        console.log("update course response from server", res);
        return res.data;

    }
    catch(error){
        console.log(error)
    }
})

export const getAllCourses = createAsyncThunk('/course/getAllCourses', async() => {
    try {
        const response = await axios.get('http://localhost:8080/admin/getAllCourse', {
            headers: {
                'Content-Type': 'application.json',
                "authorization": localStorage.getItem("authToken")
            }
        })
        return response.data;   
    }
    catch(error){
        console.log('Error occurred in addnewcourse : ', error);
    }
})

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            console.log('inside setMessage', action.payload);
            state.success = action.payload.success;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewCourse.pending, (state, action) => {
                console.log("promise pending state");

            })
            .addCase(addNewCourse.rejected, (state, action) => {
                console.log("promise rejected");
            })
            .addCase(addNewCourse.fulfilled, (state, action) => {
                
                const { type } = action.payload;
                if (type === 'success'){
                    console.log('success message from server')
                    // here we need to set a state so that via using that state we show the snack bar
                    state.success = true;
                }
                else if (type === 'error'){
                    console.log('error message from server');
                    state.error = true;
                }
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                const messageType = action.payload.type;
                if (messageType === 'success'){
                    state.courses = action.payload.Courses;
                }
                else {
                    console.log(action.payload.message);
                }
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                const messageType = action.payload.type;
                console.log('update course slice : ', messageType);
                if (messageType === 'success'){
                    state.success = true;
                }
                else {
                    console.log(action.payload.message);
                }
            })
    }
    
})

export default courseSlice.reducer;
export const { setMessage } = courseSlice.actions;