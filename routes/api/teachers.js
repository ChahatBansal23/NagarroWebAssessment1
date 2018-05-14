const Teacher = require('../../db').Teacher
const route = require('express').Router()

route.get('/', (req, res) => {
    // send an array of all teachers

    Teacher.findAll()
        .then((teachers) => {
            res.status(200).send(teachers)
        })
        .catch((err) => {
            res.status(500).send({
                error: "cannot retreive teachers"
            })
        })
})

route.post('/', (req, res) => {
    //We will add teachers to db using data in req
    Teacher.create({
        teacherName: req.body.teacherName,
        subjectId: req.body.subjectId
    }).then((teacher) => {
        res.status(201).send(teacher)
    }).catch((err) => {
        res.status(501).send({
            error: "cannot create a new teacher"
        })
    })
})

///teachers/:id
route.get('/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: "id should be a number"
        })
    }
    else {
        Teacher.find({
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
                        message: "no teacher found with this id"
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

///teachers/:id/batches  
route.get('/:id/batches', (req, res) => {
    Teacher.findAll({
        include:
            [{
                model: Subject,
                include: [{
                            model: Course,
                            include: [Batch]
                        }]
            }]
    })
})


    exports = module.exports = route