const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Router = express.Router()
const controller = require("../controllers/userController.js")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

//Authorization for Verifying User
const authorization = async (req,res, next) =>{
    try{
        const jwtToken = req['headers'].authorization.split(" ")[1]
        if(jwtToken === undefined){
            res.status(401).json({
                message: "Unauthorized"
            })
        }else{
            jwt.verify(jwtToken, JWT_SECRET_KEY, (error, payload)=>{
                if(error){
                    res.status(401).json({
                        message: "unauthorized"
                    })
                }else{
                    req.payload = payload
                    next()
                }
            })
        }
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

//Get All Users
Router.get("/", controller.getUsers)

//Register A New User
Router.post("/register", controller.registerUser)

//User  And Librarian Login
Router.post("/login", controller.loginUser)

//Get All Books
Router.get("/books", controller.getAllBooks)

//Send Borrow Request
Router.post("/borrow_request/:id",authorization, controller.postBorrowRequest)

//Get All Borrow History
Router.get("/users/:id/history", authorization, controller.getAllBorrowersHistory)


module.exports = Router
