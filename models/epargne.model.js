import mongoose from 'mongoose';

const plansEpargneSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, trim: true},
        objective: {type: Number, required: true},
        dateStart: {type: String, required: true},
        nbDays: {type: Number, required: true},
        sum: {type: Number, required: true},
        pseudoProfile: {type: String, required: true, trim: true}
    },
    {
        collection: 'plansEpargne',
        versionKey: false
    },
    {
        timestamps: true
    }
)

export default mongoose.model("plansEpargne", plansEpargneSchema);