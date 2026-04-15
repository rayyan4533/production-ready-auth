import 'dotenv/config'
import app from "./src/app.js"


const PORT :any =process.env.PORT;

const start= async()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at ${PORT}`)
    })
}


start().catch((error: Error)=>{
    console.log("nahi chalraha bro")
    process.exit(1)
})