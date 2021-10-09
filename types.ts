import { NextApiRequest } from 'next'

export interface CourseReqsApiRequest extends NextApiRequest {
    query: {
        school?: string
        subject?: string
    }
}
