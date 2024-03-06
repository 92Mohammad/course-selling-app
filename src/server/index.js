require('dotenv').config();

const express = require('express');
const app =  express();
const {readFile, writeFile} = require('fs').promises;
const path = require('path');
const cookieParser = require('cookie-parser')
const PORT = 8080;
const cors = require('cors');
const  jwt  = require('jsonwebtoken');
const { auth } = require('./middleware.js');
const { createAccessToken, createRefreshToken} = require('./token.js');
const { FaEraser } = require('react-icons/fa6');


let Admins = [];
let Courses = [];
let RefreshTokens = [];
const colorArray =  ['#a3c2c2', '#c2c2a3', '#e0b3ff', '#b3cce6', ' #99e6e6'];

let adminDataBasePath = path.join(__dirname + '/database/admin.json');
let courseDataBasePath = path.join(__dirname + '/database/courses.json')
let tokenDataBasePath = path.join(__dirname + '/database/token.json')

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.get('/', async (req, res) => {  
    res.send('Hello world')
})


app.post('/admin/signup', async(req, res) => {
    try {
        const { adminName, email, password } = req.body;

        const fileData = await readFile(adminDataBasePath, 'utf-8');
        Admins = JSON.parse(fileData);
        // check  whether the current admin email lies inside database or not if not then add this new admin to database.
        const isAdminFound = Admins.find((admin) => admin.email === email);
        // check also for adminName

        if (!isAdminFound){
            const newAdmin = {
                adminId: Date.now().toString(),
                name: adminName,
                email: email,
                password: password,
            };

            Admins.push(newAdmin);
            const formatData = JSON.stringify(Admins, null, 2); 
            await writeFile(adminDataBasePath, formatData);
            return res.send({message: 'Admin created successfully'});

        }
        else if(adminName === isAdminFound.name){
            return res.send({message: "user naem already exist"})

        }
        else{
            return res.send({message: 'Email already exist'});
        }
    }
    catch(error){
        console.log(error);
        return res.sendStatus(404);
    }
})

app.post('/admin/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const fileData = await readFile(adminDataBasePath, 'utf-8');
        Admins = JSON.parse(fileData); 
        const admin = Admins.find((admin) => admin.email === email);

        if (!admin){
            return res.send({message: 'Email does not exist'});
        }
        else if (admin.password !== password){
            return res.send({message: '!!Incorrect Password'});
        }
        else {
            // create a json web token and send it back
            const accessToken = createAccessToken(admin.adminId); // send it to the client
            const refreshToken = createRefreshToken(admin.adminId); // store in into token.json and store it into cookies 
            // write the refresh token with the current adminid in token database

            RefreshTokens.push({adminId: admin.adminId, refreshToken});
            const formatTokenArray = JSON.stringify(RefreshTokens, null, 2);
            await writeFile(tokenDataBasePath, formatTokenArray);

            // res.cookie('jwt', refreshToken , {httpOnly: true , maxAge: 24 * 60 * 60 * 1000});   
            res.status(200).send({accessToken: accessToken, message: 'Successfully login'});
        }
    }
    catch(error){
        console.log(error);
        return res.sendStatus(404);
    }
})

app.get('/admin/me', auth, async(req, res) => {
    try {
        const adminId = req.adminId;
        // find the user name based on the adminId and send it back to as a response
        // first read the admin db file
        const adminFileData = await readFile(adminDataBasePath, 'utf-8');
        Admins = JSON.parse(adminFileData);
        const findAdmin = Admins.find(admin => admin.adminId === adminId);
        if (findAdmin){
            const index = Math.floor(Math.random() * 5);
            const avtarBgColor = colorArray[index];
            const firstLetter = findAdmin.name.charAt(0).toLocaleUpperCase().toString();
            return res.status(200).send({adminName: findAdmin.name, firstLetter: firstLetter, avtarBgColor: avtarBgColor});
        }
        else{
            return res.send({message: "admin does not exist"});
        }
    }
    catch(error) {
        console.log(error);
    }
    
})



app.post('/admin/addnewcourse', auth, async(req, res) => {

    try {
        const adminId = req.adminId;
        const {title, description, imageUrl, price } = req.body;

        const coursesFileData = await readFile(courseDataBasePath, 'utf-8')
        Courses = JSON.parse(coursesFileData);

        const isCourseAlreadyExist = Courses.find((course) => course.courseTitle === title);
        if (isCourseAlreadyExist){
            return res.send({type : 'title', message: 'Title Already exist'});
        }
        else {
            const newCourse = {
                courseId: Date.now().toString(),
                courseTitle: title,
                description,
                imageUrl,
                price,
                adminId
            }
            Courses.push(newCourse)
            // write the file 
            const formatCourseData = JSON.stringify(Courses, null, 2);
            await writeFile(courseDataBasePath, formatCourseData);
            return res.status(200).send({type : 'success', message: 'Course created successfuly'});
        } 

    }
    catch(error){
        console.log(error);
        return res.sendStatus(404);
    }    
})

app.get('/admin/getcourse/:courseId', async(req, res) => {
    try{
        const { courseId } = req.params;
        const courseData  = await readFile(courseDataBasePath, 'utf-8');
        Courses = JSON.parse(courseData);
        const requestedCourse = Courses.find((course) => course.courseId === courseId);
        res.status(200).send(requestedCourse);
        
    }
    catch(error){
        console.log(error);
    }
    
    
})

app.get('/admin/getAllCourse', auth,  async(req, res) => {
    try {
        const adminId = req.adminId;
        if (courseDataBasePath){
            const coursesFileData = await readFile(courseDataBasePath, 'utf-8');
            

            Courses = JSON.parse(coursesFileData);
            Courses =  Courses.filter((course) => course.adminId === adminId);

            if (Courses.length !== 0){
                return res.status(200).send({type: 'success', Courses});
            }
            else {
                return res.send({type: 'error', message: 'There is no course available'});
            }   
        }
    }
    catch(error){
        console.log(error);
    }
})

app.post('/admin/updateCourse', async(req, res) => {
    try {
        const { updatedCourse} = req.body;

        // find the course that has to be update and then update it 
        const courseData = await readFile(courseDataBasePath, 'utf-8');
        Courses = JSON.parse(courseData);
        
        for (let i = 0; i < Courses.length; i++){
            if (Courses[i].courseId === updatedCourse.courseId){
                Courses[i] = updatedCourse;
            }
        }

        // now write the updated courses array into course.json file 
        const formatedData = JSON.stringify(Courses, null, 2);

        if (courseDataBasePath){
            await writeFile(courseDataBasePath, formatedData);
            return res.status(200).send({type : 'success', message : "course updated successfully"});
        }
        return res.send({type : "error", message: "file not found"});

    }
    catch(error) {
        console.log(error);
    }
    
})

app.post('/admin/logout', async(req, res) => {
    try {
        return res.status(200).send({message: 'Successfuly logout'});
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


app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

