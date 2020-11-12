"use strict"
const { InsertOne, UpdateOne, RemoveOne, FindOne, FindAll } = require('../DB/crud')
const jwt = require('jsonwebtoken');
const { ObjectId } = require("mongodb")

function userid(token) {
      const decoded = jwt.verify(token, "30bil")
      return decoded.id
  }

function checkInput(Data) {
      if (!Data.username) {
            const res = { success: false, error: "missing username", status: 400 }
            return res
      }
      if (Data.username.length < 3) {
            const res = { success: false, error: "invalid username", status: 400 }
            return res
      }
      if (!Data.pass || Data.pass.length < 8) {
            const res = { success: false, error: "invalid pass", status: 400 }
            return res
      }
}
async function insertUser(Data) {
      checkInput(Data)
      const oldUser = await findUser({ username: Data.username })
      if (oldUser.status == 403) {
            const res = await InsertOne('users', Data)
            return res
      } else {
            return { success: false, error: "user rgistered before", status: 400 }
      }
}

async function findUser(Data) {
      checkInput(Data)
      const res = await FindOne('users', Data)
      return res
}

async function updateUser(DataToUpdate, ID) {
      checkInput(DataToUpdate)
      const res = await UpdateOne('users', ID, DataToUpdate)
      return res
}

async function removeUser(id) {
      const res = await RemoveOne('users', id)
      return res
}
async function findAll(token) {
      const person = await findperson(token)
      if (person.role == 'admin') {
         const res = await FindAll('users')
         return res
      } else {
         return {success: false, status: 403, error: 'you cant have this data'}
      }
}
async function findperson(token) {
      const id = userid(token)
      const res = await FindOne('users', { _id: ObjectId(id) })
      return res
}
module.exports = { insertUser, findUser, updateUser, removeUser, findAll, findperson }