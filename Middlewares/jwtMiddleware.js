const jwt = require('jsonwebtoken');

const jwtMiddleware = (req,res,next)=>{
    console.log("inside jwtMiddleware");
    // if(req.headers['authorization']){
    //     res.status(401).json("Authorization failed,please login");
    // }
    const token = req.headers['authorization'].split(' ')[1];
    console.log("token:-",token);
    try{
        const jwtResponse = jwt.verify(token,"userpwd123");
        console.log(jwtResponse);
        req.payload = jwtResponse.userid
        next();
    }
    catch(err){
        res.status(401).json("Authorization failed,please login");
    }
}
module.exports = jwtMiddleware;