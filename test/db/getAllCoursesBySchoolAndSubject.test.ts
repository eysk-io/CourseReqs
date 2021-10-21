import { getAllCoursesBySchoolAndSubject } from "../../db/course"
import School from "../../resources/school/school.model"
import Course from "../../resources/course/course.model"
import * as dbHandler from "../test-db.setup"

describe('getAllCoursesBySchoolAndSubject', () => {
    beforeAll(async () => {
        await dbHandler.connect()
    })

    afterEach(async () => {
        await dbHandler.clearDatabase()
    })

    afterAll(async () => {
        await dbHandler.closeDatabase()
    })

    it("returns a list of courses by school and name", async () => {
        const schoolModel = await School.create({ name: 'UBC' })
        const cpsc110 = await Course.create({
            subject: 'CPSC',
            code: 110,
            title: 'Computation, Programs, and Programming',
            description: 'Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.',
            credits: '4',
            school: schoolModel.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none',
        })
        const cpsc111 = await Course.create({
            subject: 'CPSC',
            code: 111,
            credits: '4',
            title: 'Any title',
            description: 'Any description',
            school: schoolModel.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none',
        })
        const cpsc112 = await Course.create({
            subject: 'CPSC',
            code: 112,
            credits: '4',
            title: 'Any title',
            description: 'Any description',
            school: schoolModel.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none',
        })
        const cpsc113 = await Course.create({
            subject: 'CPSC',
            code: 113,
            credits: '4',
            title: 'Any title',
            description: 'Any description',
            school: schoolModel.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none',
        })
        const cpsc114 = await Course.create({
            subject: 'CPSC',
            code: 114,
            credits: '4',
            title: 'Any title',
            description: 'Any description',
            school: schoolModel.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none',
        })
        const expectedCourseList = [
            {
                subject: 'CPSC',
                code: 110,
                title: 'Computation, Programs, and Programming',
                description: 'Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.',
                credits: '4',
                school: schoolModel.name,
                preRequisites: [],
                coRequisites: [],
                equivalencies: [],
                notes: 'none',
                __v: 0,
                _id: cpsc110._id.toString()
            },
            {
                subject: 'CPSC',
                code: 111,
                credits: '4',
                title: 'Any title',
                description: 'Any description',
                school: schoolModel.name,
                preRequisites: [],
                coRequisites: [],
                equivalencies: [],
                notes: 'none',
                __v: 0,
                _id: cpsc111._id.toString()
            },
            {
                subject: 'CPSC',
                code: 112,
                credits: '4',
                title: 'Any title',
                description: 'Any description',
                school: schoolModel.name,
                preRequisites: [],
                coRequisites: [],
                equivalencies: [],
                notes: 'none',
                __v: 0,
                _id: cpsc112._id.toString()
            },
            {
                subject: 'CPSC',
                code: 113,
                credits: '4',
                title: 'Any title',
                description: 'Any description',
                school: schoolModel.name,
                preRequisites: [],
                coRequisites: [],
                equivalencies: [],
                notes: 'none',
                __v: 0,
                _id: cpsc113._id.toString()
            },
            {
                subject: 'CPSC',
                code: 114,
                credits: '4',
                title: 'Any title',
                description: 'Any description',
                school: schoolModel.name,
                preRequisites: [],
                coRequisites: [],
                equivalencies: [],
                notes: 'none',
                __v: 0,
                _id: cpsc114._id.toString()
            }
        ]

        const schoolName = schoolModel.name
        const subject = 'CPSC'
        const result = await getAllCoursesBySchoolAndSubject(schoolName, subject)
        expect(result).toEqual(expectedCourseList)
        expect.assertions(1)
    })

    it("returns the correct courses no matter the argument's letter case", async () => {
        const schoolModel = await School.create({ name: 'UBC' })
        const cpsc110 = await Course.create({
            subject: 'CPSC',
            code: 110,
            title: 'Computation, Programs, and Programming',
            description: 'Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.',
            credits: '4',
            school: schoolModel.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none',
        })
        const cpsc111 = await Course.create({
            subject: 'CPSC',
            code: 111,
            credits: '4',
            title: 'Any title',
            description: 'Any description',
            school: schoolModel.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none',
        })
        const cpsc112 = await Course.create({
            subject: 'CPSC',
            code: 112,
            credits: '4',
            title: 'Any title',
            description: 'Any description',
            school: schoolModel.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none',
        })
        const cpsc113 = await Course.create({
            subject: 'CPSC',
            code: 113,
            credits: '4',
            title: 'Any title',
            description: 'Any description',
            school: schoolModel.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none',
        })
        const cpsc114 = await Course.create({
            subject: 'CPSC',
            code: 114,
            credits: '4',
            title: 'Any title',
            description: 'Any description',
            school: schoolModel.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none',
        })
        const expectedCourseList = [
            {
                subject: 'CPSC',
                code: 110,
                title: 'Computation, Programs, and Programming',
                description: 'Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.',
                credits: '4',
                school: schoolModel.name,
                preRequisites: [],
                coRequisites: [],
                equivalencies: [],
                notes: 'none',
                __v: 0,
                _id: cpsc110._id.toString()
            },
            {
                subject: 'CPSC',
                code: 111,
                credits: '4',
                title: 'Any title',
                description: 'Any description',
                school: schoolModel.name,
                preRequisites: [],
                coRequisites: [],
                equivalencies: [],
                notes: 'none',
                __v: 0,
                _id: cpsc111._id.toString()
            },
            {
                subject: 'CPSC',
                code: 112,
                credits: '4',
                title: 'Any title',
                description: 'Any description',
                school: schoolModel.name,
                preRequisites: [],
                coRequisites: [],
                equivalencies: [],
                notes: 'none',
                __v: 0,
                _id: cpsc112._id.toString()
            },
            {
                subject: 'CPSC',
                code: 113,
                credits: '4',
                title: 'Any title',
                description: 'Any description',
                school: schoolModel.name,
                preRequisites: [],
                coRequisites: [],
                equivalencies: [],
                notes: 'none',
                __v: 0,
                _id: cpsc113._id.toString()
            },
            {
                subject: 'CPSC',
                code: 114,
                credits: '4',
                title: 'Any title',
                description: 'Any description',
                school: schoolModel.name,
                preRequisites: [],
                coRequisites: [],
                equivalencies: [],
                notes: 'none',
                __v: 0,
                _id: cpsc114._id.toString()
            }
        ]

        const schoolName = 'UbC'
        const subject = 'cPSC'
        const result = await getAllCoursesBySchoolAndSubject(schoolName, subject)
        expect(result).toEqual(expectedCourseList)
        expect.assertions(1)
    })

    it("returns null if school not found", async () => {
        const schoolName = 'UBC'
        const subject = 'CPSC'
        const result = await getAllCoursesBySchoolAndSubject(schoolName, subject)
        expect(result).toEqual(null)
        expect.assertions(1)
    })

    it("returns empty list of courses if no courses are available for the school", async () => {
        await School.create({ name: 'UBC' })
        const schoolName = 'UBC'
        const subject = 'CPSC'
        const result = await getAllCoursesBySchoolAndSubject(schoolName, subject)
        expect(result).toEqual([])
        expect.assertions(1)
    })
})
