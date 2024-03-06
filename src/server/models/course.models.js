const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    name: {
        type : String,
        require: true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    }
});

const UserSchema = mongoose.Schema({
    name: {
        type : String,
        require: true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    }
});

const CourseSchema = mongoose.Schema({
    title: {
      type : String,
      required: true
    },

    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type : String,
        required: true
    },
    price: {
        type : Number,
        require: true
    },
    adminId: { type : Schema.Types.ObjectId, ref: "Admin" }
});

// now create models for schemas

const Admin = mongoose.models(Admin, "AdminSchema");
const User = mongoose.models(User, "UserSchema");
const Course = mongoose.models(Course, "CourseSchema");

module.exports = {
    Admin,
    User,
    Course
}