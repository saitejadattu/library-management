const { v4: uuidv4 } = require("uuid")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../dbConnection.js")
require("dotenv").config()
const jwt_secret_key = process.env.JWT_SECRET_KEY


const controller = {
    //Get All Borrow Request
    getAllBorrowRequest: (req, res) => {
        const { id, role, email } = req.payload
        if (role === "librarian") {
            const getBorrowRequestQuery = `SELECT * FROM borrow_requests`
            db.query(getBorrowRequestQuery, (error, result) => {
                if (error) {
                    res.status(500).json({
                        message: error.message
                    })
                } else {
                    res.status(200).json({
                        data: result
                    })
                }
            })
        } else {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    },
    //Approve Borrow Request
    approveBorrowRequest: (req, res) => {
        const { id, role, email } = req.payload
        const request_id = req.params.id
        if (role === "librarian") {
            //Using parameterized query to avoid SQL Injection
            const approveBorrowRequestQuery = `UPDATE borrow_requests SET status=? WHERE id=?`
            const values = ['approved', request_id]
            db.query(approveBorrowRequestQuery, values, (error, result) => {
                if (error) {
                    res.status(500).json({
                        message: error.message
                    })
                } else {
                    const getBorrowRequestQuery = `SELECT * FROM borrow_requests WHERE id=?`
                    const value = [request_id]
                    db.query(getBorrowRequestQuery, value, (error, result) => {
                        if (error) {
                            res.status(500).json({
                                message: error.message
                            })
                        } else {
                            const { user_id, book_id } = result[0]
                            const insertingBorrowHistoryQuery = `INSERT INTO borrow_history(id, user_id, book_id, borrowed_on)
                                                        VALUES(?,?,?,?)`
                            const values = [uuidv4(), user_id, book_id, new Date()]
                            db.query(insertingBorrowHistoryQuery, values, (error, result)=>{
                                if(error){
                                    res.status(500).json({
                                        message: error.message
                                    })
                                }else{
                                    res.status(200).json({
                                        message: result
                                    })
                                }
                            })
                        }
                    })
                }
            })
        } else {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    },
    denyBorrowRequest: (req, res) => {
        const { id, role, email } = req.payload
        const request_id = req.params.id
        if (role === "librarian") {
            //Using parameterized query to avoid SQL Injection
            const approveBorrowRequestQuery = `UPDATE borrow_requests SET status=? WHERE id=?`
            const values = ['denied', request_id]
            db.query(approveBorrowRequestQuery, values, (error, result) => {
                if (error) {
                    res.status(500).json({
                        message: error.message
                    })
                } else {
                    res.status(200).json({
                        message: "status changed"
                    })
                }
            })
        } else {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    },
    getAllBorrowersHistory:(req,res)=>{
        const userId = req.params.id 
        const { role, email} = req.payload
        if(role==="librarian"){
            const getAllBorrowHistoryQuery = `SELECT * FROM borrow_history WHERE user_id=?`
            const value = [userId]
            db.query(getAllBorrowHistoryQuery, value, (error, result)=>{
                if(error){
                    res.status(500).json({
                        message: error.message
                    })
                }else{
                    res.status(200).json({
                        message: result
                    })
                }
            })
        }else{
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    }
}

module.exports = controller