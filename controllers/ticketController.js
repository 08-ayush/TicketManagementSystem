const Model = require('../models/ticketModel.js');

class TicketController{

    static showDashboard = (req, res) => {
        if( !req.session.isUser )
        {
            res.redirect('/userlogin');
            return;
        }
        res.render('ticket', {message:null});
    }

    static showEditDashboard = (req, res) => {
        if( !req.session.isUser )
        {
            res.redirect('/userlogin');
            return;
        }
        res.render('editTicket', {message:null});
    }

    static showIdDashboard = (req, res) => {
        if( !req.session.isUser )
        {
            res.redirect('/userlogin');
            return;
        }
        res.render('idInput', {message:null});
    }

    static showDeleteDashboard = (req, res) => {
        if( !req.session.isUser )
        {
            res.redirect('/userlogin');
            return;
        }
        res.render('deleteTicket', {message:null});
    }

    static getTicketDetails = async (req,res) => {
        if( !req.session.isUser )
        {
            res.redirect('/userlogin');
            return;
        }
        try {
            const result = await Model.TicketModel.findById(req.body.ticketid);
            console.log(result)
            if( result ) res.render('ticketDetails', {data:result});
            
        } catch (error) {
            console.log(error)
        }
    }


    static editTicket = async (req, res) => {
        if( !req.session.isUser && !req.session.isResolver  )
        {
            res.redirect('/userlogin');
            return;
        }
        try {
            const ticketId = req.body.ticketId;
    
            const { title, description, priority, department, status } = req.body;
            const updatedDoc = {
                title,
                description,
                priority,
                department,
                status
            }
            const result = await Model.TicketModel.findByIdAndUpdate(ticketId,updatedDoc );
            console.log(result);
            
            if( req.session.isUser  )
               res.render('ticket', {message: "Successfully updated your ticket and your ticket id is " + (result._id).toString()  } );
            else 
              res.status(200).send({success:'true'})
                
        } catch (error) {
            console.log(error)
        }
    }

    static deleteTicket = async (req,res) => {
        if( !req.session.isUser && !req.session.isAdmin )
        {
            res.redirect('/userlogin');
            return;
        }
        try {
            const ticketID = req.body.ticketId;
            const result = await Model.TicketModel.findByIdAndDelete(ticketID);

            if( req.session.isUser )
            {
                if(result ) res.render('ticket', {message: "Successfully deleted your raised ticket" } );
            }
            else{
                res.status(200).send({result:'true'});
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    static raiseTicket = async(req,res) => {
        if( !req.session.isUser )
        {
            res.redirect('/userlogin');
            return;
        }
        try {
            const ticket = {
                title: req.body.title,
                description: req.body.description,
                priority: req.body.priority,
                department: req.body.department,
                status: 'PENDING'
            }
            const result = await Model.TicketModel.create(ticket);
            console.log(result._id);

            res.render('ticket', {message: "Successfully Raised your ticket and your ticket id is " + (result._id).toString()  } );
        } catch (error) {
            console.log(error)
        }
    }

    static getAllTickets = async( req, res ) => {
        try {
            if( !req.session.isAdmin )
             {
                return;
             }

            const data = await Model.TicketModel.find();
            console.log(data)
            res.status(200).send(data);
        } catch (error) {
            console.log(error)
        }
    }

    static getDeptTickets = async( req, res ) => {

        try {
            const result = await Model.TicketModel.find({department:req.session.department });
            console.log(result );
            res.status(200).send(result);
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = {
    TicketController
};