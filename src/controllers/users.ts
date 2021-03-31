import { Request, Response } from "express";
import { hash } from "../helpers/security"
import { phoneChecker, emailChecker } from "../helpers/validations";
import { User, instanceOfUser } from "../types";
import userModel from "../models/user";

module.exports = {
    async create(req: Request, res: Response) {

        if (instanceOfUser(req.body)) {
            const userData: User = req.body;

            if (userData.firstName === "" || userData.lastName === "")
                return res.status(400).send({ "Error": "firstName and lastName fields cannot be blank" });

            if (!userData.tosAgreement)
                return res.status(400).send({ "Error": "User must agree with the Terms of Service Agreement" });

            if (!phoneChecker(userData.phone))
                return res.status(400).send({ "Error": "Invalid Internacional phone number" });

            if (!emailChecker(userData.email))
                return res.status(400).send({ "Error": "Invalid email" })

            userData.firstName = userData.firstName.toLowerCase();
            userData.lastName = userData.lastName.toLowerCase();
            userData.email = userData.email.toLowerCase();

            userData.password = await hash(userData.password);

            try {
                const user = new userModel(userData);
                const userSaved = await user.save();
                userSaved.password = undefined;
                res.status(201).send(userSaved);

            } catch (err) {
                return res.status(400).send({ "Error": "Duplicated field", "details": err.errors });
            }
        } else {
            return res.status(400).send({ "Error": "Missing required fields" });
        }

    }
}
