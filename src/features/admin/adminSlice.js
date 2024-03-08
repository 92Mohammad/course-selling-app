import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    emailMessage: "",
    passwordMessage: "",
    isSignup: false,
    isLogin: false,
    isLogout: false
}   

export const adminSignup = createAsyncThunk('/admin/adminSignup', async(newAdmin) => {
    console.log("admin name inside form ", newAdmin.adminName);
    
    try {
        const response = await axios.post('http://localhost:8080/admin/signup', {
            name: newAdmin.adminName,
            email: newAdmin.email,
            password: newAdmin.password
        });
        return response.data;
    }
    catch(error){
        console.log(error);
    }
})


export const adminLogin = createAsyncThunk('/admin/adminLogin', async(ADMIN) => {
    try {
        console.log(ADMIN)
        const response = await axios.post('http://localhost:8080/admin/login', {
            email: ADMIN.email,
            password: ADMIN.password
        });
        return response.data;
    }
    catch(error){
        console.log(error);
    }
})

export const adminLogOut = createAsyncThunk('/admin/adminLogOut', async() => {
    try {
        const response = await axios.post('http://localhost:8080/admin/logout');
        return response.data;
    }

    catch(error){
        console.log(error);
    }
})

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            const { type , message } = action.payload; 
            if (type === 'password'){
                state.passwordMessage = message;
            }
            else if (type === 'email'){
                state.emailMessage = message
            }
        },
        setSignup: (state, action) => {
            state.isSignup = action.payload;
        },
        setLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setLogout: (state, action) => {
            state.isLogout = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminSignup.pending, (state, action) => {
                console.log("pending")
            })
            .addCase(adminSignup.fulfilled, (state, action) => {
                const { message } = action.payload;
                if (message === 'Amdin already exist'){
                    state.emailMessage = 'Email already exist';
                }
                else if (message === 'Admin created successfully'){
                    console.log('inside fulfilled function')
                    state.isSignup = true;    
                }
            })
            .addCase(adminSignup.rejected, (state, action) => {
                console.log("rejected")
            })
            .addCase(adminLogin.pending, (state, action) => {
                console.log("pending")
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                console.log(action.payload);
                const { message } = action.payload;
                if (message === 'Email does not exist'){
                    state.emailMessage = message;
                }
                else if (message === '!!Incorrect Password'){
                    state.passwordMessage = message;
                }
                else if (message === 'Successfully login'){
                    // extract the token from payload and store token into localStorage
                    const { accessToken } = action.payload;
                    localStorage.setItem('authToken', accessToken);
                    state.isLogin = true;
                }
            })

            .addCase(adminLogin.rejected, (state, action) => {
                console.log("rejected")
            })
            .addCase(adminLogOut.fulfilled, (state, action) => {
                console.log(action.payload);
                const { message } = action.payload;
                if (message === 'Successfully logout'){
                    // remove the authToken from local storage
                    localStorage.removeItem("authToken");
                    state.isLogout = true;
                }
            })
    }   
})  


export default adminSlice.reducer;
export const { setErrorMessage, setSignup, setLogin, setLogout } = adminSlice.actions;