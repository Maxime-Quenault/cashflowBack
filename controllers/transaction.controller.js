import TransactionModel from "../models/transaction.model.js";

export const addTransaction = async (req, res) => {
    try{
        const {title, value, category, date, _idProfil} = req.body;

        let transaction = new TransactionModel({
            title,
            value,
            category,
            date,
            _idProfil
        });

        await TransactionModel.bulkSave(transaction);
        return res.json({msg : "it's ok !"});
    } catch(e){
        res.status(500).json({error: e.message, msg: "it's not ok .."});
    }
};


