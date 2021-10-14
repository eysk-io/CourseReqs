import { Schema } from "mongoose"

export type CourseReqs =
    | [string]
    | {
        oneOf?: [CourseReqs]
        scoreOf?: number
        metric?: string
        courses?: [string]
        advancedCredit?: [string]
    }

export const courseReqsSchema = new Schema<CourseReqs>(
    {
        oneOf: {
            type: [],
            required: false
        },
        scoreOf: {
            type: Number,
            required: false
        },
        metric: {
            type: String,
            required: false
        },
        courses: {
            type: [String],
            required: false
        },
        advancedCredit: {
            type: [String],
            required: false
        }
    }
)
