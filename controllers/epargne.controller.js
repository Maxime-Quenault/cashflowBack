import epargneModel from "../models/epargne.model.js";

export const addEpargne = async (req, res) => {
    try{
        const {title, objective, dateStart, nbDays, sum, pseudoProfile} = req.body;

        let epargne = new epargneModel({
            title,
            objective,
            dateStart,
            nbDays,
            sum,
            pseudoProfile
        });

        await epargne.save();
        const listOfEpargne = await epargneModel.find({pseudoProfile: pseudoProfile});
        return res.json({listOfEpargne});
    } catch(e){
        res.status(500).json({error: e.message});
    }
}

export const getAllEpargneByProfile = async (req, res) => {
    try{
        const {pseudoProfile} = req.body;

        const listOfEpargne = await epargneModel.find({pseudoProfile: pseudoProfile});
        return res.json({listOfEpargne});
    }catch(e){
        return res.status(500).json({error: e.message});
    }
}

export const updateEpargne = async (req, res) =>{
    try{
        const {_id, title, objective, dateStart, nbDays, sum, pseudoProfile} = req.body;
        const epargne = await epargneModel.findById(_id);

        epargne.title = title;
        epargne.objective = objective;
        epargne.dateStart = dateStart;
        epargne.nbDays = nbDays;
        epargne.sum = sum;
        
        await epargne.save(); 

        const listOfEpargne = await epargneModel.find({pseudoProfile: pseudoProfile});
        return res.json({listOfEpargne});
    } catch(e){
        return res.status(500).json({error: e.message});
    }
}

export const deleteEpargne = async (req, res) =>{
    try{
        const{_id, pseudoProfile} = req.body;
        await epargneModel.findByIdAndDelete(_id);

        const listOfEpargne = await epargneModel.find({pseudoProfile: pseudoProfile});
        return res.json({listOfEpargne});
    } catch(e){
        return res.status(500).json({error: e.message});
    }
}