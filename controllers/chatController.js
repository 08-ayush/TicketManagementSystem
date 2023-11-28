class ChatController {

    static chatDashboard = (req,res) => {
        if( !req.session.isUser && !req.session.isResolver )
        {
            res.redirect('/userlogin');
            return;
        }
        res.render('chat');
    }
}

module.exports = {
    ChatController
}