import { v4 as uuid } from 'uuid';
import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

config();

export function RandomString() {
    let a = uuid().toString();
    let b = uuid().toString();
    a = a.replaceAll('-', String.fromCharCode(97 + parseInt(Math.random() * 10)));
    b = b.replaceAll('-', String.fromCharCode(97 + parseInt(Math.random() * 10)));
    const c = a + b;
    return c;
}

// type = 0 for Email Confirmation and type = 1 for Password reset
export async function SendEmail(uname, uEmail, url, type) {

    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.TASKKO_ACC,
            pass: process.env.ACC_PASS
        }
    }));

    try {
        const sub = (type) ? "[Taskko] Please Reset you password" : "[Taskko] Please Verify your email";
        const message = (type) ? `Hello ${uname},\nTo reset your Taskko account password, please visit below link \n ${url}` : `Hello ${uname},\nTo continue creating your new Taskko account, please verify your email account below \n ${url}`;

        const mailOptions = {
            from: process.env.TASKKO_ACC,
            to: uEmail,
            subject: sub,
            text: message
        };

        const status = await transporter.sendMail(mailOptions);
        return (status.rejected.length === 0);// if rejected.length is zero then, this will return true meaning eamil send successfully otherwise false
    }
    catch (err) {
        console.log(`Could not send an email to`, uname);
        console.log(err);
        return false;
    }
    finally {
        transporter.close();
    }
}