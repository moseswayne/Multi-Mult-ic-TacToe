/**
 * Created by moses on 7/8/17.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("4D Tic Tac Toe");
});

module.exports = router;
