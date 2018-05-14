const Sequelize = require('sequelize')

const db = new Sequelize('LearningManagement', 'Learner', 'LearnerPass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './LearningManagementDatabase.sqlite'
})

const Course = db.define('courses', {
    courseName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Subject = db.define('subjects', {
    subjectName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Subject.belongsTo(Course)

const Batch = db.define('batches', {
    batchName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Batch.belongsTo(Course)

const Teacher = db.define('teachers', {
    teacherName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Teacher.belongsTo(Subject)

const Student = db.define('students', {
    studentName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const StudentBatch = db.define('studentbatches')
StudentBatch.belongsTo(Student)
StudentBatch.belongsTo(Batch)

const Lecture = db.define('lectures', {
    lectureName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Lecture.belongsTo(Batch)
Lecture.belongsTo(Subject)
Lecture.belongsTo(Teacher)

db.sync()
    .then(() => console.log('database has been created'))
    .catch((err) => console.error('error creating database'))

exports = module.exports = {
    Course, Batch, Student, Lecture, Teacher, Subject, StudentBatch
}