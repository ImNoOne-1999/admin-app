const nodemailer = require('nodemailer'); 
  
  
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'eladtraining@gmail.com', 
        pass: '1234'
    } 
}); 
  
let mailDetails = { 
    from: 'eladtraining@gmail.com', 
    to: 'abc@gmail.com', 
    subject: 'Test mail', 
    text: 'Node.js testing mail for GeeksforGeeks'
}; 
  
mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        console.log('Error Occurs'); 
    } else { 
        console.log('Email sent successfully'); 
    } 
}); 