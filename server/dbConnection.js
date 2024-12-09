const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "library"
})
db.connect((error) => {
    if (error) {
        console.log("Error connecting to db", error.stack)
        return
    } else {
        console.log("Connected to db at id", db.threadId)
    }
})
module.exports = db