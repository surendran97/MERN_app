const router= require('express').Router();
const Exercises = require('./../model/exercises.model')


router.get('/',(req,res)=>{
    Exercises.find()
    .then(exercises=>res.json(exercises))
    .catch((err)=>res.status(400).json('error'+err))
});

router.post('/add',(req,res)=>{
    const username=req.body.username;
    const description=req.body.description;
    const duration=Number(req.body.duration)
    
    const date=Date.parse(req.body.date);


    const newExercises = new Exercises({
        username,description,duration,date
    })
    newExercises.save()
    .then(()=>res.json('Exercises Added!'))
    .catch((err)=>res.status(400).json("Error in adding Exercises to DataBasa   "+err))
    
});

router.get('/:id',(req,res)=>{
    Exercises.findById(req.params.id)
    .then(exercises=>res.json(exercises))
    .catch(err=>res.status(400).json("error"+err))
})

router.delete('/:id',(req,res)=>{
    Exercises.findByIdAndDelete(req.params.id)
    .then(exercise=>res.json("user deleted  :"+exercise.username))
    .catch(err=>res.status(400).json('error'+err))
})


router.post('/update/:id',(req,res)=>{
    Exercises.findById(req.params.id)
    .then(exercise=>{
        exercise.username=req.body.username;
        exercise.description=req.body.description;
        exercise.duration=Number(req.body.duration);
        exercise.date=Date(req.body.date);

exercise.save()
.then(()=>res.json("exercises updated"))  
.catch(err=>res.status(400).json('error'+err))  })

.catch(err=>res.status(400).json('error'+err))
})

module.exports = router;
