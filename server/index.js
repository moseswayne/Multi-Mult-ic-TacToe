/**
 * Created by moses on 7/8/17.
 */
var express = require('express');
var router = express.Router();
// var server = app.listen(3000, '192.168.0.6', 511, function () {
//     console.log('server running at 192.168.0.6:3000');
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("index");
});


module.exports = router;
