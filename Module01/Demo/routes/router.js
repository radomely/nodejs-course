const getDefoult = require('./defoult/get-defoult');
const getCars = require('./cars/get-cars');

const router = {
    'defoult': getDefoult,
    '/cars': getCars
};

module.exports = router;