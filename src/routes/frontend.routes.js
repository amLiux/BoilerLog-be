const { Router } = require('express');
const router = Router();
const path = require('path');

router.get('/dentaltask*', (_, res) => {
    return res.sendFile(path.join(__dirname, './client', 'build', 'index.html'));
});

module.exports = router;