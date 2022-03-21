//CONNECT TO DATABASE
require('../models/connectDB')
const Currency = require('../models/Currency')
const Expenses = require('../models/expenses')
const { uploadPhoto, deletePhoto } = require('../utils/uploadFile')
//GET Currencies (For Admin) // NOW FOR POPULAR
exports.getCurrencies = async (req, res) => {
  if (req.user === undefined) {
    res.status(404).json({ message: "You do not have the authority" })
  }
  try {
    const currencies = await Currency.find({})
    res.json(currencies);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

// ADD OR POST Currency (For Admin)
exports.addCurrency = async (req, res) => {
  if (req.user === undefined) {
    res.status(404).json({ message: "You do not have the authority" })
  }
  req.body.convert = JSON.parse(req.body.convert)
  req.body.convert.map((convert) => { ObjectId(convert.currencyId) })
  const newCurrency = new Currency({
    name: req.body.name,
    amount: req.body.amount,
    convert: req.body.convert,
  })

  try {
    await newCurrency.save();
    res.json(newCurrency);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

//DELETE Currency (NOT FOR USE)
exports.deleteCurrency = async (req, res) => {
  if (req.user === undefined) {
    res.status(404).json({ message: "You do not have the authority" })
  }
  const currencyId = req.params.id;
  try {
    const currencyDeleted = await Currency.deleteOne({ _id: currencyId })
    const dataDeleted = await Expenses.deleteOne({ categoryId: categoryId })
    if (currencyDeleted && dataDeleted)
      res.status(204).json({ message: 'Currency deleted successfully' })
    else
      res.status(401).json({ message: `Currency can't be deleted` })
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

//EDIT OR UPDATE Currency
exports.editCurrency = async (req, res) => {
  if (req.user === undefined) {
    res.status(404).json({ message: "You do not have the authority" })
  }
  req.body.convert = JSON.parse(req.body.convert)
  req.body.convert.map((convert) => { ObjectId(convert.currencyId) })
  const currencyId = req.params.id;
  const editedCurrency = {
    name: req.body.name,
    amount: req.body.amount,
    convert: req.body.convert,
  }
  try {
    const updateCurrency = await Currency.findByIdAndUpdate({ _id: currencyId }, editedCurrency);
    res.json(updateCurrency);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}