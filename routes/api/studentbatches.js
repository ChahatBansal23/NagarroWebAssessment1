const StudentBatch=require('../../db').StudentBatch
const route=require('express').Router()

route.get('/',(req,res)=>{
    // send an array of all students

    StudentBatch.findAll()
        .then((studentbatches)=>{
            res.status(200).send(studentbatches)
        })
        .catch((err)=>{
                res.status(500).send({
                    error: "cannot retreive student batch information"
                })
        })
})

route.post('/',(req,res)=>{
    //We will add student batch mapper to db using data in req
    StudentBatch.create({
        batchId: req.body.batchId,
        studentId: req.body.studentId
    }).then((studentbatch)=>{
        res.status(201).send(studentbatch)
    }).catch((err)=>{
        res.status(501).send({
            error: "cannot create a new student-batch mapper"
        })
    })
})

exports = module.exports = route