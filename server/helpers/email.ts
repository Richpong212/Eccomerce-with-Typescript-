import nodemailer from 'nodemailer';
import dev from '../config';

interface EmailData {
    email: string;
    subject: string;
    html: string;
}

export const sendVerificationEmail = async (emailData: EmailData) => {
    try {    
   
    
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, f alse for other ports
          auth: {
            user: dev.app.authEMAIL, // generated ethereal user , 
            pass: dev.app.authPASSWORD, 
          },
        });
  
        const mailOptions = {
          from: dev.app.authEMAIL, // sender address
          to: emailData.email, // list of receivers
          subject: emailData.subject, // Subject line
          html: emailData.html, // html body
        };
    
      
          transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(err);
            }else{
              console.log("Message sent: %s", info.response);  
            }
         }); 
      
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
      } catch (error) {
        console.log(error);
      }
}