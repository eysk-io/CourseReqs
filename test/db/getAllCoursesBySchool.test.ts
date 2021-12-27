import { getAllCourseSubjectsBySchool } from "../../db/course"
import School from "../../resources/school/school.model"
import * as dbHandler from "../test-db.setup"

describe("getAllCourseSubjectsBySchool", () => {
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
        const school = await School.create({
            name: "UBC",
            subjects: [
                "http://www.calendar.ubc.ca/vancouver/courses.cfm?page=name&code=ADHE",
                "http://www.calendar.ubc.ca/vancouver/courses.cfm?page=name&code=AFST",
                "http://www.calendar.ubc.ca/vancouver/courses.cfm?page=name&code=AGEC"
            ]
        })
        const schoolName = "uBc"
        const result = await getAllCourseSubjectsBySchool(schoolName)
        expect(result.name).toEqual("UBC")
        expect(result.subjects).toEqual([
            "http://www.calendar.ubc.ca/vancouver/courses.cfm?page=name&code=ADHE",
            "http://www.calendar.ubc.ca/vancouver/courses.cfm?page=name&code=AFST",
            "http://www.calendar.ubc.ca/vancouver/courses.cfm?page=name&code=AGEC"
        ])
        expect.assertions(2)
    })

    it("returns null if school not found", async () => {
        const schoolName = "UBC"
        const result = await getAllCourseSubjectsBySchool(schoolName)
        expect(result).toEqual(null)
        expect.assertions(1)
    })

    it("returns an empty list of courses if no courses are available for the school", async () => {
        await School.create({ name: "UBC", subjects: [] })
        const schoolName = "UBC"
        const result = await getAllCourseSubjectsBySchool(schoolName)
        expect(result.subjects).toEqual([])
        expect.assertions(1)
    })
})
