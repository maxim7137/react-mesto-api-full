const router = require('express').Router();

const { createUser, login } = require('../controllers/users');

const { validateRegUser, validateLoginUser } = require('../middlewares/validations');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validateRegUser, createUser);
router.post('/signin', validateLoginUser, login);

module.exports = router;
