import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react' 
import { adminLogin, setLogin, setErrorMessage } from '../features/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';




export const SigninPage = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const { isLogin, emailMessage, passwordMessage } = useSelector(state => state.admin);
    const Navigate = useNavigate();

    
    

    const handleAdminLogin = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const isContainValue = Boolean(email) && Boolean(password);
        if (isContainValue){
            const Admin = {
                email,
                password
            }
            dispatch(adminLogin(Admin));
        }
    }

    useEffect(() => {
        if (isLogin){
            dispatch(setLogin(false));
            Navigate('/admin')
        }

    }, [dispatch, isLogin, Navigate])

    
    return (
        <main style = {{paddingTop: "22vh"}}>
            <center>
                <Card sx={{ maxWidth: 450, padding: '20px' }}>
                    <h1 style={{color: '#8080ff'}}>Admin Sign in</h1>
                    <TextField 
                        id="outlined-email-input" 
                        label="Email" 
                        variant="outlined" 
                        fullWidth       
                        error = {emailMessage !== ''}
                        helperText = {emailMessage}
                        size='normal'
                        type='email'
                        inputRef={emailRef}
                        onFocus={() => dispatch(setErrorMessage({type: 'email', message: ''}))}
                    />
                    <br /><br />
                    <TextField 
                        id="outlined-password-input" 
                        label="Password" 
                        variant="outlined" 
                        error  = {passwordMessage !== ''}
                        helperText = {passwordMessage}
                        fullWidth 
                        inputRef={passwordRef}
                        type='password'
                        onFocus={() => dispatch(setErrorMessage({type: 'password', message: ''}))}
                    />
                    <br /><br />
                    <Button 
                        variant="contained" 
                        fullWidth 
                        size = "large" 
                        style={{background: '#8080ff'}}
                        onClick = {() => handleAdminLogin()}
                    >
                        Sign in
                    </Button>
                    <br /><br />
                    <div>
                        <Link to = '/'>Don't have an account? Sign Up</Link>
                    </div>
                </Card>
            </center>
        </main>
    )
}