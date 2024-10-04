
//sample application middleware created to test
const appMiddleware = (req,res,next)=>{
    console.log("Inside app middleware !!!!!");
    next();
}
module.exports = appMiddleware;