import { Request, Response } from "express";
import { hash } from "../helpers/security"
import { phoneChecker, emailChecker, isObjEmpty, idChecker } from "../helpers/validations";
import { User } from "../types";
import userModel from "../models/user";
const unexpectedError = { "Error": "An unexpected error has occurred. Please try the operation again, if it persists contact us." }

module.exports = {
    async create(req: Request, res: Response) {

        if (
            "firstName" in req.body &&
            "lastName" in req.body &&
            "phone" in req.body &&
            "email" in req.body &&
            "password" in req.body &&
            "tosAgreement" in req.body
        ) {
            const { body } = req;

            if (body.firstName === "" || body.lastName === "")
                return res.status(400).send({ "Error": "firstName and lastName fields cannot be blank" });

            if (!body.tosAgreement)
                return res.status(400).send({ "Error": "User must agree with the Terms of Service Agreement" });

            if (!phoneChecker(body.phone))
                return res.status(400).send({ "Error": "Invalid Internacional phone number" });

            if (!emailChecker(body.email))
                return res.status(400).send({ "Error": "Invalid email" })

            body.firstName = body.firstName.toLowerCase();
            body.lastName = body.lastName.toLowerCase();
            body.email = body.email.toLowerCase();
            body.password = await hash(body.password as string);

            try {
                const document = new userModel(body);
                const userSaved: User = await document.save();
                userSaved.password = undefined;
                res.status(201).send(userSaved);

            } catch (err) {
                return res.status(400).send({ "Error": "Duplicated field", "details": err.errors });
            }
        } else {
            return res.status(400).send({ "Error": "Missing required fields" });
        }

    },
    async getOne(req: Request, res: Response) {
        const { query } = req;
        if ("_id" in query) {

            if (!idChecker(query._id as string))
                res.status(400).send({ "Error": "Invalid ID" });

            userModel.findById(query._id, (error: any, user: User) => {

                if (error) {
                    console.error(error);
                    return res.status(500).send(unexpectedError);
                }

                if (user) {
                    user.password = undefined;
                    return res.status(200).send(user);
                }
                else
                    return res.status(404).send({ "Message": "User not found" });
            })
        }
        else
            if ("email" in query) {

                if (!emailChecker(query.email as string))
                    return res.status(400).send({ "Error": "Invalid email" });

                userModel.findOne({ 'email': query.email }, (error: any, user: User) => {

                    if (error) {
                        console.error(error);
                        return res.status(500).send(unexpectedError)
                    }

                    if (user)
                        return res.status(200).send(user);
                    else
                        return res.status(404).send({ "Message": "User not found" });
                })
            }
            else
                if ("phone" in query) {

                    const phone = decodeURIComponent(req.query.phone as string);

                    if (!phoneChecker(query.phone as string))
                        return res.status(400).send({ "Error": "Invalid Internacional phone number" });

                    userModel.findOne({ 'phone': phone }, (error: any, user: any) => {
                        if (error) {
                            console.error(error);
                            res.status(500).send(unexpectedError)
                        }

                        if (user)
                            res.status(200).send(user);
                        else
                            res.status(404).send({ "Error": "User not found" });
                    })
                }
                else {
                    res.status(400).send({
                        "Error": "Missing required params"
                    })
                }
    },
    async deleteOne(req: Request, res: Response) {
        const { query } = req;
        if ("_id" in query) {

            if (!idChecker(query._id as string))
                res.status(400).send({ "Error": "Invalid ID" });

            userModel.deleteOne({ "_id": query._id }, (error: any, result: any) => {

                if (error) {
                    console.error(error);
                    return res.status(500).send(unexpectedError);
                }
                if (result.ok === 1 && result.deletedCount === 1)
                    res.status(200).send({ "Message": "Successful deleted " })

                else
                    res.status(404).send({ "Error": "User not found" });
            })

        } else
            if ("email" in query) {
                if (!emailChecker(query.email as string))
                    return res.status(400).send({ "Error": "Invalid email" });

                userModel.deleteOne({ "email": query.email }, (error: any, result: any) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send(unexpectedError);
                    }
                    if (result.ok === 1 && result.deletedCount === 1)
                        res.status(200).send({ "Message": "Successful deleted " })
                    else
                        res.status(404).send({ "Error": "User not found" });
                })
            }
            else
                if ("phone" in query) {

                    const phone = decodeURIComponent(req.query.phone as string);

                    if (!phoneChecker(query.phone as string))
                        return res.status(400).send({ "Error": "Invalid Internacional phone number" });

                    userModel.deleteOne({ "phone": phone }, (error: any, result: any) => {
                        if (error) {
                            console.error(error);
                            res.status(500).send(unexpectedError);
                        }
                        if (result.ok === 1 && result.deletedCount === 1)
                            res.status(200).send({ "Message": "Successful deleted " })
                        else
                            res.status(404).send({ "Error": "User not found" });
                    })
                }
    },
    async updateOne(req: Request, res: Response) {
        if (!isObjEmpty(req.body) && !isObjEmpty(req.query)) {
            const { body, query } = req;
            const filter: any = {};

            if ("_id" in query) {
                filter._id = query._id;
            } else
                if ("email" in query) {
                    if (!emailChecker(query.email as string))
                        return res.status(400).send({ "Error": "Invalid email" });
                    filter.email = (query.email as string).toLowerCase();
                } else
                    if ("phone" in query) {
                        const phone = decodeURIComponent(query.phone as string);
                        if (!phoneChecker(phone as string))
                            return res.status(400).send({ "Error": "Invalid Internacional phone number" });
                        filter.phone = phone;
                    } else {
                        res.status(400).send({ "Error": "Missing query params" });
                    }

            const update: any = {};

            if ("firstName" in body)
                update.firstName = (body.firstName as string).toLowerCase();

            if ("lastName" in body)
                update.lastName = (body.lastName as string).toLowerCase();

            if ("phone" in body) {
                if (!phoneChecker(body.phone as string))
                    return res.status(400).send({ "Error": "Invalid Internacional phone number" });
                update.phone = body.email;
            }
            if ("email" in body) {
                if (!emailChecker(body.email as string))
                    return res.status(400).send({ "Error": "Invalid email" });
                update.email = body.email;
            }
            if ("password" in body)
                update.password = await hash(body.password as string);

            update.updatedAt = new Date;

            userModel.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true, 
                rawResult: true
            }, (error: any, updated: any) => {
                if (error) {
                    console.error(error);
                    res.status(500).send(unexpectedError);
                }
                if (updated) {
                    res.status(200).send(updated.value);
                } else {
                    res.status(404).send({ "Error": "User not found" });
                }
            })
        } else
            res.status(400).send({ "Error": "At least 1 query param and 1 filed in the body must be specified" });
    }
}
