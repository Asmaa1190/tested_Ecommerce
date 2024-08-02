process.on('uncaughtException', () => {
    console.log('error in code')
})
import express from 'express'
import { dbConnect } from './database/dbConnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { errorHandel } from './src/middleware/errorHandel.js'
import { appError } from './src/modules/utils/appError.js'
import 'dotenv/config'
import cors from 'cors'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Pib4zDHR07fDlC8x8j2Z1ixr8JszDEI3Nq3XuYnmPDBgS4mdbDkN7NBc5sV9VYC7vfRwIHcBaT5Xayrd0M301IR002R32KMF2');
import { catchError } from './src/middleware/catchError.js'


const app = express()
const port = process.env.PORT || 3000
app.post('/api/webhook', express.raw({ type: 'application/json' }), catchError(
    (req, res) => {
        const sig = req.headers['stripe-signature'].toString();
        let event;
        event = stripe.webhooks.constructEvent(req.body, sig, "whsec_TSKmMOZLXHccdRPBHRFNKAzBgMhZYepY")
        // Handle the event
        let checkOut
        if (event.type == 'checkout.session.completed') {
            checkOut = event.data.object;
        }
        res.json({ message: 'success', checkOut });
    })
)


app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
dbConnect
bootstrap(app)
app.use('*', (req, res, next) => {
    next(new appError(`route not found${req.originalUrl}`, 401))
})
app.use(errorHandel)
process.on('unhandledRejection', (err) => {
    console.log('error in connection', err)
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))