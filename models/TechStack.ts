import mongoose, { Schema, Model } from "mongoose";

import {TechStack} from "@/types/index"

const TechStackSchema = new Schema<TechStack>(
    {
        name: {
            type: String,
            required: [true, "Technology name is required"],
            unique: true,
            trim: true
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: ["Frontend", "Backend", "Database", "Devops", "Others"],
            trim: true
        },
        // icon: {
        //     type:String,
        //     required: [true, "Icon is required"],
        //     trim: true
        // },
        proficiency: {
            type: Number,
            required: [true, "Proficiency is required"],
            min: [1, "Proficiency must be at least 1"],
            max: [5, "proficiency must be at most 5"]
        },
        //list of project Ids this tech is used in
        projectIds: {
            type: [String],
            default: []
        }
    },
    {timestamps: true}
)

const TechStackModel: Model<TechStack> = 
    mongoose.models.TechStack ||
    mongoose.model<TechStack>("TechStack", TechStackSchema)

export default TechStackModel