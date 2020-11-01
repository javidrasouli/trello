'use strict'
const { getInstance } = require("./db")
async function InsertOne(collection, DataToInsert) {
  try {
    const db = await getInstance()
    const coll = db.collection(collection)
    const ok = await coll.insertOne(DataToInsert)
    if (!ok) {
      const res = { success: false, status: 500, error: '' }
      return res
    }
    console.log("INFO:", "insert ok")
    const res = { success: true, insert: ok }
    return res
  } catch (err) {
    console.log(err)
    const res = { success: false, status: 500, error: err }
    return res
  }
}

async function FindOne(collection, DataToFind) {
  try {
    const db = await getInstance()
    const coll = db.collection(collection)
    const find = await coll.findOne(DataToFind)
    if (!find) {
      const res = { success: false, status: 403, error: "Can't Find Data" }
      return res
    }
    const res = find
    return res
  } catch (err) {
    console.log(err)
    const res = { success: false, status: 500, error: err }
    return res
  }
}

async function UpdateOne(collection, ID, DataTOUpdate) {
  try {
    const db = await getInstance()
    const coll = db.collection(collection)
    await coll.updateOne(ID, { $set: DataTOUpdate })
    console.log("1 document updated")
    const res = { success: true }
    return res

  } catch (err) {
    console.log(err)
    const res = { success: false, status: 500, error: err }
    return res
  }
}

async function RemoveOne(collection, ID) {
  try {
    const db = await getInstance()
    const coll = db.collection(collection)
    await coll.deleteOne(ID)
    const res = { success: true }
    return res
  } catch (err) {
    console.log(err)
    const res = { success: false, status: 500, error: err }
    return res
  }
}

async function FindAll(collection, DataToFind = {}) {

  try {
    const db = await getInstance()
    const res = await db.collection(collection).find(DataToFind).toArray()
    return res

  } catch (err) {
    console.log(err)
    const res = { success: false, status: 500, error: err }
    return res
  }
}

async function RemoveAll(collection, DataToRemove) {
  try {
    const db = await getInstance()
    const coll = db.collection(collection)
    await coll.deleteMany(DataToRemove)
    const res = { success: true }
    return res
  } catch (err) {
    console.log(err)
    const res = { success: false, status: 500, error: err }
    return res
  }
}

module.exports = { InsertOne, FindOne, UpdateOne, RemoveOne, FindAll, RemoveAll }