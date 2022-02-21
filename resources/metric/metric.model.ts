import { Schema, model, models } from "mongoose"

interface Metric {
    name: string,
    date: any
}

const metricSchema = new Schema<Metric>({
    name: String,
    date: {
        type: Date,
        default: Date.now
    }
})

export default models.Metric || model("Metric", metricSchema)
