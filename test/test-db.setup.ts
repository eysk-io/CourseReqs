import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"


/**
 * Connect to mock memory db.
 */
export const connect = async () => {
    const mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()

    await mongoose.connect(uri)
}

/**
 * Close db connection
 */
export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
}

/**
 * Delete db collections
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections

    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany({})
    }
}
