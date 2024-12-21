import { z } from 'zod'

const blogValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .trim()
    .min(1, 'Title cannot be empty'),
  content: z
    .string({
      required_error: 'Content is required',
    })
    .min(1, 'Content cannot be empty'),
  author: z.string().optional(),
  isPublished: z.boolean().optional().default(true),
})

export const blogValidations = {
  blogValidationSchema,
}
