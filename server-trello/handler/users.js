'use strict'
const { insertUser, findUser, findAll, findperson, updateUser, removeUser } = require('../models/user')
const { generateToken } = require('../authMiddleware')

const login = async (req, res) => {
    const Data = req.body
    const ress = await findUser(Data)
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        const ok = await generateToken(res, ress._id)
        if (ok.status == true) {
            res.json({ user: ress, accessToken: ok.accessToken, refreshToken: ok.refreshtoken })
        } else {
            res.json({ success: false })
            console.log(ok)
        }
    }
}
const register = async (req, res) => {
    const Data = { username: req.body.username, email: req.body.email, pass: req.body.pass, role: 'user' }
    const ress = await insertUser(Data)
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        res.json(ress)
    }
}
const findAlluser = async (req, res) => {
    const user_id = userid(req)
    const id = { _id: ObjectId(user_id) }
    const user = await findperson(id)
    if (user.role != 'admin') {
        res.status(403).json({ error: 'you cant get this data' })
        return
    }
    const ress = await findAll()
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        res.json(ress)
    }
}
const findmember = async (req, res) => {
    const token = JSON.parse(req.headers.accesstoken)
    const ress = await findperson(token)
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        res.json(ress)
    }
}

const editUser = async (req, res) => {
    const id = { _id: ObjectId(req.body._id) }
    const update = { username: req.body.username, email: req.body.email }
    const ress = updateUser(update, id)
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        res.json(ress)
    }
}

const deletedUser = async (req, res) => {
    const id = { _id: ObjectId(req.body._id) }
    const ress = await removeUser(id)
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        res.json(ress)
    }
}

module.exports = { login, register, findAlluser, findmember, editUser, deletedUser }