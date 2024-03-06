const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader){
            return res.status(404).send({type: 'error', message: 'missing auth header'});
        }
        await jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET_KEY, (error, admin) => {
            if (error) return res.send({ type: 'error', message: error.message });
            req.adminId = admin.adminId;
            next();
        });
    }
    catch(error) {
        console.log(error);
        return res.send({error: error.message});
    }
}

module.exports = {auth};