const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');

const shift = require('../models/shifts/Shift');
const user = require('../models/users/User');


//AddShifts
exports.addShifts = async (req, res) => {

    try {

        let shifts = new shift(req.body);
        await shifts.save();
        res.json({ msg: 'Turno Guardado', shifts });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};

// Lista Turnos Solicitados
exports.listShifts = async (req, res) => {

    let { page, limit } = req.query;
    console.log(limit);
    console.log(page);
    const shifts = await shift.find();

    shift.aggregate(
        [
            {
                $lookup:
                {
                    from: 'species',
                    localField: 'specie',
                    foreignField: '_id',
                    as: 'species'
                }
            },
            {
                $sort: { date: -1, state: 1 }
            },
            {
                $lookup:
                {
                    from: 'specialities',
                    localField: 'speciality',
                    foreignField: '_id',
                    as: 'specialitys'
                }
            },
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'users'
                }
            },
        ],

        function (err, data) {

            if (err)
                throw err;
            res.json({
                data,
                totalPages: Math.ceil(shifts.length / limit),
                currentPage: page,
                success: true
            });
        }
    )
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();
};


//Listar Shifts Por Id
exports.listShiftsByUsr = async (req, res) => {

    let { page, limit } = req.query;
    const users = await user.findById(req.params.id);
    const shifts = await shift.find({ user: users._id });

    if (!users) {
        res.status(400).json({ msg: 'La Categoria no existe.' });
    }

    shift.aggregate(
        [
            {
                $match: {
                    user: users._id
                }
            },
            {
                $sort: { date: -1, state: 1 }
            },
            {
                $lookup:
                {
                    from: 'species',
                    localField: 'specie',
                    foreignField: '_id',
                    as: 'species'
                }
            },
            {
                $lookup:
                {
                    from: 'specialities',
                    localField: 'speciality',
                    foreignField: '_id',
                    as: 'specialitys'
                }
            },
        ],

        function (err, data) {

            if (err)
                throw err;

            res.json({
                data,
                totalPages: Math.ceil(shifts.length / limit),
                currentPage: page,
                success: true
            });
        }
    )

        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();
};

exports.editShifts = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'EL turno no existe' });
        }

        let shiftedit = await shift.findById(req.params.id);
        if (!shiftedit) {
            return res.status(404).json({ msg: 'El turno no existe.' });
        }

        shiftedit = await shift.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({ msg: 'El turno fue actualizado.', shiftedit });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};


exports.listShiftsbydatetime = async (req, res) => {

    var date = new Date(req.params.date + "T00:00:00.000Z");
    var time = req.params.time;

    console.log(date);
    console.log(time);

    shift.aggregate(
        [
            {
                $match: {
                    dateshifts: date,
                    timeshifts: time,
                    state: false
                }
            },
            {
                $lookup:
                {
                    from: 'species',
                    localField: 'specie',
                    foreignField: '_id',
                    as: 'species'
                }
            },
            {
                $lookup:
                {
                    from: 'specialities',
                    localField: 'speciality',
                    foreignField: '_id',
                    as: 'specialitys'
                }
            },
        ],

        function (err, data) {

            if (err)
                throw err;
            res.json({ data, success: data.length > 0 });
        }
    )
};
