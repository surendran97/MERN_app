const router= require('express').Router();
const User = require('./../model/user.model')


router.get('/',(req,res)=>{
    User.find((err,user)=>{
        if(err){
            res.status(400).json('Error'+err)
        }
res.json(user)

    })
    
})


router.post('/add',(req,res)=>{
    const username = req.body.username;
    const newUser = new User({username})

    newUser.save()
    .then(()=>res.json("user Added"))
    .catch((err)=>res.status(400).json('error'+err))
})

module.exports=router;