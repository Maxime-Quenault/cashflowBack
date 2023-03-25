import TransactionModel from "../models/transaction.model.js";

export const addTransaction = async (req, res) => {
    try{
        const {title, value, category, dateOfTransaction, _idProfile} = req.body;

        let transaction = new TransactionModel({
            title,
            value,
            category,
            dateOfTransaction,
            _idProfile
        });

        await transaction.save();
        return res.json({msg : "it's ok !"});
    } catch(e){
        res.status(500).json({error: e.message, msg: "it's not ok .."});
    }
}

export const getAllTransactionByIdProfile = async (req, res) => {
    try{
        const {_idProfile} = req.body;

        TransactionModel.find({_idProfile: _idProfile},
            (err, listOfTransaction))
                .then((listOfTransaction) =>{
                    return res.json({listOfTransaction});
                })
                .catch((err) =>{
                    console.error(err);
                    return res.status(500).json({ error: 'Une erreur s\'est produite lors de la recherche des transactions.' });
                });
                

    }catch(e){
        return res.status(500).json({error: e.message});
    }
}


