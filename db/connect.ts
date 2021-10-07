import { Db, MongoClient } from 'mongodb'

global.mongo = global.mongo || {}

export const connectToDB = async () => {
    if (!global.mongo.client) {
        global.mongo.client = await new MongoClient(process.env.DATABASE_URL)

        console.log('Connecting to DB')
        await global.mongo.client.connect()
        console.log('Connected to DB')
    }

    const db: Db = await global.mongo.client.db('course_reqs_db')

    return {
        db,
        dbClient: global.mongo.client
    }
}
