import { Schema, model, models } from "mongoose"

interface NoReqs {
    subject: string,
    courses: any[],
    school: string
}

const noReqsSchema = new Schema<NoReqs>({
    subject: String,
    courses: [],
    school: String
})

export default models.NoReqs || model("NoReqs", noReqsSchema, "upper_div_no_reqs")
