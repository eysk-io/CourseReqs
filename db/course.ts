import Course from "../resources/course/course.model"
import School from "../resources/school/school.model"

export const getAllCoursesBySchool = async (req, res) => {
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
