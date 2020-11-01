"use strict"
const { InsertOne, UpdateOne, RemoveOne, FindAll, RemoveAll } = require('../DB/crud')
const { GetTask, GetTasks } = require('./Task')

async function insertlist(Data) {
      console.log(Data)
      const res = await InsertOne('lists', Data)
      return res
}

async function GetList(ID = {}) {
      const res = await FindAll('lists', ID)
      if (res.success === false) {
            return res
      } else {
            return res
      }
}
async function update(DataToUpdate, ID) {
      const res = await UpdateOne('lists', ID, DataToUpdate)
      return res
}
async function remove(Data) {
      const res = await RemoveOne('lists', Data)
      return res
}

async function removeAll(ID) {
      const res = await RemoveAll('lists', ID)
      return res
}
module.exports = { insertlist, GetList, update, remove, removeAll }