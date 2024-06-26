var express = require('express');

var authService = require('../services/authService');
var emailService = require('../services/emailService');
var router = express.Router();


router.post('/register', async function(req, res, next) {
  try {
    const userData = req.body;
    const existingUserWithEmail = await authService.getOne({email: userData.email});
    const messages = []
    if(existingUserWithEmail) {
      messages.push(`Email ${userData.email} is already registered!`)
    }
    const existingUserWithMobile = await authService.getOne({mobile: userData.mobile})
    if(existingUserWithMobile) {
      messages.push(`Mobile ${userData.mobile} is already registered!`)
    }
    if(messages.length > 0) {
      return  res.status(400).json({error: {messages: messages }})
    }
    const newClient = await authService.register(userData);
    await emailService.sendRegisterEmail(newClient);
    const token = await authService.createToken(newClient.id);

    res.json({
      token,
      success: {message: 'Successfully registered!'}});
  }
  catch(error) {
    console.log(error)
    res.status(500).json({error: {messages: ['Something went wrong. Please try after a while!']}})
  }
});


router.post('/signin', async function(req, res, next) {
  try {
    const userData = req.body;
    const existingUserWithEmail = await authService.getOne({email: userData.email});
    if(!existingUserWithEmail) {
      return res.status(404).json({error: {messages: [`Email ${userData.email} is not registered!`]}})
    }

    const passwordMatches = await authService.signIn(userData)
    if(!passwordMatches) {
      return res.status(401).json({error: {messages: [`Email and password does not match. Try again!`]}})
    }

    const token = await authService.createToken(existingUserWithEmail.id)

    res.json({
      token,
      success: {message: 'Successfully signed in!'}});

  }
  catch(error) {
    console.log(error)
    res.status(500).json({error: {messages: ['Something went wrong. Please try after a while!']}})
  }
})

module.exports = router;
