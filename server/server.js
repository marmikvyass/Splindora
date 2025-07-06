import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import router from './routes/route.js'
import cookieParser from 'cookie-parser'
import tripRouter from './routes/trip.js'
import expenseRouter from './routes/expense.js'


const app = express()
const port = 3000
connectDB()

const frontendServer = ['http://localhost:5173']

app.get('/', (req, res) => {
    res.send('hello we are connected with backend')
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: frontendServer, credentials: true
}))

app.use('/api/auth', router)
app.use('/api/trip', tripRouter)
app.use('/api/expense', expenseRouter)


app.listen(port, () => console.log(`server started on port : http://localhost:${port}`))