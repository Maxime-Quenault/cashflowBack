import ProfileModel from "../models/profile.model.js";
import bcryptjs from "bcryptjs";
import transactionModel from "../models/transaction.model.js";

/**
 * Cette methode permet de creer un nouvel user dans la base de données.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const signUp = async (req, res) => {
    try {
        const {pseudo, password, devise, solde} = req.body;

        const existingUserWithUsername = await ProfileModel.findOne({ pseudo: pseudo });
        if (existingUserWithUsername) {
            return res
                .json({ msg: "pseudo" });
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        let new_user = new ProfileModel({
            pseudo,
            password: hashedPassword,
            devise,
            solde,
        });
        await new_user.save();
        const user = await ProfileModel.findOne({pseudo : pseudo}); 
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

/**
 * Cette methode permet à l'utilisateur de se connecter, pour cela on vérifie que le password saisie est le bon.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const signIn = async (req, res) => {
    try {
        const { pseudo, password } = req.body;

        const user = await ProfileModel.findOne({pseudo : pseudo});

        res.json({ user });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

/**
 * Cette methode permet de supprimer un user de la base de données.
 * @param {*} req 
 * @param {*} res 
 */
export const deleteUser = async (req, res) => {
    try{
        const {pseudo} = req.body;
        const profile = ProfileModel.findOne({pseudo : pseudo});
        await  ProfileModel.deleteOne({pseudo : pseudo});

        await transactionModel.deleteMany({pseudoProfile: pseudo});
        res.json({ msg: "Compte supprimé" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Cette methode permet de verifier que le mot de passe saisie par l'utilisateur correspond bien à son mod de passe actuel.
 * @param {*} req 
 * @param {*} res 
 */
export const verifIfMdpIsOK = async (req, res) => {
    try {

        const {pseudo, password} = req.body;
        const profil = await ProfileModel.findOne({pseudo : pseudo});
        if( profil != null){
            const isPasswordCorrect = await bcryptjs.compare(
                password,
                profil.password
            );
            if (!isPasswordCorrect) {
                return res.json({boolean : false, cause: "password"});
            }else{
                return res.json({boolean : true});
            }
        }
        return res.json({boolean : false, cause: "pseudo"});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}