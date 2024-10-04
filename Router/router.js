//1)import express
const express = require('express');

//2) router library is inside express,so import that
const router = new express.Router()
const userController = require('../Controllers/userControllers')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/multerMiddleware')

//3)different paths for resolving requests
router.post('/user/register',userController.register)
router.post('/user/login',userController.login)
router.get('/user/getuserdetails',userController.getUserDetails)
router.post('/project/addProject',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.addProject);
router.get('/project/homeproject',projectController.getHomeProject);
router.get('/project/allProject',jwtMiddleware,projectController.getAllProject);
router.get('/project/userProject',jwtMiddleware,projectController.getUserProject)
router.put('/project/editproject/:id',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.editUserProject)

router.delete('/project/deleteproject/:id',jwtMiddleware,projectController.deleteprojects)

//4)export router
module.exports = router 