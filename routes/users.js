import express from 'express'

import { modelWorks } from '../app/models/works.js'
import { modelUser } from '../app/models/users.js'

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const countUsers = await modelUser.find().countDocuments()
    const countWorks = await modelWorks.find().countDocuments()
    res
      .render('dashboard', { title: 'Dashboard', countUsers: countUsers, countWorks: countWorks })
  } catch (error) {
    console.log(error)
  }
});

router.post('/logout', (req, res) => {
  res
    .clearCookie('token')
    .redirect('/')
})

router.get('/registerwork', (req, res) => {
  return res
    .render('registerwork', { title: 'Registar tarefas', message: '' })
})

router.post('/registerwork', async (req, res) => {
  const { workType, dateRemeber, text } = req.body

  try {
    const data = await modelWorks({
      workType,
      dateRemeber,
      text
    })
    const response = data.save()

    if (!response) {
      res
        .redirect('/users/registerwork')
    } else {
      res
        .redirect('/users/registerwork')
    }
  } catch (error) {
    console.log(error)
  }

})

router.get('/visworks', async (req, res) => {
  try {
    const data = await modelWorks.find()
    res
      .render('visworks', { title: 'Tarefas', message: '', data: data })
  } catch (error) {
    console.log(error)
  }
})

router.get('/visworks/delete/:id', async (req, res) => {
  const { id } = req.params

  try {
    await modelWorks.deleteOne({
      _id: id
    })
    res
      .redirect('/users/visworks')
  } catch (error) {
    console.log(error)
  }
})

router.post('/visworks/edit/:id', async (req, res) => {
  const { id } = req.params
  const { text } = req.body

  try {
    if (text) {
      const response = await modelWorks.updateOne(
        { _id: id },
        {
          $set: { text: text }
        }
      )
      return res
        .status(200)
        .redirect('/users/visworks')
    } else {
      return res
        .status(200)
        .redirect('/users/visworks')
    }
  } catch (error) {
    console.log(error)
  }
})

export default router