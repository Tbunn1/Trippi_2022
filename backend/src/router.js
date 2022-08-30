const express = require("express");
const multer = require('multer');
const { verifyToken } = require('./middleware/verifyToken');
const router = express.Router();

const controllers = {
  landmarkComment: require("./Controllers/landmark-comment-controller"),
};

const imageControllers = {
  landmark: require("./Controllers/landmark-controller"),
  user: require('./Controllers/user-controller'),
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}_${uniqueSuffix}.png`);
  }
});

const upload = multer({ storage: storage });

Object.keys(imageControllers).forEach(key => {
  const isUser = key === 'user';

  const createArgs = isUser ? 
    [ `/${key}`, upload.single('image'), imageControllers[key].apiCreate ] :
    [ `/${key}`, [verifyToken], upload.single('image'), imageControllers[key].apiCreate ];

  router.get(`/${key}`, [verifyToken], imageControllers[key].apiGetAll);
  router.post(...createArgs);
  router.get(`/${key}/:id`, [verifyToken], imageControllers[key].apiGetById);
  router.put(`/${key}/:id`, [verifyToken], upload.single('image'), imageControllers[key].apiUpdate);
  router.delete(`/${key}/:id`, [verifyToken], imageControllers[key].apiDelete);
});

Object.keys(controllers).forEach(key => {
  router.get(`/${key}`, [verifyToken], controllers[key].apiGetAll);
  router.post(`/${key}`, [verifyToken], controllers[key].apiCreate);
  router.get(`/${key}/:id`, [verifyToken], controllers[key].apiGetById);
  router.put(`/${key}/:id`, [verifyToken], controllers[key].apiUpdate);
  router.delete(`/${key}/:id`, [verifyToken], controllers[key].apiDelete);
});

// add password update
router.put('/updatePassword', [verifyToken], imageControllers.user.updatePassword)

// add login router
router.post('/login', imageControllers.user.apiLogin);

module.exports = router;
