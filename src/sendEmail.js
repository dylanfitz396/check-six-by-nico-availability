import nodemailer from 'nodemailer';

const { PASSWORD, EMAIL_ADDRESS } = process.env;

const convertToHumanReadableTimes = (suitableTimes) => suitableTimes.map(({ TimeSlot }) => {
    const date = new Date(TimeSlot)
    const humanDateFormat = date.toLocaleString();
    return humanDateFormat
});

const generateHtmlForTimesList = (humanReadableTimes) => {
    const html = humanReadableTimes.map((time) => {
        return `<li>${time}</li>`
    });
    return `<ol>${html.join('')}</ol>`;
}

export const sendEmail = (suitableTimes) => {
    const humanReadableTimes = convertToHumanReadableTimes(suitableTimes);
    const htmlForTimesList = generateHtmlForTimesList(humanReadableTimes);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_ADDRESS,
          pass: PASSWORD
        }
    });
      
    let mailOptions = {
        from: EMAIL_ADDRESS,
        to: EMAIL_ADDRESS,
        subject: 'Time Available in Six By Nico ',
        html: `Here are potentially suitable times:${htmlForTimesList}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}