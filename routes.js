import express from 'express';

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
router.get("/auth", auth, getUserData);

export default router;