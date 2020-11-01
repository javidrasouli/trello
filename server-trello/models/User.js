"use strict"
const { InsertOne, UpdateOne, RemoveOne, FindOne, FindAll } = require('../DB/crud')
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
async function findAll() {
      const res = await FindAll('users')
      return res
}
async function findperson(id) {
      const res = await FindOne('users', id)
      return res
}
module.exports = { insertUser, findUser, updateUser, removeUser, findAll, findperson }