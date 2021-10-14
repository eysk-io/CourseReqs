import { Schema } from "mongoose"
import { Course } from "./course.model"

interface CourseReqsArray extends Array<CourseReqsArray | CourseReqs> { }

export type CourseReqs =
    | Course
    | CourseReqsArray
    | {
        oneOf?: CourseReqs[]
        scoreOf?: number
        metric?: string
        courses?: CourseReqs[]
        advancedCredit?: CourseReqs[]
        recommended?: CourseReqs[]
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
            type: [],
            required: false
        },
        advancedCredit: {
            type: [],
            required: false
        },
        recommended: {
            type: [],
            required: false
        }
    }
)
