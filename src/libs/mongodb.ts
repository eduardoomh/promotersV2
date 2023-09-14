import mongoose from 'mongoose'

const MONGO_URL: any = process.env.MONGO_URL

export const connectMongoDB = async () =>{
    try{
        await mongoose.connect(MONGO_URL)
    }catch(error){
        console.log(error);
    }
}