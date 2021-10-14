import { NextApiResponse } from "next"
import Course from "../resources/course/course.model"
import School from "../resources/school/school.model"
import { CourseReqs } from "../resources/course/courseReqs.model"
import { CourseReqsApiRequest } from "../types"

export const getAllCoursesBySchool = async (
    req: CourseReqsApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const schoolDoc = await School
            .findOne({
                name: (req.query.school).toUpperCase()
            })
            .lean()
            .exec()
        if (!schoolDoc) {
            return res.status(404).end()
        }
        const doc = await Course
            .find({ school: schoolDoc.name })
            .lean()
            .exec()
        return res.status(200).json({ data: doc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
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
    req: CourseReqsApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const schoolName = (req.query.school).toUpperCase();
        const subject = (req.query.subject).toUpperCase();
        const courseCode = parseInt(req.query.courseCode);
        const schoolDoc = await School
            .findOne({ name: schoolName })
            .lean()
            .exec();
        if (!schoolDoc) {
            return res.status(400).end();
        }
        const schoolId: string = schoolDoc.name
        const doc = await Course
            .findOne({
                school: schoolId,
                subject: subject,
                code: courseCode
            })
            .lean()
            .exec();
        if (!doc) {
            return res.status(400).end();
        }
        let courses = new Map();
        for (let i = 0; i < doc.preRequisites.length; i++) {
            doc.preRequisites[i] = await getCourseHelper(schoolId, doc.preRequisites[i], courses);
        }
        return res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

const getCourseHelper = async (
    schoolId: string,
    courseRequisite,
    courses: Map<any, any>
): Promise<CourseReqs> => {
    if (typeof courseRequisite !== "string") {
        let courseObj: CourseReqs = {};
        if (Object.keys(courseRequisite).includes("oneOf")) {
            let oneOfListLength = courseRequisite.oneOf.length
            courseObj.oneOf = [];
            for (let i = 0; i < oneOfListLength; i++) {
                courseObj.oneOf[i] = await getCourseHelper(schoolId, courseRequisite.oneOf[i], courses);
            }
        }
        if (
            Object.keys(courseRequisite).includes("scoreOf") &&
            Object.keys(courseRequisite).includes("metric") &&
            Object.keys(courseRequisite).includes("courses")
        ) {
            let numCourses = courseRequisite.courses.length;
            courseObj = {
                scoreOf: courseRequisite.scoreOf,
                metric: courseRequisite.metric,
                courses: []
            };
            for (let i = 0; i < numCourses; i++) {
                courseObj.courses[i] = await getCourseHelper(schoolId, courseRequisite.courses[i], courses);
            }
        }
        if (Object.keys(courseRequisite).includes("recommended")) {
            courseObj = {
                recommended: courseRequisite.recommended
            };
            return courseObj;
        }
        if (Object.keys(courseRequisite).includes("advancedCredit")) {
            let numCourses = courseRequisite.advancedCredit.length;
            courseObj = {
                advancedCredit: []
            };
            for (let i = 0; i < numCourses; i++) {
                courseObj.advancedCredit[i] = await getCourseHelper(schoolId, courseRequisite.advancedCredit[i], courses);
            }
        }
        if (Array.isArray(courseRequisite)) {
            courseObj = [];
            for (let i = 0; i < courseRequisite.length; i++) {
                courseObj[i] = await getCourseHelper(schoolId, courseRequisite[i], courses);
            }
        }
        return courseObj;
    }

    if (courses.has(courseRequisite)) {
        return courses.get(courseRequisite);
    }

    const fullName: string[] = courseRequisite.split(/[ ]+/);
    const subject = fullName[0];
    let doc;
    if (+fullName[1]) {
        const courseCode = parseInt(fullName[1]);
        doc = await Course
            .findOne({
                school: schoolId,
                subject: subject,
                code: courseCode
            })
            .lean()
            .exec();
    }
    if (!doc) {
        let courseObj = {
            _id: "",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            subject: "",
            description: "",
            title: courseRequisite,
            code: -1,
            credits: "",
            school: "",
            notes: "",
            __v: 0
        }
        return courseObj;
    }
    for (let i = 0; i < doc.preRequisites.length; i++) {
        doc.preRequisites[i] = await getCourseHelper(schoolId, doc.preRequisites[i], courses);
    }

    courses.set(courseRequisite, doc)

    return doc;
}
