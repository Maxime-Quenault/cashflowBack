import ProfileModel from "../models/profile.model.js";
import bcryptjs from "bcryptjs";

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

        res.json({ user, token });
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
        await  ProfileModel.deleteOne({pseudo : pseudo});
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

        bcryptjs.compare(password, profil.password, function(err, res) {
            if (res) {
                res.json({isOk : true});
            } else {
                res.json({isOk : false});
            }
        });
        res.json({ msg: "erreur dans la comparaison" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Cette methode permet de mettre à jour le password d'un utilisateur.
 * @param {*} req 
 * @param {*} res 
 */
export const updatePassword = async (req, res) =>{
    try{
        const {pseudo, newPassword} = req.body;
        const profil = await ProfileModel.findOne({pseudo : pseudo});

        const hashedPassword = await bcryptjs.hash(newPassword, 8);
        profil.password = hashedPassword;
        await profil.save();
        res.json({ msg: "mdp modifié" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

/**
 * Cette methode permet de modifier les valeurs benines d'un utilisateur (devise, solde)
 * @param {*} req 
 * @param {*} res 
 */
export const updateProfile = async (req, res) => {
    try {
        const {pseudo, devise, solde} = req.body;
        const profil = await ProfileModel.findOne({pseudo : pseudo});

        profil.devise = devise;
        profil.solde = solde;

        await profil.save();
        res.json({ msg: "Compte modifié" });
    }catch (e) {
        res.status(500).json({ error: e.message });
    }
}