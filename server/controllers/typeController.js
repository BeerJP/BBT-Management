const Type = require('../models/type');


const createType = async (typeData) => {
    try {
        const type = await Type.create(typeData);
        return "Type was created";
    } catch (error) {
        console.error(error);
        throw new Error('Unable to create type.');
    }
};

const getAllType= async () => {
    try {
        const types = await Type.findAll();
        return types;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch types.');
    }
};

const getTypeById = async (typeId) => {
    try {
        const type = await Type.findByPk(typeId);
        return type;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch type.');
    }
};

module.exports = { createType, getAllType, getTypeById };