// import axios from 'axios';
// import winston from 'winston';
import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

// const emailClientUrl = 'https://emailclienturl.com/send';
//
// export async function sendMail({ content, user }) {
//   try {
//     const response = await axios.post(emailClientUrl, { content, user });
//     return response;
//   } catch (e) {
//     winston.error(e.message, e);
//     return new Error('Message failed to send');
//   }
// }

const nodeMailerTransport = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

const sendMail = (user, emailBody) => {
  const message = {
    from: `jmaikudigusau@gmail.com`,
    to: `${user.email}`,
    subject: 'Tax Clearance',
    html: emailBody,
  };
  const transport = nodeMailerTransport();
  try {
    transport.verify(function(error, success) {
      if (error) {
        console.error(`Error1: ${error}`);
      } else {
        transport.sendMail(message, (error, info) => {
          if (error) {
            console.error(`Error2: ${error}`);
          }
          console.log(`Email sent to ${user.name}!`);
        });
      }
    });
  } catch (e) {
    throw new Error(e);
  }
};

export default function sendUserMail(user, tax) {
  const email = {
    body: {
      greeting: 'Dear',
      signature: 'Sincerely',
      name: `${user.name}`,
      intro: `This is to confirm your Tax Clearance Application was approved. Kindly find your receipt attached to this mail. \n\nThank you. \n`,
      action: {
        instructions: 'To download your TC, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Download',
          link: `${process.env.EMAIL_URL}/receipt/${tax.id}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email or call this number 08033344000, we'd love to hear from you.",
    },
  };

  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      // Appears in header & footer of e-mails
      name: 'Zamfara Board of Internal Revenue',
      link: 'https://example.com/',
      // Optional product logo
      logo:
        'https://storage.googleapis.com/thisday-846548948316-wp-data/wp-media/2018/12/620df396-zamfara.jpg',
    },
  });

  const emailBody = mailGenerator.generate(email);

  // require('fs').writeFileSync('preview.html', emailBody, 'utf8');

  sendMail(user, emailBody);
}
