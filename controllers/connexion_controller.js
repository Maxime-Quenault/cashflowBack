import ProfileModel from "../models/profile.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        const {pseudo, password, devise, solde} = req.body;

        const existingUserWithUsername = await ProfileModel.findOne({ pseudo: pseudo });
        if (existingUserWithUsername) {
            return res
                .status(400)
                .json({ msg: "Pseudo déjà utilisé." });
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new ProfileModel({
            pseudo,
            password: hashedPassword,
            devise,
            solde,
        });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const signIn = async (req, res) => {
    try {
        const { pseudo, password, stayConnected } = req.body;

        const user = await ProfileModel.findOne({pseudo : pseudo});
        if (!user) {
            return res.status(400).json({ msg: "Utilisateur non trouvé." });
        }

        const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "Mot de passe incorrect." });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            stayConnected ? { expiresIn: "7d" } : { expiresIn: "1h" }
        );
        res.json({ user, token });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const tokenIsValid = async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await ProfileModel.findById(verified.id);
        if (!user) return res.json(false);
        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// export const getUserData = async (req, res) => {
//     const user = await ProfileModel.findById(req.user);
//     res.json({ user: user._doc, token: req.token });
// };

export const deleteUser = async (req, res) => {
    try{
        const {pseudo} = req.body;
        ProfileModel.deleteOne({pseudo : pseudo});
        res.json({ msg: "Compte supprimé" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}