import { RequestHandler } from 'express'
import AppError from '../../errors/AppError'
import { AuthServices } from './auth.services'

//Login User
const loginUser: RequestHandler = async (req, res) => {
  try {
    const result = await AuthServices.loginUser(req.body)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: {
        token: result?.accessToken,
      },
    })
  } catch (error) {
    // next(error);
    if (error instanceof Error) {
      throw new AppError(401, error.message)
    } else {
      throw new AppError(401, String(error))
    }
  }
}

export const AuthControllers = {
  loginUser,
}
