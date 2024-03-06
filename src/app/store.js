import {configureStore} from '@reduxjs/toolkit';
import adminSlice from '../features/admin/adminSlice';
import courseSlice from '../features/course/courseSlice';
    

const store = configureStore({
    reducer: {
        admin: adminSlice,
        course: courseSlice
    }
})

export default store;