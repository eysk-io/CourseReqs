import Metric from "../resources/metric/metric.model"

export const addVisit = async (): Promise<any> => {
    try {
        await Metric.create({ name: "visit" })
    }
    catch (e) {
        console.error(e)
    }
}
