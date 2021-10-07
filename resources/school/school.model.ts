import { Schema, model, models } from 'mongoose'

interface School {
    name: string
}

const schoolSchema = new Schema<School>({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10,
        unique: true
    }
})

export default models.School || model('School', schoolSchema)
