import Application from "../models/appModel.js";

export const makeUserApp = async(req, res) => {
    try {
        const newApp = new Application(req.body);
        const { userID, jobID, position } = newApp;

        const appExists = await Application.findOne({ userID, jobID, position });
        if(appExists) {
            return res.status(409).json({
                message: "An application with the same job ID and position name already exists.",
                requiresConfirmation: true
            });
        }
        const savedApp = await Application.create(req.body);
        
        res.status(200).json(savedApp);
    } catch (error) {
        res.status(500).json({ errorMessage:error.message });
    }
};

export const getUserApps = async(req, res) => {
    try {
        const userID = req.user.id;
        const applications = await Application.find({ userID });

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ errorMessage:error.message });
    }
};

export const delUserApp = async(req, res) => {
    try {
        const { appID } = req.body;
        const delApp = await Application.findOneAndDelete({ _id: appID, userID: req.user.id });

        res.status(200).json({ message: `Your entry for ${ delApp.position } at ${ delApp.company } has been deleted.` });
    } catch (error) {
        res.status(500).json({ errorMessage:error.message });
    }
};