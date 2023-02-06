const router = require('express').Router()
const CelebrityModel = require('../models/Celebrity.model')

//render the new-celebrity form
router.get('/create',  (req, res) => {
    res.render("celebrities/new-celebrity")
  })


//creates post route for the form
router.post('/create', async(req, res) => {
  try {
     const body = req.body;
     await CelebrityModel.create({
      ...body
     })
     res.redirect('/celebrities/all-celebrities');
  } catch(error) {
    console.log('Something went wrong with creating a celebrity' , error)
    res.render('celebrities/new-celebrity')
  }
})


//render page to show all celebrities
router.get('/all-celebrities', async(req, res) => {
  try{
    const AllCelebrities = await CelebrityModel.find()
    res.render('celebrities/all-celebrities', {AllCelebrities})
  } catch(error) {
    console.log('there was an error showing all the celebirties', error)
  }
} )

module.exports = router