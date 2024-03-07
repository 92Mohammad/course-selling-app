const mongoose = require('mongoose');

const AdminSchema =  new mongoose.Schema({
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

const UserSchema = new mongoose.Schema({
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

const CourseSchema = new mongoose.Schema({
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
    adminId: { type : mongoose.Schema.Types.ObjectId, ref: "Admin" }
});

// now create models for schemas

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}