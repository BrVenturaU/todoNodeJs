const {Router} = require('express');
const router = Router();

router.get('/profile', (req, res) => {
    res.send('Profile');
    res.end;
});


module.exports = router;