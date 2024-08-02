process.on('uncaughtException',() => {
    console.log('error in code')
})
import express from 'express'
import { dbConnect } from './database/dbConnection.js'
import {bootstrap}from './src/modules/bootstrap.js'
import { errorHandel } from './src/middleware/errorHandel.js'
import { appError } from './src/modules/utils/appError.js'
import 'dotenv/config'
import cors from 'cors'

const app = express()
const port =process.env.PORT|| 3000
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))
dbConnect
bootstrap(app)
app.use('*',(req,res,next)=>{
    next(new appError(`route not found${req.originalUrl}`,401))
})
app.use(errorHandel)
process.on('unhandledRejection', (err) => {
    console.log('error in connection', err)
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))