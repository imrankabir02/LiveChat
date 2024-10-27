import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
import router from './routes/index.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({
        message: "Server running at:" + PORT
    })
})

app.use('/api', router)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running at:", PORT)
    })
}).catch(error => {
    console.error("Failed to connect to the database:", error)
})