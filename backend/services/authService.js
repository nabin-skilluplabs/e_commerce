var client = require('@prisma/client');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const prisma = new client.PrismaClient();

async function register(data) {
    delete data.verifyPassword;
    data.password = await bcrypt.hash(data.password, 10);
    try {
        return await prisma.client.create({
            data
        });
    }  
    catch (error) {
        throw new Error(error)
    }
    
}

async function getOne(condition) {
   return await prisma.client.findFirst({where: condition})
}

async function signIn(data) {
    const existingClient = await getOne({email: data.email})
    return await bcrypt.compare(data.password, existingClient.password)
}

async function createToken(id) {
    const existingClient = await prisma.client.findFirst({where: {id}})
    const token = await jwt.sign({
        id: existingClient.id,
        firstName: existingClient.firstName,
        lastName: existingClient.lastName,
        email: existingClient.email,
        mobile: existingClient.mobile
      }, process.env.TOKEN_SECRECT_KEY)

      return token
}



module.exports = { register, getOne, signIn, createToken }