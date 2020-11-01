"use strict"
const {InsertOne,UpdateOne,RemoveOne,FindAll,FindOne}=require('../DB/crud')
function checkInput(Data){
      if (!Data.name) {
           const res= { success: false, error: "missing name",status:400 }
            return res
        }
        if (Data.name.length < 3) {
            const res = { success: false, error: "invalid name",status:400 }
            return res
        }
}

async function insert(Data){
      checkInput(Data)
      const res =await InsertOne('boards',Data)
      return res
}
async function GetOne(ID){
      const res=await FindOne('boards',ID)
      return res
}

async function Get(id = {}){
      const res=await FindAll('boards',id)
      return res
}
async function update(DataToUpdate,ID) {
      checkInput(DataToUpdate)
      const res= await UpdateOne('boards',ID,DataToUpdate)
      return res
}
async function remove(Data) {
      const res= await RemoveOne('boards',Data)
      return res
}
module.exports = { insert,Get,update,remove,GetOne}