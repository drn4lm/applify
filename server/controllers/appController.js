import Application from "../models/appModel.js";
import { pickField } from "../utils/pickField.js";

/*--ENDPOINT: Create user applications--*/
export const makeUserApp = async(req, res) => {
    try {
        const { jobID, position } = req.body;

        const appExists = await Application.findOne({ userID: req.user.id, jobID, position });
        if(appExists) {
            return res.status(409).json({
                message: "An application with the same job ID and position name already exists.",
                requiresConfirmation: true
            });
        }
        const savedApp = await Application.create({ ...req.body, userID: req.user.id });
        
        res.status(200).json(savedApp);
    } catch (error) {
        res.status(500).json({ errorMessage:error.message });
    }
};

/*--ENDPOINT: Retreive user applications--*/
export const getUserApps = async(req, res) => {
    try {
        const userID = req.user.id;
        const applications = await Application.find({ userID });

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ errorMessage:error.message });
    }
};

/*--ENDPOINT: Delete user applications--*/
export const delUserApp = async(req, res) => {
    try {
        const { appID } = req.body;
        const delApp = await Application.findOneAndDelete({ _id: appID, userID: req.user.id });

        res.status(200).json({ message: `Your entry for ${ delApp.position } at ${ delApp.company } has been deleted.` });
    } catch (error) {
        res.status(500).json({ errorMessage:error.message });
    }
};

/*--ENDPOINT: Update individual fields of user applications--*/
export const editUserApp = async(req, res) => {
    try {
        const { appID } = req.body;
        const allowedFields = ["jobID", "position", "company", "status", "date"];
        const updates = pickField(req.body, allowedFields);
        const updatedApp = await Application.findOneAndUpdate({ _id: appID, userID: req.user.id }, updates, { new: true, runValidators: true });

        res.status(200).json(updatedApp);
    } catch (error) {
        res.status(500).json({ errorMessage:error.message });
    }
};