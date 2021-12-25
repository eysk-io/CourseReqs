import nc from "next-connect"
import db from "./db"

const middleware = nc()

middleware.use(db)
export default middleware
