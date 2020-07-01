const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Module = mongoose.model('Module');

module.exports.addModule = (req, res, next) => {
    console.log(req.body)
    var module = new Module();
    module.name = req.body.name;
    module.description = req.body.description;
    module.userId = req.body.userId;
    module.save((err, doc) => {
        if (!err) {
            console.log("Record inserted: ", doc)
            return res.status(200).json({ modules: doc });

        } else {
            if (err.code == 11000) {
                console.log(err)
                res.status(422).send(['It was not possible to add the module.']);
            }
            else
                return next(err);
        }

    });
}


module.exports.findModule = (req, res, next) => {
    Module.find({}, 'title description').exec(function (err, module) {
        if (!module) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'module record not found.' });
        } else {
            console.log("Module found: ", module);
            return res.status(200).json({ modules: module });
        }
    }
    );
}

module.exports.existingModules = (req, res, next) => {
    console.log(req.params['userId'])
    Module.find({ userId: req.params['userId'] }).exec(function (err, module) {
        if (!module) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'module record not found.' });
        } else {
            console.log("Module found: ", module);
            return res.status(200).json({ modules: module });
        }
    }
    );
}

module.exports.findByName = (req, res, next) => {
    console.log(decodeURI(req.params['name']))
    Module.find({ name: decodeURI(req.params['name']) }).exec(function (err, module) {
        if (!module) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'module record not found.' });
        } else {
            console.log("Module found: ", module);
            return res.status(200).json({ modules: module });
        }
    }
    );
}


module.exports.editModuleById = (req, res, next) => {
    console.log("yo");
    console.log(req.body);
    Module.findOneAndUpdate({ _id: req.params['id'] }, {title: req.body.title, description: req.body.description}).exec(function (err, module) {
        if (!module) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'module record not found.' });
        } else {
            console.log("Module Edited: ", module);
            return res.status(200).json({ modules: module });
        }
    });
}


module.exports.deleteModuleById = (req, res, next) => {
    Module.findOneAndDelete({ _id: req.params['id'] }).exec(function (err, module) {
        if (!module) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'module record not found.' });
        } else {
            console.log("Module deleted: ", module);
            return res.status(200).json({ modules: module });
        }
    }
    );
}