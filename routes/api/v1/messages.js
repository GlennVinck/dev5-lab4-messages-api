//require express
const express = require('express');
//create router
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        status: 'success',
        message: 'GET messages',
        data:[
        {
            id: 1,
            name: 'John Doe',
            message: 'Hello World',
        },
        {
            id: 2,
            name: 'John Doe',
            message: 'Hello World 2',
        }
    ]
    })
 })


router.get("/:id", (req, res) => {
        let message = req.params.id;
    res.json({
        status: 'success',
        message: `GET message with id ${message}`,
    })    
     })

// router.get("/?user=username", (req, res) => {
//     let message = req.params.username;
//     res.json({
//         status: 'success',
//         message: `GET message with username ${message}`,
//     })
//     })

 router.post("/", (req, res) => {
    let message = req.body.message;
    res.json({
        status: 'success',
        message: `POST ${message}`,
    })
 })

 router.put("/:id", (req, res) => {
    let message = req.params.id;
    res.json({
        status: 'success',
        message: `UPDATING a message with id ${message}`,
    })
 })


 router.delete("/:id", (req, res) => {
    let message = req.params.id;
    res.json({
        status: 'success',
        message: `DELETING a message with id ${message}`,
    })
 })

module.exports = router;