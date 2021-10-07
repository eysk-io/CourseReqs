import { getAllCoursesBySchool } from "../../db/course"
import School from "../../resources/school/school.model"
import Course from "../../resources/course/course.model"
import * as dbHandler from "../test-db.setup"
import mongoose from "mongoose"

describe('getAllCoursesBySchool', () => {
    beforeAll(async () => {
        await dbHandler.connect()
    })

    afterEach(async () => {
        await dbHandler.clearDatabase()
    })

    afterAll(async () => {
        await dbHandler.closeDatabase()
    })

    it('ensure parameters are case agnostic', async () => {
        const school = await School.create({ name: 'UBC' })
        const course = await Course.create({
            subject: 'CPSC',
            code: 110,
            school: school.name,
            credits: '4',
            title: 'Computation, Programs, and Programming',
            description: 'Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.',
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none'
        })
        const req = {
            query: {
                school: 'uBc'
            }
        }
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data[0]._id.toString()).toBe(course._id.toString());
            }
        }
        await getAllCoursesBySchool(req, res)
        expect.assertions(2)
    })
    it('find all courses by school with no pre- or co-reqs', async () => {
        const school = await School.create({ name: 'UBC' })
        const course = await Course.create({
            subject: 'CPSC',
            code: 110,
            school: school.name,
            credits: '4',
            title: 'Computation, Programs, and Programming',
            description: 'Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.',
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none'
        })
        const req = {
            query: {
                school: school.name
            }
        }
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data[0]._id.toString()).toBe(course._id.toString());
            }
        }
        await getAllCoursesBySchool(req, res)
        expect.assertions(2)
    })
    it('404 if school not found', async () => {
        await Course.create({
            subject: 'CPSC',
            code: 110,
            credits: '4',
            title: 'Computation, Programs, and Programming',
            description: 'Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.',
            school: new mongoose.Types.ObjectId(),
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: 'none'
        })
        const req = {
            query: {
                school: 'UBC'
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
        await getAllCoursesBySchool(req, res)
        expect.assertions(2)
    })
    it('return empty list of courses if no courses available for school', async () => {
        const school = await School.create({ name: 'UBC' })
        const req = {
            query: {
                school: school.name
            }
        }
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual([])
            }
        }
        await getAllCoursesBySchool(req, res)
        expect.assertions(2)
    })
})
