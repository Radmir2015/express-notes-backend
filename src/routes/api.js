import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as noteController from '../controllers/note/note.controller';

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get('/me', userController.profile);
router.post(
  '/changePassword',
  validate(userValidator.changePassword),
  userController.changePassword,
);

router.get('/notes', noteController.getAll);
router.get('/note/:uuid', noteController.get);
router.post('/note/add', noteController.add);
router.post('/note/edit', noteController.edit);
router.post('/note/remove', noteController.remove);

router.get('/logout', userController.logout);

module.exports = router;
