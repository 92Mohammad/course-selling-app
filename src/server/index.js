require('dotenv').config();

const express = require('express');
const app =  express();
const connection = require('./DbConnection')
const { Admin, Course} = require('./models/course.models')

const cookieParser = require('cookie-parser')
const cors = require('cors');
const  jwt  = require('jsonwebtoken');
const { auth } = require('./middleware.js');
const { createAccessToken, createRefreshToken} = require('./token.js');


const colorArray =  ['#a3c2c2', '#cbcb44', '#e0b3ff', '#b3cce6', ' #99e6e6'];

app.use(express.json());
app.use(cors());
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Hello world')
})


app.post('/admin/signup', async(req, res) => {
    try {
        const newAdmin = req.body;
        if (newAdmin){
            // first check whether admin exist or not
            const isAdminExist = await Admin.findOne({name : newAdmin.name});
            console.log("hello: ", isAdminExist);
            if (isAdminExist){
                return res.status(404).json({message: "Admin already exist"});
            }
            else {
                // then create new admin in database
                const admin = await Admin.create(newAdmin);
                return res.status(200).json({message: "Admin created successfully"});
            }
        }
        else {
            console.log("hello world");
        }
    }
    catch(error){
        console.log(error);
        return res.sendStatus(404);
    }
})

app.post('/admin/login', async(req, res) => {
    try {

        const {email, password} = req.body;
        const admin = await Admin.findOne({email});
        if (admin){
            console.log(admin.password);
            if (admin.password === password){
                const accessToken = createAccessToken(admin._id); // send it to the client
                return res.status(200).json({accessToken: accessToken, message: 'Successfully login'});
            }
            else {
                return res.status(404).json({message: "Incorrect password!!"});
            }
        }
        else {
            return res.status(404).send("admin not found")
        }

        //     const accessToken = createAccessToken(admin.adminId); // send it to the client
        //     const refreshToken = createRefreshToken(admin.adminId); // store in into token.json and store it into cookies

        //     RefreshTokens.push({adminId: admin.adminId, refreshToken});
        //     // res.cookie('jwt', refreshToken , {httpOnly: true , maxAge: 24 * 60 * 60 * 1000});
        //     res.status(200).send({accessToken: accessToken, message: 'Successfully login'});
        // }
    }
    catch(error){
        console.log(error);
        return res.sendStatus(404);
    }
})

app.get('/admin/me', auth, async(req, res) => {
    try {
        const adminId = req.adminId;
        const admin = await Admin.findOne({_id: adminId})

        if (admin){
            const index = Math.floor(Math.random() * 5);
            const avtarBgColor = colorArray[index];
            const firstLetter = admin.name.charAt(0).toLocaleUpperCase().toString();
            return res.status(200).send({adminName: admin.name, firstLetter: firstLetter, avtarBgColor: avtarBgColor});
        }
        else{
            return res.send({message: "admin does not exist"});
        }
    }
    catch(error) {
        console.log(error);
    }
    
})


// create new course
app.post('/admin/addnewcourse', auth, async(req, res) => {

    try {
        const adminId = req.adminId;
        const {title, description, imageUrl, price } = req.body;

        const isCourseAlreadyExist = await Course.findOne({title, description, imageUrl, price});
        if (isCourseAlreadyExist){
            return res.send({type : 'title', message: 'Title Already exist'});
        }
        else {
            const newCourse = {
                title,
                description,
                imageUrl,
                price,
                adminId
            }
            // create new course
            const course = await Course.create(newCourse);
            return res.status(200).send({type : 'success', message: 'Course created successfully'});
        }
    }
    catch(error){
        console.log(error);
        return res.sendStatus(404);
    }    
})

// get course by course id
app.get('/admin/getcourse/:courseId', async(req, res) => {
    try{
        const { courseId } = req.params;
        const requestedCourse = await Course.findById({_id: courseId});
        return res.status(200).json(requestedCourse);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
})

// get all course
app.get('/admin/getAllCourse', auth,  async(req, res) => {
    try {
        const adminId = req.adminId;
        console.log("admin id ", adminId)

        const courses = await Course.find({adminId : adminId});
        console.log('this is all courses:', courses);
        if (courses){
            return res.status(200).send({type: 'success', courses});
        }
        else {
            return res.send({type: 'error', message: 'There is no course available'});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
})

app.put('/admin/updateCourse', auth, async(req, res) => {
    try {
        const { updatedCourse} = req.body;
        console.log('this is updated course: ',  updatedCourse)
        const course = await Course.findByIdAndUpdate({_id: updatedCourse.courseId});
        const isCourseUpdated = await Course.findOne(updatedCourse);

        if (isCourseUpdated){
            return res.status(200).send({type : 'success', message : "course updated successfully"});
        }
        return res.status(404).json({message: "Error in Update"});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
})

app.post('/admin/logout', async(req, res) => {
    try {
        return res.status(200).send({message: 'Successfully logout'});
    }
    catch(error){
        console.log(error);
        return res.sendStatus(404);
    }

})

app.get('/refresh/token', async(req, res) => {
    try{

        const cookie = req.cookies;
        // first check  whether the cookie contain jwt or not
        if (!cookie?.jwt) return res.send({ message: 'missing cookies'});

        const refreshToken = cookie.jwt;
        const tokenFile = await readFile(tokenDataBasePath, 'utf-8');

        RefreshTokens = JSON.parse(tokenFile);
        const tokenFound =  RefreshTokens.find(token => token.refreshToken === refreshToken);
        if (!tokenFound) return res.status(403).send({message: 'not authorized'});
    
        // now verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (error, adminId) => {
            if (error) return res.status(401).send({message: error});
            console.log(adminId);
            // create new access token and res to user
            const accessToken = createAccessToken(adminId);
            res.send({ accessToken: accessToken });
        })


    }
    catch(error){
        console.log(error);
    }
})

app.listen(process.env.PORT, async() => {
    await connection();
    console.log(`server is running on port ${process.env.PORT}`)
});



