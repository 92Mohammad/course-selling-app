const mongoose = require('mongoose');


const connection  = () => {
    mongoose.connect(process.env.DB_STRING)
        .then(() => {
            console.log("Connected Successfully");
        })
        .catch((error) => console.log(error.message));
}

module.exports =  connection;