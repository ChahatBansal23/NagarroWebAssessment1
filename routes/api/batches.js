const Batch=require('../../db').Batch
const route=require('express').Router()

route.get('/',(req,res)=>{
    // send an array of all batches

    Batch.findAll()
        .then((batches)=>{
            res.status(200).send(batches)
        })
        .catch((err)=>{
                res.status(500).send({
                    error: "cannot retreive batches"
                })
        })
})

route.post('/',(req,res)=>{
    //We will add batches to db using data in req
    Batch.create({
        batchName: req.body.batchName,
        courseId: req.body.courseId
    }).then((batch)=>{
        res.status(201).send(batch)
    }).catch((err)=>{
        res.status(501).send({
            error: "cannot create a new batch"
        })
    })
})


exports = module.exports = route