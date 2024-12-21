import { Schema, model } from 'mongoose'
import { IBlog } from './blog.interface'

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.String, ref: 'User', required: true },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.__v
        delete ret.isPublished
        delete ret.isDeleted
        delete ret.createdAt
        delete ret.updatedAt
        delete ret.__v
      },
    },
  },
)

export const blogModel = model<IBlog>('blogs', blogSchema)
