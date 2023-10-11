//require express
const express = require('express');
//create router
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        status: 'success',
        message: 'GET messages',
    //    data:[
    //     {
    //         id: 1,
    //         name: 'John Doe',
    //         message: 'Hello World',
    //     },
    //     {
    //         id: 2,
    //         name: 'John Doe',
    //         message: 'Hello World 2',
    //     }
    // ]
    })
 })

 router.post("/", (req, res) => {
    let message = req.body.message;
    res.json({
        status: 'success',
        message: `POST ${message}`,
    })
 })

module.exports = router;