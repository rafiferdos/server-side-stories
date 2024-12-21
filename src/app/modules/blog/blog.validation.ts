import { z } from 'zod'

export const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    content: z.string().nonempty('Content is required'),
    isPublished: z.boolean().optional(),
  }),
})

export const updateBlogZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    isPublished: z.boolean().optional(),
  }),
})
