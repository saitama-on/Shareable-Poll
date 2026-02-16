import mongoose from "mongoose"

const connectDB = async () =>{
    console.log("URI Check:", process.env.MONGODB_URI); // If this says 'undefined', that's the fix

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/poll`);
        console.log(`\n MongoDB connected || connection host : ${connectionInstance.connection.host}`);
    }


    catch(error){

        console.log(error);
        process.exit(1);
    }
}

export default connectDB;