const Model = require('../models/resolverModel.js')
const bcrypt = require('bcryptjs')

class ResolverController {

    static getLogin = ( req, res ) => {

        res.render('resolverLogin',{message:null });
    }

    static getSignup = (req, res ) => {

        if( !req.session.isAdmin )
        {
            res.redirect('/adminlogin');
            return;
        }
        res.render('resolverSignup',{message:null});
    }

    static createResolver = async (req,res) => {
        
        if( !req.session.isAdmin )
        {
            res.redirect('/adminlogin');
            return;
        }

        try {

            const isExist = await Model.ResolverModel.findOne({username:req.body.username});
            if( isExist ) { 
                res.render('resolverSignup', {message:'Username already taken'})
                return;
            }

            const hash = await bcrypt.hash(req.body.password, 10)
            const doc = {
                username: req.body.username,
                password: hash,
                department: req.body.department
            }
    
            const result = await Model.ResolverModel.create(doc);
            console.log(result);
            res.redirect('/resolver/login');
        } catch (error) {
            console.log(error)
        }
    }

    static checkValidResolver = async( req, res ) => {

        try {
            const result = await Model.ResolverModel.findOne({username:req.body.username});

            if( result && await bcrypt.compare(req.body.password, result.password) )
            {
                req.session.isResolver = true;
                req.session.isAdmin = false;
                req.session.isUser = false;
                req.session.username = req.body.username;
                req.session.department = req.body.department;
                res.redirect('/resolver/resolverdashboard');
                return;
            }
            else{
                res.render('resolverLogin',{message:'Invaid User Credentials'} );
                return;
            }
        } catch (error) {
            console.log(error);
        }

    }

    static getDashboard = (req, res) => {
        if( !req.session.isResolver )
        {
            res.redirect('/resolver/login')
            return;
        }
        res.render('resolverDashboard');
    }
}

module.exports = {
    ResolverController
}