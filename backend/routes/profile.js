var express = require('express');
var profileService = require('../services/profileService.js')
var authService = require('../services/authService.js')

var router = express.Router();


router.put('/', async function(req, res, next) {
    try {
        const userData = req.body;
        const authToken = req.get('authtoken');
        const token = await profileService.decodeToken(authToken)
        const client = await profileService.updateProfile({...userData, id: token.id })
        const updatedToken = await authService.createToken(client.id);
        res.send({message: 'Successfully updated your profile', updatedToken});
    }
    catch(error) {
        if(error.message === 'JsonWebTokenError: invalid signature') {
            return res.status(401).send('Invalid request token, please login and try again!')
        }
        res.status(500).send('Something went wrong, please try again!')
    }
 
});

module.exports = router;
