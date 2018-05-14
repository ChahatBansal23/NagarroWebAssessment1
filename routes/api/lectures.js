const Lecture=require('../../db').Lecture
const route=require('express').Router()

route.get('/',(req,res)=>{
    // send an array of all lectures

    Lecture.findAll()
        .then((lectures)=>{
            res.status(200).send(lectures)
        })
        .catch((err)=>{
                res.status(500).send({
                    error: "cannot retreive lectures"
                })
        })
})

route.post('/',(req,res)=>{
    //We will add lectures to db using data in req
    Lecture.create({
        lectureName: req.body.lectureName,
        subjectId: req.body.subjectId,
        batchId: req.body.batchId,
        teacherId: req.body.teacherId,
    }).then((lecture)=>{
        res.status(201).send(lecture)
    }).catch((err)=>{
        res.status(501).send({
            error: "cannot create a new lecture"
        })
    })
})

exports = module.exports = route