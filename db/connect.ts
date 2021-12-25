import mongoose from "mongoose"

global.mongo = global.mongo || {}

export const connectToDB = async (): Promise<void> => {
    if (global.mongo.isConnected) {
        console.log("Connected to DB")
        return
    }

    console.log("Connecting to DB")
    const db = await mongoose.connect(process.env.DATABASE_URL)
    console.log("Connected to DB")

    global.mongo.isConnected = db.connections[0].readyState
}
