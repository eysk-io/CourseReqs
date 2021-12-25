import nc from "next-connect"
import { NextApiRequest, NextApiResponse } from "next"
import onError from "../../middleware/error"

const handler = nc<NextApiRequest, NextApiResponse>({
  onError
})

handler.get(async (req, res): Promise<void> => {
  const docsUrl = "https://course-reqs.notion.site/course-reqs/Course-Reqs-560a1df7302a4a358fb14b7196b1d52d"

  res.setHeader("Content-type", "text/html")
  res.send(`Welcome to the Course Reqs API! For more information, check out the detailed <a href="${docsUrl}">documentation</a>.`)
})

export default handler
