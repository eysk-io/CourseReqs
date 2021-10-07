import { Schema, model } from "mongoose"

interface Course {
    subject: string
    code: number
    title: string
    description: string
    school: string
    credits: string
    preRequisites: [Course]
    coRequisites: [any]
    equivalencies: [any]
    notes: string
}

const courseSchema = new Schema<Course>(
    {
        subject: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5
        },
        code: {
            type: Number,
            required: true,
            trim: true,
            maxlength: 5
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        school: {
            type: String,
            ref: "school",
            required: true
        },
        credits: {
            type: String,
            required: true,
            trim: true
        },
        // for both pre- and co-requisites, can have the following structures:
        // [String] -> i.e. ["CPSC 310", "CPSC 221", ...]
        // [{ oneOf: [String] }] -> i.e. [ {oneOf: ["CPSC 310", "CPSC 221"] }, ...]
        // [{ scoreOf: Number, metric: String, courses: [String] }] -> i.e. { scoreOf: 64, metric: "percentage", courses: [ "PHYS 157" ] }
        // { advancedCredit: [String] } -> i.e. { advancedCredit: ["MATH 103"] }
        // and any nested combination of these
        preRequisites: {
            type: [],
            required: true
        },
        coRequisites: {
            type: [],
            required: true
        },
        equivalencies: {
            type: [],
            required: true
        },
        notes: {
            type: String,
            required: true
        }
    }
)

courseSchema.index(
    { school: 1, name: 1, code: 1 },
    { unique: true }
)

export const Course = model('course', courseSchema)
