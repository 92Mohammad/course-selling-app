import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useSelector, useDispatch} from 'react-redux'
import { setMessage } from '../features/course/courseSlice';
import { useEffect } from 'react';



export default function CustomizedSnackbars({ message }) {
  const [open, setOpen] = React.useState(false);
  const { success } = useSelector(state => state.course); 
  const dispatch = useDispatch();

  console.log('inside customSnakBar component', success);
  console.log(message);
  useEffect(() => {
    if (success){
      setOpen((prevstate => !prevstate));
    }
  }, [success])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(setMessage({success: false}));
  };

  return (
    <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity= "success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
    </div>
  );

}
