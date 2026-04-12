import mongoose, { Schema, Document } from "mongoose"

export interface IService extends Document {
    name: string
    url: string
    description: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

const ServiceSchema = new Schema<IService>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: true,
            trim: true
        },
        url: {
            type: String,
            required: [true, "Service URL is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Service Description is required"],
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
    },
    {timestamps: true}
)

const Service = mongoose.models.Service || 
    mongoose.model<IService>("Service", ServiceSchema)

export default Service