const route=require('express').Router()

route.use('/courses',require('./courses'))
route.use('/batches',require('./batches'))
route.use('/lectures',require('./lectures'))
route.use('/students',require('./students'))
route.use('/subjects',require('./subjects'))
route.use('/teachers',require('./teachers'))
route.use('/studentbatches',require('./studentbatches'))

exports = module.exports = route
