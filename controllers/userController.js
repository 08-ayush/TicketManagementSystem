const Model = require('../models/userModel.js')
const bcrypt = require('bcryptjs')
const TModel = require('../models/ticketModel.js')
class UserController {

    static getLogin = (req,res) => {
        res.render('userLogin',{message:null});
    }

    static getSignup = (req,res) => {
        res.render('userSignup', {message:null})
    }

    static createUser = async( req, res ) => {

        try {

            const isExist = await Model.UserModel.findOne({username:req.body.username});
            if( isExist ) { 
                res.render('userSignup', {message:'Username already taken'})
                return;
            }

            const hash = await bcrypt.hash(req.body.password, 10)
            const doc = {
                username: req.body.username,
                password: hash
            }
    
            const result = await Model.UserModel.create(doc);
            console.log(result);
            res.redirect('/userlogin');
        } catch (error) {
            console.log(error)
        }
    }

    static checkValidity = async( req, res ) => {
        try {
            const result = await Model.UserModel.findOne({username:req.body.username});

            if( result && await bcrypt.compare(req.body.password, result.password) )
            {
                req.session.isUser = true;
                req.session.isAdmin = false;
                req.session.isResolver = false;
                req.session.username = req.body.username;
                res.redirect('/ticket');
                return;
            }
            else{
                res.render('userLogin',{message:'Invaid User Credentials'} );
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    static getAdmin = (req,res) => {
        res.render('adminLogin', {message:null});
    }

    static checkAdmin = async( req, res ) => {
        try {
            const result = await Model.UserModel.findOne({username:req.body.username});

            if( result && await bcrypt.compare(req.body.password, result.password) )
            {
                req.session.isUser = false;
                req.session.isAdmin = true;
                req.session.username = 'admin';
                req.session.isResolver = false;

                
                res.render('adminDashboard');
                return;
            }
            else{
                res.render('adminLogin',{message:'Invaid User Credentials'} );
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    static getAdminDashboard = async( req,res ) => {
        if( !req.session.isAdmin )
        {
            res.redirect('/adminlogin');
            return;
        }

        res.redirect('adminlogin/admindashboard');
    }
}

module.exports = {
    UserController
}