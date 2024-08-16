require('dotenv').config();
import nodemailer from 'nodemailer';


let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: '"Booking salon and spa" <dohoanminhnam429@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch dịch vụ Salon and Spa", // Subject line
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmailBill = (dataSend) => {
    let res = '';
    if(dataSend.language === 'en') {
        res = `
            <h3>Dear ${dataSend.customerName}</h3>
            <p>You have received this email because you have booked a service on the Booking Salon and Spa Website</p>
            <p>Bill information:</p>
            <p>If you have any questions please contact the business.</p>
            <div>Thank you</div>
        `
    }
    if(dataSend.language === 'vi') {
        res = `
            <h3>Xin chào ${dataSend.customerName}</h3>
            <p>Bạn đã nhận được email này vì đã đặt lịch dịch vụ trên Website Booking Salon and Spa</p>
            <p>Thông tin hóa đơn đính kèm bên dưới </p>
            <p>Nếu có thắc mắc xin vui lòng liên hệ cơ sở kinh doanh</p>
            <div>Cảm ơn quý khách</div>
        `
    }

    return res;
}

let getBodyHTMLEmail = (dataSend) => {
    let res = '';
    if(dataSend.language === 'en') {
        res = `
            <h3>Dear ${dataSend.customerName}</h3>
            <p>You have received this email because you have booked a service on the Booking Salon and Spa Website</p>
            <p>Appointment information:</p>
            <div><b>Time: ${dataSend.time} </b></div>
            <div><b>Staff: ${dataSend.staffName} </b></div>

            <p>If the above information is correct, please click the link below to confirm.</p>
            <div>
            <a href = ${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
            <div>Thank you</div>
        `
    }
    if(dataSend.language === 'vi') {
        res = `
            <h3>Xin chào ${dataSend.customerName}</h3>
            <p>Bạn đã nhận được email này vì đã đặt lịch dịch vụ trên Website Booking Salon and Spa</p>
            <p>Thông tin lịch hẹn:</p>
            <div><b>Thời gian: ${dataSend.time} </b></div>
            <div><b>Chuyên viên: ${dataSend.staffName} </b></div>

            <p>Nếu thông tin trên là chính xác, vui lòng nhấn vào link bên dưới để xác nhận</p>
            <div>
            <a href = ${dataSend.redirectLink} target="_blank">Ấn vào đây</a>
            </div>
            <div>Cảm ơn quý khách</div>
        `
    }

    return res;
}

let sendAttachment = async (dataSend) => {
    return new Promise (async(resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                user: process.env.EMAIL_APP,
                pass: process.env.EMAIL_APP_PASSWORD,
                },
            });
            let info = await transporter.sendMail({
                from: '"Booking salon and spa" <dohoanminhnam429@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Thông tin đặt lịch dịch vụ Salon and Spa", // Subject line
                html: getBodyHTMLEmailBill(dataSend),
                attachments: {
                    filename: `bill-${dataSend.customerId}-${new Date().getTime()}.png`,
                    content: dataSend.imgBase64.split("base64")[1],
                    encoding: 'base64'
                }
            });
            console.log('check send email')
            console.log(info)
            resolve()
        } catch (error) {
                
        }
    })
}



module.exports = {
    sendSimpleEmail : sendSimpleEmail,
    sendAttachment: sendAttachment
}