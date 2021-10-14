import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"
import middleware from "../../../../../middleware/all"
import onError from "../../../../../middleware/error"
import { getCourse } from "../../../../../db/course";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError
})

handler.use(middleware)
handler.get(async (req, res) => await getCourse(req, res))

export default handler
