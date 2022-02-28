import NoReqs from "../resources/course/noReqs.model"

export const getNoReqUpperDivCourses = async (): Promise<any> => {
    try {
        const doc = await NoReqs
            .find({})
            .lean()
            .exec()
        if (!doc)
            return null
        return JSON.parse(JSON.stringify(doc))
    }
    catch (e) {
        console.error(e)
    }
}
