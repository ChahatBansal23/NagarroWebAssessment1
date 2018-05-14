const Student=require('../../db').Student
const StudentBatch=require('../../db').StudentBatch
const Batch=require('../../db').Batch
const route=require('express').Router()

route.get('/',(req,res)=>{
    // send an array of all students

    Student.findAll()
        .then((students)=>{
            res.status(200).send(students)
        })
        .catch((err)=>{
                res.status(500).send({
                    error: "cannot retreive students"
                })
        })
})

route.post('/',(req,res)=>{
    //We will add students to db using data in req
    Student.create({
        studentName: req.body.studentName
    }).then((student)=>{
        res.status(201).send(student)
    }).catch((err)=>{
        res.status(501).send({
            error: "cannot create a new student"
        })
    })
})

///students/:id
route.get('/:id',(req,res)=>{
    if(isNaN(req.params.id)){
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else
    {
        Student.find({
            where:{
                id: req.params.id
            }
        })
        .then((result)=>{
            if(result){
                res.status(200).json(result)
            }
            else{
                res.status(404).json({
                    message:"no student found with this id"
                })
            }
        })
        .catch(err=>{
            res.status(400).json({
                error: "error in finding "+err
            })
        })
    }
})


///students/:id/batches
route.get('/:id/batches',(req,res)=>{
    if(isNaN(req.params.id)){
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else{
        StudentBatch.find({
            where:{
                studentId: req.params.id
            },
            include:[
                {
                    model:Student
                }
            ]
        })
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(400).json({
                error: 'error in finding: '+err
            })
        })
    }
})


exports = module.exports = route