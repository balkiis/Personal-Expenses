//CONNECT TO DATABASE
require('../models/connectToDB')
const Category = require('../models/category')
const Expenses = require('../models/expenses')
//GET ALL CATEGORIES (ADMIN)
exports.getCategoriesAll = async (req, res) => {
  if (req.user === undefined) {
    res.status(404).json({ message: "You do not have the authority" })
  }
  try {
    const categories = await Category.find({})
    res.json(categories);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}
//GET CATEGORIES (PUBLIC)
exports.getCategoriesPublic = async (req, res) => {
  if (req.user === undefined) {
    res.status(404).json({ message: "You do not have the authority" })
  }
  try {
    const categories = await Category.find({ public: true })
    res.json(categories);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}
//GET CATEGORIES (PRIVATe)
exports.getCategoriesPrivate = async (req, res) => {
  if (req.user === undefined) {
    res.status(404).json({ message: "You do not have the authority" })
  }
  try {
    const categories = await Category.find({ userId: req.user.id })
    res.json(categories);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

// ADD OR POST CATEGORY (PUBLIC)
exports.addCategoryPublic = async (req, res) => {
  if (req.user === undefined) {
    res.status(404).json({ message: "You do not have the authority" })
  }
  const newCategory = new Category({
    name: req.body.name,
    public: true,
    userId: null
  })

  try {
    await newCategory.save();
    res.json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}
// ADD OR POST CATEGORY (PRIVATE)
exports.addCategoryPrivate = async (req, res) => {
  if (req.user === undefined) {
    res.status(404).json({ message: "You do not have the authority" })
  }
  const newCategory = new Category({
    name: req.body.name,
    public: false,
    userId: req.user.id
  })

  try {
    await newCategory.save();
    res.json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

//DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
  if (req.user === undefined) {
    res.status(404).json({ message: "You do not have the authority" })
  }
  const categoryId = req.params.id;
  try {
    const categoryDeleted = await Category.deleteOne({ _id: categoryId })
    const dataDeleted = await Expenses.deleteOne({ categoryId: categoryId })
    if (categoryDeleted && dataDeleted)
      res.status(204).json({ message: 'Category deleted successfully' })
    else
      res.status(401).json({ message: `Category can't be deleted` })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

//EDIT OR UPDATE CATEGORY
exports.editCategory = async (req, res) => {
  if (req.user === undefined) {
    res.status(404).json({ message: "You do not have the authority" })
  }
  const categoryId = req.params.id;
  const editedCategory = {
    name: req.body.name
  }
  try {
    const updateCategory = await Category.findByIdAndUpdate({ _id: categoryId }, editedCategory);
    res.json(updateCategory);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}