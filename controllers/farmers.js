const Farmer = require('../models/Farmers');
const { errorResponse } = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');


//@desc create a database
//@route GET /api/v1/farmers/createDatabase
//@access Public
exports.createDatabase = asyncHandler(async (req, res, next) => { 
    const database = 'bjcjotrusqwez1uwbfl0'; //the db name was manually assigned from the cloud database
    await Farmer.createDatabase(database);
    res.status(200).json({
        success: true,
        message: 'Database created'
    });
});


//@desc create a table
//@route GET /api/v1/farmers/createTable
//@access Public
exports.createTable = asyncHandler(async (req, res, next) => { 
    await Farmer.createTable();
    res.status(200).json({
        success: true,
        message: 'Table created'
    });
});


//@desc create a farmer
//@route POST /api/v1/farmers
//@access Public
exports.createFarmer = asyncHandler(async (req, res, next) => { 
    const {first_name, last_name, phone_number, age, address,crops} = req.body;
    await Farmer.createFarmer({first_name, last_name, phone_number, age, address,crops});
    res.status(200).json({
        success: true,
        message: 'Farmer inserted'
    });
});


//@desc get all farmers
//@route GET /api/v1/farmers
//@access Public
exports.getFarmers = asyncHandler(async (req, res, next) => { 
    const attributes = req.query.attributes;
    const filter = req.query.filter;
    const farmers = await Farmer.getFarmers(attributes, filter);
    res.status(200).json({
        success: true,
        message: 'Farmers retrieved',
        data: farmers
    });
});