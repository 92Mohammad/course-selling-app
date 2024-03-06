import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Button from '@mui/material-next/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses} from '../features/course/courseSlice';

    


export const MyCourses = () => {
    const dispatch = useDispatch();
    const { courses } = useSelector(state => state.course);

    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    setTimeout(() => {
        setLoading(false);
    }, 1000)

    useEffect(() => {
        dispatch(getAllCourses());
    }, [])

    return(
        
        <div style = {{ paddingTop: 20, display: 'flex', flexWrap: 'wrap', columnGap: 40, rowGap:30 , position: "fixed", bottom: 0, top: 140 , right: 20, left: 320, overflowY: 'scroll', justifyContent: 'center'}}>
        {
            courses.map((course, index) => (
                <Card key = {index} style ={{ width: 370, height: 350, border: '0.5px solid lightGray' , borderRadius: '10px' }}>  
                    {loading ? ( 
                        <Skeleton   sx={{ bgcolor: '#e6e6ff' }} animation="wave" variant="rectangular" width={'100%'} height={208} style={{ marginBottom: 8 }} />
                        ) : (
                        <img src= {course.imageUrl} alt="course" style = {{width: '100%', height: 208, marginBottom: 8, cursor: "pointer"}}  onClick = {() => Navigate(`${course.courseId}`)}/>
                        )
                    }
                    <div style = {{ paddingLeft: 15, paddingRight: 15}}>
                        <div style = {{display: "flex", flexDirection: "row", paddingTop: 8 ,  justifyContent: "space-between"}}>

                            <div style = {{display:'flex', flexDirection: 'column'}}>
                                {
                                    loading ? (<Skeleton  sx={{ bgcolor: '#e6e6ff' , marginBottom: '3px' , width: '100%' }}  animation="wave"  variant="text" width={200} height={25}  />
                                    ) : (
                                    <span style= {{fontSize: 18, marginBottom: 5,  color: 'black'}}>{course.courseTitle}</span>
                                )}
                                

                                {loading ? (
                                <Skeleton  sx={{ bgcolor: '#e6e6ff' , marginBottom: '3px' , width: '100%' }}  animation="wave"  variant="text" width={200} height={20}  />
                                ) : (
                                <span style= {{fontSize: 14,  color: 'gray' , width: "100%"   }}>{course.description}</span>
                                )}

                                {loading ? (
                                    <Skeleton  sx={{ bgcolor: '#e6e6ff' }}  animation="wave"  variant="text" width={'100%'} height={17} />
                                ) : (
                                <span style= {{fontSize: 15, fontWeigth: 'bold' ,  color: 'black', marginTop: "4px"}}>price: &#8377;{course.price}</span>
                                )}

                            </div>

                            <div className  = "edit-btn">
                                {loading ? (
                                    <Skeleton  sx={{ bgcolor: '#e6e6ff' }}  animation="wave"  variant="circular" width={45} height={45} />

                                ): (
                                    <Fab 
                                    size = "small" 
                                    color = "primary"
                                    style = {{backgroundColor: "#4d4dff"}}
                                    aria-label="edit"
                                    onClick = { () => Navigate('updatecourse/' + course.courseId)}
                                >
                                    <EditIcon 
                                    />
                                </Fab>

                                )}
                                
                            </div>

                        </div>
                        <div style = {{marginTop: '8px'}}>
                            {
                                loading ? (
                                    <Skeleton  sx={{ bgcolor: '#e6e6ff' }}  animation="wave"  variant="rounded" width={'100%'} height={40}  />
                                ) : (
                                <Button
                                    size="medium"
                                    variant="filled"
                                    color="primary"
                                    onClick = { () => Navigate('view-details')}
                                    style = {{fontFamily: "Nunito Sans,  sans-serif", width: '100%', backgroundColor :'#4d4dff'}}
                                >
                                View Details    
                                </Button>)
                            }
                        </div>
                    </div>
                </Card>        
            ))
        }
        </div>        
    )   
}
