var client = require('@prisma/client');
var jwt = require('jsonwebtoken');

const prisma = new client.PrismaClient();

async function decodeToken(authToken) {
    try {
        const token = await jwt.verify(authToken, process.env.TOKEN_SECRECT_KEY)
        return token
    }
    catch(error){
        throw new Error(error)
    }
    
}

async function updateProfile(data) {
    const { id, firstName, lastName, mobile, email} = data
    return await prisma.client.update({
        where: { id }, 
        data: {
            firstName,
            lastName,
            email,
            mobile
        }
    })
}
module.exports = { decodeToken, updateProfile }