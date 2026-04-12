import mongoose, { Schema, Document } from "mongoose"


//store list of services to monitor
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




//store every check result for every service
export type StatusValue = "up" | "down" | "degraded"

export interface IStatusHistory extends Document {
    serviceId: mongoose.Types.ObjectId,
    status: StatusValue,
    responseTime: number,
    checkedAt: Date
}

const StatusHistorySchema = new Schema<IStatusHistory> (
    {
        serviceId: {
            type: mongoose.Types.ObjectId,
            ref: "Services",  //link to service model
            required: [true, "serviceId is required"]
        },
        status: {
            type: String,
            enum: ["up", "down", "degraded"],
            required: [true, "Status is required"]
        },
        responseTime: {
            type: Number,
            required: [true, "Response time is required"],
            min: [0, "Response time canned to negative"]
        },
        checkedAt: {
            type: Date,
            required: [true, "checkedAt is required"],
            default: Date.now
        }
    }, {timestamps: false} //checkedAt is single source of time
)

//index is for fast history queries per service
StatusHistorySchema.index({serviceId: 1, checkedAt: -1})

const StatusHistory = 
    mongoose.models.StatusHistory ||
    mongoose.model<IStatusHistory>("StatusHistory", StatusHistorySchema)

export default {
    StatusHistory, 
    Service
}