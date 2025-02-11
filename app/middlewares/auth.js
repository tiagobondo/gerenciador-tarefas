import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const autheticated = (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    res
      .status(404)
      .render('index', { title: 'Login', message: '' })
  } else {
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded
    next()
  }
}