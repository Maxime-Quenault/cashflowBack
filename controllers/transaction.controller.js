import TransactionModel from "../models/transaction.model.js";

export const addTransaction = async (req, res) => {
    try{
        const {title, value, category, dateOfTransaction, pseudoProfile} = req.body;

        let transaction = new TransactionModel({
            title,
            value,
            category,
            dateOfTransaction,
            pseudoProfile
        });

        await transaction.save();
        const listOfTransaction = await TransactionModel.find({pseudoProfile: pseudoProfile});
        return res.json({listOfTransaction});
    } catch(e){
        res.status(500).json({error: e.message, msg: "it's not ok .."});
    }
}

export const getAllTransactionByIdProfile = async (req, res) => {
    try{
        const {pseudoProfile} = req.body;

        const listOfTransaction = await TransactionModel.find({pseudoProfile: pseudoProfile});
        return res.json({listOfTransaction});
    }catch(e){
        return res.status(500).json({error: e.message});
    }
}

export const updateTransaction = async (req, res) =>{
    try{
        const {_id} = req.body;

        const transaction = await TransactionModel.findById(_id)
        return res.json({transaction});;
    } catch(e){
        return res.status(500).json({error: e.message});
    }
}


