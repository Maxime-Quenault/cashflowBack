import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        value: {type: Number, required: true},
        title: {type: String, required: true, trim: true},
        category: {type: String, required: true, trim: true},
        dateOfTransaction: {type: String, required: true, trim: true},
        pseudoProfile: {type: String, required: true, trim: true}
    },
    {
        collection: 'transactions',
        versionKey: false
    },
    {
        timestamps: true
    }
)

export default mongoose.model("transactions", transactionSchema);