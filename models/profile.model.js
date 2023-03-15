import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
    {
        pseudo: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim: true },
        psse: { type: String, required: true },
        dateCreated: { type: Date, default: Date.now },
    },
    {
        collection: 'profiles',
        versionKey: false
    }, { timestamps: true }
)

export default mongoose.model("Profiles", profileSchema);