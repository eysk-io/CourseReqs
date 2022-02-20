import { Schema, model, models } from "mongoose"

interface Metric {
    name: string,
    value: number
}

const metricSchema = new Schema<Metric>({
    name: String,
    value: Number
})

export default models.Metric || model("Metric", metricSchema)
