//CONNECT TO DATABASE
require('../models/connectDB')
const Category = require('../models/category')
const Expenses = require('../models/expenses')
// Get expensess filter for the user 
const getExpensessDates = async (req, res) => {
    if (req.user === undefined)
        res.status(404).json({ message: `You don't have credentials` })
    try {
        let dateType = req.query.dateType
        let categoryId = req.query.categoryId
        let currencyId = req.query.currencyId
        const filedOrder = req.query.filedOrder
        let order = 1
        if (req.query.order === "desc")
            order = -1
        if (dateType === "day") {
            let date = req.body.date
            date = new Date(date).toISOString().substring(0, 10)
            if (categoryId !== null && currencyId !== null) {
                const expenses = await Expenses
                    .find({ 'userId': req.user.id, 'categoryId': categoryId, 'currency.currencyId': currencyId, 'date': date })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
            else if (categoryId !== null) {
                const expenses = await Expenses
                    .find({ 'userId': req.user.id, 'categoryId': categoryId, 'date': date })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
            else if (currencyId !== null) {
                const expenses = await Expenses
                    .find({ userId: req.user.id, 'currency.currencyId': currencyId, 'date': date })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
            else {
                const expenses = await Expenses
                    .find({ userId: req.user.id, 'date': date })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
        }
        else if (dateType === "week") {
            let date1 = req.body.date1
            let date2 = req.body.date2
            date1 = new Date(date1).toISOString().substring(0, 10)
            date2 = new Date(date2).toISOString().substring(0, 10)
            if (categoryId !== null && currencyId !== null) {
                const expenses = await Expenses
                    .find({ 'userId': req.user.id, 'categoryId': categoryId, 'currency.currencyId': currencyId, 'date': { $gte: date1, $lte: date2 } })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
            else if (categoryId !== null) {
                const expenses = await Expenses
                    .find({ 'userId': req.user.id, 'categoryId': categoryId, 'date': { $gte: date1, $lte: date2 } })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
            else if (currencyId !== null) {
                const expenses = await Expenses
                    .find({ userId: req.user.id, 'currency.currencyId': currencyId, 'date': { $gte: date1, $lte: date2 } })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
            else {
                const expenses = await Expenses
                    .find({ userId: req.user.id, 'date': { $gte: date1, $lte: date2 } })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
        }
        else if (dateType === "month") {
            let month = req.body.month
            let year = req.body.year
            const days = daysInMonth(month, year)
            let date1 = year + '-' + month + '-' + '01'
            date1 = new Date(date1).toISOString().substring(0, 10)
            let date2 = year + '-' + month + '-' + days
            date2 = new Date(date2).toISOString().substring(0, 10)
            if (categoryId !== null && currencyId !== null) {
                const expenses = await Expenses
                    .find({ 'userId': req.user.id, 'categoryId': categoryId, 'currency.currencyId': currencyId, 'date': { $gte: date1, $lte: date2 } })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
            else if (categoryId !== null) {
                const expenses = await Expenses
                    .find({ 'userId': req.user.id, 'categoryId': categoryId, 'date': { $gte: date1, $lte: date2 } })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
            else if (currencyId !== null) {
                const expenses = await Expenses
                    .find({ userId: req.user.id, 'currency.currencyId': currencyId, 'date': { $gte: date1, $lte: date2 } })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
            else {
                const expenses = await Expenses
                    .find({ userId: req.user.id, 'date': { $gte: date1, $lte: date2 } })
                    .populate({ path: 'userId', model: 'User' })
                    .populate({ path: 'categoryId', model: 'Category' })
                    .populate({ path: 'currency.currencyId', model: 'Currency' })
                    .sort({ [filedOrder]: order })
                res.status(201).json({ expenses })
            }
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
const getExpensessDescription = async (req, res) => {
    if (req.user === undefined)
        res.status(404).json({ message: `You don't have credentials` })
    try {
        let dateType = req.query.dateType
        let currencyId = req.query.currencyId
        let description = req.body.description
        const filedOrder = req.query.filedOrder
        let order = 1
        if (req.query.order === "desc")
            order = -1

        if (currencyId !== null) {
            const expenses = await Expenses
                .find({ 'userId': req.user.id, 'description': description, 'currency.currencyId': currencyId })
                .populate({ path: 'userId', model: 'User' })
                .populate({ path: 'categoryId', model: 'Category' })
                .populate({ path: 'currency.currencyId', model: 'Currency' })
                .sort({ [filedOrder]: order })
            res.status(201).json({ expenses })
        }
        else {
            const expenses = await Expenses
                .find({ 'userId': req.user.id, 'description': description })
                .populate({ path: 'userId', model: 'User' })
                .populate({ path: 'categoryId', model: 'Category' })
                .populate({ path: 'currency.currencyId', model: 'Currency' })
                .sort({ [filedOrder]: order })
            res.status(201).json({ expenses })
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
// Get all expensess filtering by category for admin
const getExpensessCategory = async (req, res) => {
    if (req.user === undefined)
        res.status(404).json({ message: `You don't have credentials` })
    try {
        let currencyId = req.query.currencyId
        let categoryId = req.body.categoryId
        const filedOrder = req.query.filedOrder
        let order = 1
        if (req.query.order === "desc")
            order = -1
        if (currencyId !== null) {
            const expenses = await Expenses
                .find({ 'userId': req.user.id, 'description': description, 'categoryId': categoryId, 'currency.currencyId': currencyId })
                .populate({ path: 'userId', model: 'User' })
                .populate({ path: 'categoryId', model: 'Category' })
                .populate({ path: 'currency.currencyId', model: 'Currency' })
                .sort({ [filedOrder]: order })
            res.status(201).json({ expenses })
        }
        else {
            const expenses = await Expenses
                .find({ 'userId': req.user.id, 'categoryId': categoryId })
                .populate({ path: 'userId', model: 'User' })
                .populate({ path: 'categoryId', model: 'Category' })
                .populate({ path: 'currency.currencyId', model: 'Currency' })
                .sort({ [filedOrder]: order })
            res.status(201).json({ expenses })
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
// Get all expensess filtering by user id
const getExpensesByUser = async (req, res) => {
    if (req.user === undefined)
        res.status(404).json({ message: `You don't have credentials` })
    try {
        let userId = req.query.userId
        const filedOrder = req.query.filedOrder
        let order = 1
        if (req.query.order === "desc")
            order = -1
        const expenses = await Expenses
            .find({ 'userId': req.body.id })
            .populate({ path: 'userId', model: 'User' })
            .populate({ path: 'categoryId', model: 'Category' })
            .populate({ path: 'currency.currencyId', model: 'Currency' })
            .sort({ [filedOrder]: order })
        res.status(201).json({ expenses })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
//add expenses
const addExpenses = async (req, res) => {
    if (req.user === undefined)
        res.status(404).json({ message: `You don't have credentials` })
    req.body.currency = JSON.parse(req.body.currency)
    req.body.currency.map((currencyId) => { ObjectId(req.body.currency.currencyId) })
    const expensse = new Expenses({
        userId: req.user.id,
        categoryId: req.body.categoryId,
        description: req.body.description,
        currency: req.body.currency,
        date: req.body.date
    })
    try {
        await expensse.save();
        res.json(expensse);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
//edit expenses
const editExpenses = async (req, res) => {
    let expensseId = req.params.id
    if (req.user === undefined)
        res.status(404).json({ message: `You don't have credentials` })
    req.body.currency = JSON.parse(req.body.currency)
    req.body.currency.map((currencyId) => { ObjectId(req.body.currencyId) })
    const editExpenses = {
        userId: req.user.id,
        categoryId: req.body.categoryId,
        description: req.body.description,
        currency: req.body.currency,
        date: req.body.date
    }
    try {
        const updateExpensses = await Expenses.findByIdAndUpdate({ _id: expensseId }, editExpenses);
        res.json(updateExpensses);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
//delete expenses
const deleteExpenses = async (req, res) => {
    if (req.user === undefined)
        res.status(404).json({ message: `You don't have credentials` })
    let amount = req.body.amount
    req.body.currencyId = ObjectId(req.body.currencyId)
    try {
        const getUser = await User.find({ _id: req.user.id })
        let salaries = getUser.salary[getUser.salary.length - 1]
        let updatedSalary = lastSalary
        console.log("updatedSalary0", updatedSalary)
        let theCurrency = salaries.amount
        for (let i = 0; i < theCurrency.length; i++) {
            if (theCurrency[i].currencyId.name === "Dollar") {
                updatedSalary = lastSalary + req.body.amount
            }
        }
        console.log("updatedSalary1", updatedSalary)
        getUser.salary[getUser.salary.length - 1] = updatedSalary
        console.log("getUser", getUser)
        const currencyDeleted = await Currency.deleteOne({ _id: currencyId })
        const editedUser = await User.findByIdAndUpdate({ _id: userId }, findUser)
        res.json(updatedSalary);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}