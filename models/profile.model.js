import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
    {
        pseudo: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim: true },
        devise: { type: String, required: true },
        solde: { type: Number, required: true}
    },
    {
        collection: 'profiles',
        versionKey: false
    }, { timestamps: true }
)

export default mongoose.model("Profiles", profileSchema);