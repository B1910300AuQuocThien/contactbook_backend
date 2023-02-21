const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const ContactService = require("../services/contact.service");
const { ObjectId } = require("mongodb");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        console.log(document);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `error retrieving contact with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "data to update can no be empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        }
        return res.send({ message: "contact was update successfuly" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `error updating contact with id = ${req.params.id}`
            )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        }
        return res.send({ message: "contact was delete successfuly" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `could not delete contact with id=${req.params.id}`
            )
        );
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `an error while retrieving favorite contact`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({
            message: `${deleteCount} contact were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "an error occurred while removing all contacts")
        );
    }
};
