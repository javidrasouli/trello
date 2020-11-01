'use strict'
const { json } = require('express');
const jwt = require('jsonwebtoken');
const { getInstance } = require("./DB/db")
const generateToken = async (res, userID) => {
    const accessToken = jwt.sign({ id: userID }, '30bil', { expiresIn: "1d" });
    const rToken = jwt.sign({ id: userID }, '40bil', { expiresIn: "10d" });
    const db = await getInstance()
    const users = db.collection("users")
    const ok = await users.updateOne({ _id: userID }, { $set: { refreshToken: rToken } })
    if (!ok) {
        res.status(500)
        return { status: false }
    }
    return { status: true, accessToken: accessToken, refreshtoken: rToken }
}

const refreshToken = async (req, res) => {
    try {
        const token = JSON.parse(req.body.refreshToken);
        if (!token) {
            console.error("token not found")
            res.status(401).json({ success: false })
            return
        }
        const decoded = jwt.verify(token, "40bil");
        const ok = await generateToken(res, decoded.id)
        res.json({ accessToken: ok.accessToken, refreshtoken: ok.refreshtoken })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

const check = (req, res, next) => {
    try {
        const token = JSON.parse(req.headers.accesstoken)
        if (!token) {
            console.error("token not found")
            res.status(401).json({ success: false })
            return
        }
        const decoded = jwt.verify(token, "30bil");
        console.log(decoded);
        next()
    } catch (err) {
        console.log('err',err)
        res.status(403).json({ success: false, error: "invalid token" })
        return
    }
}

module.exports = { isAuth: check, generateToken, refreshToken }