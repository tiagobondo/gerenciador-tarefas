import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { connection } from '../app/config/dbConnection.js'
import { modelUser } from '../app/models/users.js'

const router = express.Router();
dotenv.config()
connection()

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Login', message: '' });
});

router.get('/creat', (req, res) => {
  res.render('account', { title: 'Criar conta', message: '' })
})

router.post('/account', async (req, res) => {
  const { userName, password, passwordRec } = req.body
  const saltRounds = 10

  const passwordCrypt = bcrypt.hashSync(password, saltRounds)
  const passwordRecCrypt = bcrypt.hashSync(passwordRec, saltRounds)

  try {

    if (password !== passwordRec) {
      return res
      .status(401)
      .render('account', { title: 'Criar conta', message: 'A reconfirmação da senha deve ser igual a senha!' })
    } else {
      const dataDb = await modelUser.findOne({ userName })

      if (dataDb === null) {
        const reponse = await modelUser({
          userName,
          password: passwordCrypt,
          passwordRec: passwordRecCrypt
        })

        const data = reponse.save()
        return res
          .status(200)
          .redirect('/')

      } else {
        return res
          .status(401)
          .render('account', { title: 'Criar conta', message: 'Usuário já existente!' })
      }
    }

  } catch (error) {
    console.log(error)
  }

})

router.post('/login', async (req, res) => {
  const { userName, password } = req.body

  if (!userName) {
    return res
      .status(401)
      .render('index', { title: 'Login', message: 'Usuário obrigatório!' })
  }
  if (!password) {
    return res
      .status(401)
      .render('index', { title: 'Login', message: 'Senha obrigatório!' })
  }

  else {
    const dataDb = await modelUser.findOne({ userName })

    if (dataDb == null) {
      return res
        .status(404)
        .render('index', { title: 'Login', message: 'Usuário não encontrado!' })
    } else {
      const verifyPassword = bcrypt.compareSync(password, dataDb.password)
      if (verifyPassword === true) {
        const token = jwt.sign({ id: dataDb.id }, process.env.SECRET)

        res
          .cookie('token', token, {
            httpOnly: true
          })
          .redirect('/users')
      } else {
        return res
          .status(404)
          .render('index', { title: 'Login', message: 'Palavra pass incorreta!' })
      }
    }
  }

})

export default router