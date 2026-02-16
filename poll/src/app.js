import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"
import pollRouter from "./routes/poll.router.js"
import {Server} from "socket.io"
import {createServer} from "http"
import connectDB from "./db/db.js";

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer , {
    cors:{
        origin:"*",
        methods:["GET" , "POST" , "PUT" , "DELETE"],
        credentials:true
    }
})

dotenv.config();

await connectDB();
//used for cross origin policy of browsers
app.use(cors({
    origin:"*",
    methods:["GET" , "POST" , "PUT" , "DELETE"],
    credentials:true
}))
//origin for allowed origin 
//credentials are used for allowing to send credentials via http
app.use(express.json()) //can have many options like {limit :"16kb"}

//using url encoder 
//extended is used to allow sending objects of objects 
// option like {limit : "16kb"} can also be used 
app.use(express.urlencoded({
    extended  :true
}))
//creating a static file folder to store public assets
app.use(express.static("public"))
//initializing cookie-parser
app.use(cookieParser())



io.on("connection" , (socket)=>{
    console.log("A user connected with id : " + socket.id)
})

//routing

app.use("/api/v1/users" , userRouter)
app.use("/api/v1/polls" , pollRouter)


httpServer.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
});
// export default app;