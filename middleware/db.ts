import { connectToDB } from "../db/connect"

export default async function database(req, res, next) {
    await connectToDB()
    next()
}
