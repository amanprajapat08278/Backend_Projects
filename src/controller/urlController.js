const {isValidUrl} = require("../validation/validation")


const createUrl = async (req, res)=>{
    let url = req.body.longUrl 
    if(Object.keys(req.body).length == 0){return res.status(400).send({status: false, message: "Please enter URL"})}
    
    if(!isValidUrl(url)){return res.status(400).send({status: false, message: "Please enter valid URL"})}

     return res.send("Yes")

}


const getUrl = async (req, res)=>{

}



module.exports = {createUrl, getUrl}