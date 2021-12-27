import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"
import middleware from "../../../middleware/all"
import onError from "../../../middleware/error"
import { getAllCourseSubjectsBySchool } from "../../../db/course"

const handler = nc<NextApiRequest, NextApiResponse>({
    onError
})

handler.use(middleware)
handler.get(async (req, res) => {
    const { school } = req.query
    if (typeof school === "string") {
        const courseInfo = await getAllCourseSubjectsBySchool(school)
        if (!courseInfo) {
            return res.status(400).end()
        }
        return res.json({ data: courseInfo })
    }
})

export default handler
