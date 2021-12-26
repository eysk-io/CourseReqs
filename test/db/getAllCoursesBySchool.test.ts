import { getAllCoursesBySchool } from "../../db/course"
import School from "../../resources/school/school.model"
import Course from "../../resources/course/course.model"
import * as dbHandler from "../test-db.setup"
import mongoose from "mongoose"

describe("getAllCoursesBySchool", () => {
    beforeAll(async () => {
        await dbHandler.connect()
    })

    afterEach(async () => {
        await dbHandler.clearDatabase()
    })

    afterAll(async () => {
        await dbHandler.closeDatabase()
    })

    it("returns the correct courses no matter the argument's letter case", async () => {
        const school = await School.create({ name: "UBC" })
        const course = await Course.create({
            subject: "CPSC",
            code: 110,
            school: school.name,
            credits: "4",
            title: "Computation, Programs, and Programming",
            description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none"
        })

        const schoolName = "uBc"
        const result = await getAllCoursesBySchool(schoolName)
        expect(result[0]._id.toString()).toBe(course._id.toString())
        expect.assertions(1)
    })

    it("returns all courses by school with no pre- or co-reqs", async () => {
        const school = await School.create({ name: "UBC" })
        const course = await Course.create({
            subject: "CPSC",
            code: 110,
            school: school.name,
            credits: "4",
            title: "Computation, Programs, and Programming",
            description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none"
        })

        const schoolName = school.name
        const result = await getAllCoursesBySchool(schoolName)
        expect(result[0]._id.toString()).toBe(course._id.toString())
        expect.assertions(1)
    })

    it("returns null if school not found", async () => {
        await Course.create({
            subject: "CPSC",
            code: 110,
            credits: "4",
            title: "Computation, Programs, and Programming",
            description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
            school: new mongoose.Types.ObjectId(),
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none"
        })
        const schoolName = "UBC"
        const result = await getAllCoursesBySchool(schoolName)
        expect(result).toEqual(null)
        expect.assertions(1)
    })

    it("returns an empty list of courses if no courses are available for the school", async () => {
        const school = await School.create({ name: "UBC" })
        const schoolName = school.name
        const result = await getAllCoursesBySchool(schoolName)
        expect(result).toEqual([])
        expect.assertions(1)
    })
})
