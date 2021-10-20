import { NextApiResponse } from "next"
import Course from "../resources/course/course.model"
import School from "../resources/school/school.model"
import { CourseReqsApiRequest } from "../types"
import { getCourseHelper } from "../utils"

export const getAllCoursesBySchool = async (schoolName: string): Promise<any> => {
    try {
        const schoolDoc = await School
            .findOne({
                name: schoolName.toUpperCase()
            })
            .lean()
            .exec()
        if (!schoolDoc) {
            return null
        }
        const doc = await Course
            .find({ school: schoolDoc.name })
            .lean()
            .exec()
        return JSON.parse(JSON.stringify(doc))
    } catch (e) {
        console.error(e)
        return null
    }
}

export const getAllCoursesBySchoolAndSubject = async (
    req: CourseReqsApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const schoolName = (req.query.school).toUpperCase();
        const subject = (req.query.subject).toUpperCase();
        const schoolDoc = await School
            .findOne({ name: schoolName })
            .lean()
            .exec();
        if (!schoolDoc) {
            return res.status(404).end();
        }
        const schoolId = schoolDoc.name
        const doc = await Course
            .find({
                school: schoolId,
                subject: subject
            })
            .lean()
            .exec();
        if (!doc) {
            return res.status(404).end();
        }
        return res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const getCourse = async (
    school: string,
    subject: string,
    courseCode: string
): Promise<any> => {
    try {
        const schoolName = school.toUpperCase()
        const subjectName = subject.toUpperCase()
        const schoolDoc = await School
            .findOne({ name: schoolName })
            .lean()
            .exec()
        if (!schoolDoc) {
            return null
        }
        const schoolId: string = schoolDoc.name
        let doc = await Course
            .findOne({
                school: schoolId,
                subject: subjectName,
                code: courseCode
            })
            .lean()
            .exec()
        if (!doc) {
            return null
        }
        let courses = new Map()
        for (let i = 0; i < doc.preRequisites.length; i++) {
            doc.preRequisites[i] = await getCourseHelper(schoolId, doc.preRequisites[i], courses)
        }
        return JSON.parse(JSON.stringify(doc))
    } catch (e) {
        console.error(e)
        return null
    }
}
