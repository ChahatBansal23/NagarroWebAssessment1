const Course = require('../../db').Course
const Batch = require('../../db').Batch
const Lecture = require('../../db').Lecture
const Student = require('../../db').Student
const Subject = require('../../db').Subject
const Teacher = require('../../db').Teacher
const StudentBatch = require('../../db').StudentBatch
const route = require('express').Router()

route.get('/', (req, res) => {
    // send an array of all courses
    console.log("in courses")
    Course.findAll()
        .then((courses) => {
            res.status(200).send(courses)
        })
        .catch((err) => {
            res.status(500).send({
                error: "cannot retreive courses"
            })
        })
})

route.post('/', (req, res) => {
    //We will add courses to db using data in req
    Course.create({
        courseName: req.body.courseName
    }).then((course) => {
        res.status(201).send(course)
    }).catch((err) => {
        res.status(501).send({
            error: "cannot create a new course"
        })
    })
})

route.get('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else {
        Course.findAll({
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
                        message: "no course found with this course id"
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

route.get('/:id/batches', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else {
        Batch.findAll({
            where: {
                courseId: req.params.id
            }
        })
            .then((result) => {
                if (result) {
                    res.status(200).json(result)
                }
                else {
                    res.status(404).json({
                        message: "no batches found in this course id"
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


///courses/:cid/batches/:bid 
route.get('/:cid/batches/:bid', (req, res) => {
    if (isNaN(req.params.cid) || isNaN(req.params.bid)) {
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else {
        Batch.findAll({
            where: {
                courseId: req.params.cid,
                id: req.params.bid
            }
        })
            .then((result) => {
                if (result) {
                    res.status(200).json(result)
                }
                else {
                    res.status(404).json({
                        message: "no batches found in this course id"
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

///courses/:id/batches/:id/lectures
route.get('/:cid/batches/:bid/lectures', (req, res) => {
    if (isNaN(req.params.cid) || isNaN(req.params.bid)) {
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else {
        Batch.find({
            where: {
                courseId: req.params.cid,
                id: req.params.bid
            }
        })
            .then((result) => {
                if (result) {
                    Lecture.findAll({
                        where: {
                            batchId: result.id
                        }
                    }).then((output) => {
                        res.status(200).json(output)
                    })
                }
                else {
                    res.status(404).json({
                        message: "no specified batch and course combination have lectures currently"
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

///courses/:id/batches/:id/lectures/:id
route.get('/:cid/batches/:bid/lectures/:lid', (req, res) => {
    if (isNaN(req.params.cid) || isNaN(req.params.bid) || isNaN(req.params.lid)) {
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else {
        Batch.find({
            where: {
                courseId: req.params.cid,
                id: req.params.bid
            }
        })
            .then((result) => {
                if (result) {
                    Lecture.findAll({
                        where: {
                            batchId: result.id,
                            id: req.params.lid
                        }
                    }).then((output) => {
                        res.status(200).json(output)
                    })
                }
                else {
                    res.status(404).json({
                        message: "no specified batch and course combination have lectures currently"
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

///courses/:id/batches/:id/students
route.get('/:cid/batches/:bid/students', (req, res) => {
    if (isNaN(req.params.cid) || isNaN(req.params.bid)) {
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else {
        Batch.find({
            where: {
                id: req.params.bid,
                courseId: req.params.cid
            }
        }).then((temp) => {

            console.log(temp)
            StudentBatch.findAll({
                where: {
                    batchId: temp.dataValues.id
                },
                include: [
                    {
                        model: Student
                    }
                ]
            })
                .then((result) => {
                    res.status(200).json(result)
                })
        })
            .catch(err => {
                res.status(400).json({
                    error: 'error in finding: ' + err
                })
            })
    }
})

//courses/:id/batches/:id/teachers
route.get('/:cid/batches/:bid/teachers', (req, res) => {
    if (isNaN(req.params.cid) || isNaN(req.params.bid)) {
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else {
        Batch.find({
            where: {
                id: req.params.bid,
                courseId: req.params.cid
            }
        }).then((temp) => {
            console.log(temp)
            Subject.findAll({
                where: {
                    courseId: temp.dataValues.courseId
                }
            })
            .then((subjects)=>{
                console.log("\n\n\n\n "+subjects+"\n\n\n")
                Teacher.findAll({
                    where: {
                        subjectId: subjects.dataValues.id
                    }
                })
            })
                .then((result) => {
                    console.log("\n\n\n\n "+result+"\n\n\n")
                    res.status(200).json(result)
                })
        })
            .catch(err => {
                res.status(400).json({
                    error: 'error in finding: ' + err
                })
            })
    }
})

//to update a given course name referenced by id
route.put('/:id', (req,  res)  =>  {
    Course.update({
        courseName: req.body.courseName
    },{
        where:{
            id: parseInt(req.params.id)
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

exports = module.exports = route


