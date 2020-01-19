const userData = require('../constants/support'),
    db = require('src/helpers/db');
const Support = db.Support;
const nodemailer = require('nodemailer');


const sendEmail = async(params) => {
    const message = new Support(params);

    await message.save();
    try {
        const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: userData.EMAIL,
                    pass: userData.PASSWORD,
                },
            }),

            mailOptions = {
                from: userData.EMAIL,
                to: userData.EMAIL,
                subject: 'I need help!',
                html: `<p><b>email:</b> ${params.email}</p><p><b>message:</b> ${params.message}</p>`,
            };

        return await transporter.sendMail(mailOptions);
    } catch (e) {
        throw { message: 'Cannot send email' };
    }
};

module.exports = { sendEmail };
