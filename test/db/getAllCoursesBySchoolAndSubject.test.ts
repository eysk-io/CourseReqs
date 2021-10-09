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

    it('get list of courses by school and name', async () => {
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
                _id: cpsc110._id
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
                _id: cpsc111._id
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
                _id: cpsc112._id
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
                _id: cpsc113._id
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
                _id: cpsc114._id
            }
        ]
        const req = {
            query: {
                school: schoolModel.name,
                subject: 'CPSC',
            },
        }
        const res = {
            status(status) {
                expect(status).toBe(200)
                return this
            },
            json(result) {
                expect(result.data).toEqual(expectedCourseList)
            }
        }
        await getAllCoursesBySchoolAndSubject(req, res)
        expect.assertions(2)
    })
    it('ensure parameters are case agnostic', async () => {
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
                _id: cpsc110._id
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
                _id: cpsc111._id
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
                _id: cpsc112._id
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
                _id: cpsc113._id
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
                _id: cpsc114._id
            }
        ]
        const req = {
            query: {
                school: 'UbC',
                subject: 'cPSC',
            },
        }
        const res = {
            status(status) {
                expect(status).toBe(200)
                return this
            },
            json(result) {
                expect(result.data).toEqual(expectedCourseList)
            }
        }
        await getAllCoursesBySchoolAndSubject(req, res)
        expect.assertions(2)
    })
    it('404 if school not found', async () => {
        const req = {
            query: {
                school: 'UBC',
                subject: 'CPSC'
            }
        }
        const res = {
            status(status) {
                expect(status).toBe(404)
                return this
            },
            end() {
                expect(true).toBe(true)
            }
        }
        await getAllCoursesBySchoolAndSubject(req, res)
        expect.assertions(2)
    })
})
