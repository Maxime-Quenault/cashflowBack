import express from 'express';
import { signUp, signIn, tokenIsValid, deleteUser, updateProfile } from './controllers/connexion_controller.js';
import { auth } from './middlewares/auth.js';

const router = express.Router();

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Auth routes
router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/auth/tokenIsValid", tokenIsValid);
router.post("/auth/deleteuser", deleteUser);
router.post("/auth/updateuser", updateProfile);

export default router;