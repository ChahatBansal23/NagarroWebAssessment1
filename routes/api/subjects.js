const Subject = require('../../db').Subject
const Teacher = require('../../db').Teacher
const Course=require('../../db').Course
const route = require('express').Router()

route.get('/', (req, res) => {
    // send an array of all subjects

    Subject.findAll()
        .then((subjects) => {
            res.status(200).send(subjects)
        })
        .catch((err) => {
            res.status(500).send({
                error: "cannot retreive subjects"
            })
        })
})

route.post('/', (req, res) => {
    //We will add subjects to db using data in req
    Subject.create({
        subjectName: req.body.subjectName,
        courseId: req.body.courseId
    }).then((subject) => {
        res.status(201).send(subject)
    }).catch((err) => {
        res.status(501).send({
            error: "cannot create a new subject"
        })
    })
})

///subjects/:id
route.get('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else {
        Subject.find({
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (result) {
                    res.status(200).json(result)
                }
                else {
                    res.status(404).json({
                        message: "no subject found with this id"
                    })
                }
            })
            .catch(err => {
                res.status(400).json({
                    error: "error in finding " + err
                })
            })
    }
})

///subjects/:id/teachers
route.get('/:id/teachers', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else {
        Teacher.findAll({
            where: {
                subjectId: req.params.id
            },
            include: [
                {
                    model: Subject
                }
            ]
        })
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(400).json({
                    error: 'error in finding: ' + err
                })
            })
    }
})

//to update a given subject name referenced by id
route.put('/:id', (req,  res)  =>  {
    Course.findOne({
        where:  {
            id: parseInt(req.body.courseId)
        }
    })
        .then((course)  =>  {
            Subject.update({
                subjectName:  req.body.subjectName,
                courseId:  parseInt(req.body.courseId)
            }, {
                    where: {
                        id:  parseInt(req.params.id)
                    }
                })
                .then((response)  =>  {
                    console.log("Update subject successful")
                    res.send("Subject successfully updated")
                })
                .catch((err)  =>  {
                    console.log("Error updating subject")
                    res.send({ success:  false })
                })
        })
        .catch((err)  =>  {
            console.log("Error getting course")
            res.send({ success:  false })
        })
})

exports = module.exports = route