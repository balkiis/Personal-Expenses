const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController');

router.route('/all')
    .get(categoryController.getCategoriesAll)
router.route('/public')
    .get(categoryController.getCategoriesPublic)
router.route('/private')
    .get(categoryController.getCategoriesPrivate)

router.route('/public')
    .post(categoryController.addCategoryPublic)
router.route('/private')
    .post(categoryController.addCategoryPrivate)

router.route('/:id')
    .delete(categoryController.deleteCategory)//not for use
    .patch(categoryController.editCategory)

module.exports = router