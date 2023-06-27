import nodemailer from 'nodemailer';

const EMAIL_ADDRESS = '***REMOVED***'
const { PASSWORD } = process.env;

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
        // text: '<h1>Welcome</h1><p>That was easy!</p>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}