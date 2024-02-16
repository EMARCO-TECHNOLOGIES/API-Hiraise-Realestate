

import bcrypt from 'bcrypt'
import { UserModel } from '../../model/userSchema.js'

export const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const compare = await bcrypt.compare(password, hashPassword)

        const createAdmin = await UserModel.create({
            username: username.toLowerCase(),
            password: hashPassword,
            role: 'admin',
            date: new Date(Date.now()).toLocaleString()
        })

        res.json({ success: true, message: 'Admin Registered successfully' })


    } catch (error) {
        console.log(error)
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(req.body)
        const isExist = await UserModel.findOne({ username: username })
        if (isExist) {
            const isValidPassword = await bcrypt.compare(password, isExist.password)
            console.log(isValidPassword, 'pppp')
            if (isValidPassword) {
                res.json({ success: true, message: 'Login successfull', userId: isExist._id })
            } else {
                res.json({ success: false, message: 'Inccorrect Password' })
            }
        } else {
            res.json({ success: false, message: 'Username Not Registered' })
        }
        console.log(isExist)

    } catch (error) {
        console.log(error)
    }
}