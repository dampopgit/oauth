

const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    let output = req.user.username;
    let getout = output.toUpperCase();
    res.send('you are logged in, this is your profile - ' + req.user.id + req.user + getout);
});

module.exports = router;
