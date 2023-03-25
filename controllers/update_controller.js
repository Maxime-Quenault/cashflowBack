import ProfileModel from "../models/profile.model.js";
import bcryptjs from "bcryptjs";

/**
 * Cette methode permet de mettre à jour le password d'un utilisateur.
 * @param {*} req 
 * @param {*} res 
 */
export const updatePassword = async (req, res) =>{
    try{
        const {pseudo, password} = req.body;
        const profil = await ProfileModel.findOne({pseudo : pseudo});

        const hashedPassword = await bcryptjs.hash(password, 8);
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