

var _mailer = require('nodemailer');

let _transporter = _mailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vtt.app.1@gmail.com', 
        pass: '!@vtt.app.1'         
    },
    debug: true
});


var email = {};

email.send = function (file, name) {
    let message = {
        from: 'Logo Questionnaire <vtt.app.1@gmail.com>',
        to: 'joenil@influex.com',
        subject: 'Logo Questionnaire Document',
        text: 'Attached File is the Logo Questionnaire survey result.',
        attachments: [
            {
                filename: name,
                path: file
            }
        ]
    }

    _transporter.sendMail(message, (error, info)=> {
        if (error) {
            console.log('Error occurred', error);
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
        transporter.close();
    });

}

module.exports = email;