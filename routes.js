import express from 'express';
import { signUp, signIn, deleteUser, verifIfMdpIsOK } from './controllers/connexion.controller.js';
import { addTransaction, getAllTransactionByIdProfile } from './controllers/transaction.controller.js';
import { updateProfile, updatePassword} from './controllers/update_profile.controller.js';

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
router.post("/update/deleteuser", deleteUser);
router.post("/verif/verifpassword", verifIfMdpIsOK)
router.post("/update/updatepassword", updatePassword);
router.post("/update/updateuser", updateProfile);
router.post("/transaction/add", addTransaction);
router.post("/transaction/findbyprofile", getAllTransactionByIdProfile);

export default router;