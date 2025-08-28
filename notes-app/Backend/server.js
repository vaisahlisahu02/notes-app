const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const notesRoutes = require('./routes/notes.routes')
const cors = require("cors")

dotenv.config()
connectDB()


const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Notes API Running")
})

app.use("/api/notes",notesRoutes)



const PORT = process.env.PORT || 3000

app.listen(PORT,()=>console.log(`server running on port ${PORT}`))