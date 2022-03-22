const logger = require('../utils/logger')
require('../models/connectToDB')
const User = require('../models/users')
const { ObjectId } = require('mongodb')
const { photoValidation, userValidationData, userValidationOtherData, userValidationEmail, userValidationUsername, userValidationPassword } = require('../utils/validate')
const logout = require('./login')
const bcrypt = require('bcrypt')
const { uploadPhoto } = require('../utils/uploadFile')
const { array } = require('@hapi/joi')
const getUsers = async (request, response) => {
    const users = await User.find({})
    response.status(201).json({ data: users })
}
const setUser = async (request, response) => {
    const body = request.body
    const validate = userValidationData(body)
    if (validate.error)
        return response.status(401).json({ error: validate.error.message })
    const checkExistingEmail = await User.find({ email: body.email })
    if (checkExistingEmail.length)
        return response.status(401).json({ error: 'Email already exist' })
    const checkExistingUsername = await User.find({ username: body.username })
    if (checkExistingUsername.length)
        return response.status(401).json({ error: 'Username already exist' })
    const url = req.protocol + '://' + req.get('host')
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.salary, saltRounds)

    body.salary = JSON.parse(body.salary)
    body.salary.map((convert) => { ObjectId(body.salary.currencyId) })
    const newUser = new User({
        fName: body.fName,
        lName: body.lName,
        username: body.username,
        email: body.email,
        password: passwordHash,
        photo: url + '/public/avatar.png',
        userType: body.userType,
        salary: body.salary
    })
    if (req.file) {
        if (req.file.fieldname !== "photo")
            return response.status(401).json({ error: 'Only .png, .jpg and .jpeg format allowed!' })
        const validatePhoto = photoValidation({ photo: req.file })
        if (validatePhoto.error)
            return response.status(401).json({ error: validatePhoto.error.message })
        console.log(newProfile)
        newUser["photo"] = url + '/public/' + req.file.filename
    }
    const savedUser = await newUser.save()
    response.status(201).json({ data: savedUser })
}
const editUserData = async (request, response) => {
    if (request.user === undefined)
        res.status(404).json({ message: `You don't have credentials` })
    const body = request.body
    const _id = request.params
    const validate = userValidationOtherData(body)
    if (validate.error)
        res.status(404).json({ name: "ValidationError", message: validate.error.message })

    const editedUser = {
        fName: body.fName,
        lName: body.lName
    }
    const user = await User.findById(ObjectId(_id))
    Object.assign(user, editedUser)
    const updatedUser = await User.findByIdAndUpdate(ObjectId(_id), user, { new: true })
    response.status(201).json({ data: updatedUser })
}
const uploadProfile = uploadPhoto.single('profileImg')
const savePicture = async (req, res) => {
    const userId = req.body.userId
    console.log("req.bodyr", req.body)
    console.log("userId", userId)
    console.log("req.file", req.file)
    if (req.file === undefined)
        return response.status(401).json({ error: 'Photo for member is required' })
    if (req.file.fieldname !== "photo")
        return response.status(401).json({ error: 'Only .png, .jpg and .jpeg format allowed!' })
    const validatePhoto = photoValidation({ photo: req.file })
    if (validatePhoto.error)
        return response.status(401).json({ error: validatePhoto.error.message })
    const url = req.protocol + '://' + req.get('host')
    console.log("url", url)
    const newProfile = ({
        photo: url + '/public/' + req.file.filename
    })
    console.log(newProfile)
    try {
        const users = await User.findByIdAndUpdate({ _id: userId }, newProfile)
        res.json(users.photo);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

//Add SALARY USER
addSalary = async (req, res) => {
    if (req.user === undefined) {
        res.status(404).json({ message: "You do not have the authority" })
    }
    req.body.currencyId = ObjectId(req.body.currencyId)
    const findUser = await User.findById({ _id: req.user.id })
    const getCurrencies = await Currency.findById({})
    console.log("getCurrencies", getCurrencies)
    let allAmount = []
    for (let i = 0; i < getCurrencies.length; i++) {
        if (getCurrencies[i]._id !== req.body.currencyId) {
            let convert = convert.amount
            let convertedAmount = req.body.amount * convert
            allAmount.push({
                currencyId: getCurrencies[i].currencyId,
                amount: convertedAmount
            })
            console.log("allAmount " + i, allAmount)
        }
    }
    let newAmount = {
        currencyId: req.body.currencyId,
        amount: req.body.amount,
    }
    console.log("newAmount", newAmount)
    allAmount.push(newAmount)
    console.log("allAmount final", allAmount)
    const addSalary = {
        amount: allAmount,
        month: req.body.month,
        year: req.body.year
    }
    findUser.push(addSalary)
    console("findUser", findUser)
    try {
        const editedUser = await User.findByIdAndUpdate({ _id: userId }, findUser)
        console("editedUser", editedUser)
        res.json(addSalary);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

//Edit SALARY USER
editSalary = async (req, res) => {
    if (req.user === undefined) {
        res.status(404).json({ message: "You do not have the authority" })
    }
    req.body.currencyId = ObjectId(req.body.currencyId)
    let editedAmount = {
        currencyId: req.body.currencyId,
        amount: req.body.ammount,
    }
    let allAmount = []
    for (let i = 0; i < getCurrencies.length; i++) {
        if (getCurrencies[i]._id !== req.body.currencyId) {
            let convert = convert.amount
            let convertedAmount = req.body.amount * convert
            allAmount.push({
                currencyId: getCurrencies[i].currencyId,
                amount: convertedAmount
            })
            console.log("allAmount " + i, allAmount)
        }
        else {
            allAmount.push(newAmount)
        }
    }
    console.log("allAmount", allAmount)
    const editSalary = {
        amount: allAmount,
        month: req.body.month,
        year: req.body.year
    }
    console.log("editSalary", editSalary)
    const findUser = await User.find({ _id: req.user.id, month: editSalary.month, year: editSalary.year })
    for (let i = 0; i <= findUser.lenght(); i++) {
        if ((findUser[i].month === editSalary.month) && (findUser[i].year === editSalary.year)) {
            findUser.amount = editSalary
        }
    }

    console("findUser")
    try {
        const editedUser = await User.findByIdAndUpdate({ _id: userId }, findUser)
        res.json(editSalary);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

module.exports = { addSalary, editSalary, getUsers, setUser, editUserData, uploadProfile, savePicture }