import Application from "../models/appModel.js";

export const create = async(req, res) => {
    try {
        const newApp = new Application(req.body);
        const {jobID, position} = newApp;

        const appExists = await Application.findOne({jobID, position});
        if(appExists) {
            return res.status(409).json({
                message: "An application with the same job ID and position name already exists.",
                requiresConfirmation: true
            });
        }
        const savedApp = await Application.create(req.body);
        res.status(200).json(savedApp);
    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
};