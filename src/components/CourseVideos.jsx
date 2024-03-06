import Button from '@mui/material-next/Button';
import { FaAnglesLeft } from "react-icons/fa6";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import  harkiratImage  from '../images/harkirat.png'
import { useState } from 'react';

export const CourseVideos = () => {
    const Navigate = useNavigate();

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    return(
        <div className="videos-container" style = {{}}>
            <nav style = {{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Button 
                    variant="text" 
                    color = 'secondary'                    
                    style = {{color:'#3333ff', fontFamily: "Nunito Sans,  sans-serif"}}
                    onClick = {() => Navigate('..')}
                > 
                    <FaAnglesLeft style = {{marginRight: 5, color: '#3333ff'}}/> Go back
                </Button>
                <div className="right=section">
                    <Button 
                        variant="filled"
                        startIcon={<CloudUploadIcon />}
                        tabIndex={-1}
                        style = {{fontFamily: "Nunito Sans,  sans-serif", fontsize: '20px', backgroundColor :'#4d4dff'}}
                    >
                        Upload Video
                        <VisuallyHiddenInput type="file" />

                    </Button>
                </div>
            </nav>
            <div style = {{ background: 'red' , display: 'flex' ,flexDirection: 'row', flexWrap: 'wrap', columnGap: 25, rowGap: 20,   marginTop: 5, border: '0.5px solid lightGray', padding: 10, borderRadius: '8px', position: 'fixed' ,left: 320, right: 40, top: 180, bottom: 20 , overflow: 'auto' }}>
                <Video />
                <Video />
                <Video />
            </div>
        </div>
    )
}

const Video = () => {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 1000)
    return (
        <Card style={{width: '24vw', height: '21vh',  borderRadius: '8px' }}>
            {loading ? ( 
                <Skeleton   sx={{ bgcolor: '#f7ecf8' }} animation="wave" variant="rounded" width={'100%'} height={'21vh'} style={{ marginBottom: 8 }} />
                ) : (
                <img src= {harkiratImage} alt="course" style = {{width: '100%',  height: '21vh', borderRadius: '8px',}}/>
                )
            }
        </Card>
    )
}

