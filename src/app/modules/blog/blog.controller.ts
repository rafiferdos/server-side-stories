/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express'

import AppError from '../../errors/AppError'
import { BlogServices } from './blog.services'

///Create Blog
const createBlog: RequestHandler = async (req, res, next) => {
  try {
    const loggedUser = req?.user

    //if Logged user will be admin can not create blog
    if (loggedUser?.role === 'admin') {
      throw new AppError(403, 'admin is unable to create blog')
    }
    const blogData = req?.body
    blogData.author = loggedUser?.id

    const result = await BlogServices.createBlogIntoDB(blogData)
    const newResult = result.toObject()

    const { iat: _iat, exp: _exp, ...cleanedAuthor } = loggedUser

    const newResultWithUser: any = {
      ...newResult,
      author: cleanedAuthor,
    }

    const { isPublished, createdAt, updatedAt, __v, ...finalResult } =
      newResultWithUser

    console.log('Final Result: ', finalResult)

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      statusCode: 201,
      data: finalResult,
    })
  } catch (error) {
    next(error)
  }
}

//Get All Blog
const getAllBlog: RequestHandler = async (req, res, next) => {
  try {
    const result = await BlogServices.getAllBlogsFromDB(req.query)

    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      statusCode: 200,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

//Get Single Blog
const getSingleBlog: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await BlogServices.getSingleBlogFromDB(id)
    res.status(201).json({
      success: true,
      message: 'Blog retrive successfully',
      statusCode: 201,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

//Delete Blog
const deleteBlog: RequestHandler = async (req, res, next) => {
  try {
    const { id: loggedUserId } = req.user
    const id = req.params.id
    const result = await BlogServices.deleteBlogFromDB(id, loggedUserId)
    res.status(201).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    })
  } catch (error) {
    next(error)
  }
}

//Update Blog
const updateBlog: RequestHandler = async (req, res, next) => {
  try {
    const loggedUser = req?.user
    const loggedUserId = loggedUser?.id
    if (loggedUser?.role === 'admin') {
      throw new AppError(500, 'admin can not update blog')
    }

    const id = req.params.id
    const result = await BlogServices.updateBlogIntoDB(
      id,
      req.body,
      loggedUserId,
    )

    //copy of result in newResult
    let newResult
    if (result) {
      newResult = result.toObject()
    }

    const { iat: _iat, exp: _exp, ...cleanedAuthor } = loggedUser

    const newResultWithUser: any = {
      ...newResult,
      author: cleanedAuthor, // Add loggedUser inside the author.details field
    }

    //Remove isPublished, createdAt, updatedAt, __v, from newResultWithUser as finalResult
    const { isPublished, createdAt, updatedAt, __v, iat, exp, ...finalResult } =
      newResultWithUser
    console.log('Final Result: ', finalResult)

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      statusCode: 200,
      data: finalResult,
    })
  } catch (error) {
    next(error)
  }
}

export const blogControllers = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
}
