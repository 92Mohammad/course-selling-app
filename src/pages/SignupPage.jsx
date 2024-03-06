import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link , useNavigate} from 'react-router-dom';
import { useRef, useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux'
import { adminSignup, setErrorMessage , setSignup } from '../features/admin/adminSlice';


export const SignupPage = () => {
    const dispatch = useDispatch();
    const { emailMessage, passwordMessage, isSignup}  = useSelector(state => state.admin) ;
    const Navigate = useNavigate();
   
    const emailRef = useRef();
    const passwordRef = useRef();
    const adminNameRef = useRef();
    
    
    const handleAdminForm = () => { 
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const adminName = adminNameRef.current.value;
        console.log("admin name inside form ", adminName);
        const canSave = Boolean(email) && Boolean(password) && Boolean(adminName);
   
        if (canSave){
            const newAdmin = {
                adminName,
                email,
                password
            }
            dispatch(adminSignup(newAdmin));
           
        } 
    }

    useEffect(() => {
        if (isSignup){
            dispatch(setSignup(false));
            Navigate('/signin')
        }

    }, [dispatch, isSignup, Navigate])


    return (
        <main style = {{paddingTop: "22vh"}}>
            <center>
                <Card sx={{ maxWidth: 450, padding: '20px', borderRadius: '8px' }}>
                    <h1 style={{color: '#8080ff'}}>Admin Sign up</h1>
                    <TextField 
                        required
                        inputRef = {adminNameRef} 
                        id="outlined-base" 
                        type='text'
                        // error = {passwordMessage !== ''}
                        label={"Name" }
                        variant="outlined" 
                        fullWidth
                        // helperText = {passwordMessage}
                        // onFocus={() => dispatch(setErrorMessage({type: 'password', message: ''}))}
                    />  
                    <br /><br /><br />
                    <TextField 
                        required 
                        inputRef = {emailRef} 
                        id="outlined-basic" 
                        label={"Email"} 
                        variant="outlined" 
                        error = {emailMessage !== ''}
                        fullWidth 
                        type='email'
                        size='normal' 
                        onFocus={() => dispatch(setErrorMessage({type: 'email', message: ''}))}
                        helperText = {emailMessage}
                    />
                    <br /><br />
                    <TextField 
                        required 
                        inputRef = {passwordRef} 
                        id="outlined-password-input"
                        label="Password" 
                        variant="outlined" 
                        type='password'
                        fullWidth

                    />
                    <br /><br />
                    
                    <Button 
                        variant="contained"  
                        fullWidth 
                        size = "large" 
                        style={{background: '#8080ff'}}
                        onClick = {() => handleAdminForm()}
                    >
                        SignUp
                    </Button>
                    <br /><br />
                    <div>
                        <Link to = '/signin'>Already have an account? SignIn</Link>
                    </div>
                </Card>
            </center>
        </main>
    )

}   



// https://appx-wsb.kaxa.in/teachcode/admin/COURSE/cover/1699610063563WhatsApp-Image-2023-11-08-at-8.31.14-PM.jpeg
// https://media.graphassets.com/output=format:jpg/resize=height:800,fit:max/YNhZZIb9QCem3niUJ7Ut