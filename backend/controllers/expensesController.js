//CONNECT TO DATABASE
require('../models/connectDB')
const Category = require('../models/category')
const Expenses = require('../models/expenses')
// Get expensess filter for the user 
const getExpensessUser = async (req, res) => {
    if (req.user === undefined)
        res.status(404).json({ message: `You don't have credentials` })
    try {
        //dateType=year&monthNb=2022&categoryExist=1
        //&categoryId=12212334346rt2&currencyExist=1&currencyId=sdffw23erw&order=desc
        let dateType = req.query.dateType
        let categoryExist = req.query.categoryExist
        let currencyExist = req.query.currencyExist
        const filedOrder = req.query.filedOrder

        if (dateType === "day") {
            let dayDate = req.body.dayDate
            const expenses = await Expenses
                .find({ userId: req.user.id, categoryId: categoryId, date: dayDate })
                .populate({ path: 'userId', model: 'User' })
                .populate({ path: 'categoryId', model: 'Category' })
                .populate({ path: 'currency.currencyId', model: 'Currency' })
                .sort({ [filedOrder]: order })
            res.status(201).json({ expenses })
        }

        let order = 1
        if (req.query.order === "desc")
            order = -1







        const expenses = await Expenses
            .find({ userId: req.user.id, categoryId: categoryId })
            .populate({ path: 'userId', model: 'User' })
            .populate({ path: 'categoryId', model: 'Category' })
            .populate({ path: 'currency.currencyId', model: 'Currency' })
            .sort({ [filedOrder]: order })
        res.status(201).json({ expenses })


    } catch (error) {
        res.status(404).json({ message: error })
    }
}
const getExpensessAdmin = async (req, res) => {
    if (req.user === undefined)
        res.status(404).json({ message: `You don't have credentials` })
    try {
        const typeSearch = req.query.type
        if (typeSearch === "category") {
            const categoryId = req.query.id
            let order = 1
            if (req.query.order === "desc")
                order = -1
            const expenses = await Expenses
                .find({ userId: req.user.id, categoryId: categoryId })
                .populate({ path: 'userId', model: 'User' })
                .populate({ path: 'categoryId', model: 'Category' })
                .populate({ path: 'currency.currencyId', model: 'Currency' })
                .sort({ 'date': order })
            res.status(201).json({ expenses })
        }
        else if (typeSearch === "week") {
            const categoryId = req.query.id
            let order = 1
            if (req.query.order === "desc")
                order = -1
            const expenses = await Expenses
                .find({ userId: req.user.id, categoryId: categoryId })
                .populate({ path: 'userId', model: 'User' })
                .populate({ path: 'categoryId', model: 'Category' })
                .populate({ path: 'currency.currencyId', model: 'Currency' })
                .sort({ 'amount': order })
            res.status(201).json({ expenses })
        }
        else if (typeSearch === "month") {
            const categoryId = req.query.id
            let order = 1
            if (req.query.order === "desc")
                order = -1
            const expenses = await Expenses
                .find({ userId: req.user.id, categoryId: categoryId })
                .populate({ path: 'userId', model: 'User' })
                .populate({ path: 'categoryId', model: 'Category' })
                .populate({ path: 'currency.currencyId', model: 'Currency' })
                .sort({ 'amount': order })
            res.status(201).json({ expenses })
        }
        else if (typeSearch === "year") {
            const categoryId = req.query.id
            let order = 1
            if (req.query.order === "desc")
                order = -1
            const expenses = await Expenses
                .find({ userId: req.user.id, categoryId: categoryId })
                .populate({ path: 'userId', model: 'User' })
                .populate({ path: 'categoryId', model: 'Category' })
                .populate({ path: 'currency.currencyId', model: 'Currency' })
                .sort({ 'amount': order })
            res.status(201).json({ expenses })
        }
        else if (typeSearch === "category") {
            const categoryId = req.query.id
            const expenses = await Expenses.find({ userId: req.user.id, categoryId: categoryId })
            res.status(201).json({ expenses })
        }

    } catch (error) {
        res.status(404).json({ message: error })
    }
}


// Get all expensess filtering by user id
const FilterByUser = async (req, res) => {
    try {
        const exUser = await exUser.findBy({ userId: req.body.userId })
        res.json({
            userId: UserId,
            categoryId: categoryId,
            description: description,
            ammount: ammount,
            currency: currency,
        })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

// Get all expensess filtering by category id
const FilterByCategory = async (req, res) => {
    try {
        const exCategory = await exCategory.findById({ categoryId: req.body.categoryId })
        res.json({
            userId: UserId,
            categoryId: categoryId,
            description: description,
            ammount: ammount,
            currency: currency,
        })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
}