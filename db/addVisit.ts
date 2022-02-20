import Metric from "../resources/metric/metric.model"

export const addVisit = async (): Promise<any> => {
    try {
        const doc = await Metric
            .findOne({ name: "visits" })
            .lean()
            .exec()

        let newVal = doc.value + 1
        await Metric
            .findOneAndUpdate(
                { name: "visits" },
                { value: newVal }
            )
            .lean()
            .exec()
    }
    catch (e) {
        console.error(e)
    }
}
