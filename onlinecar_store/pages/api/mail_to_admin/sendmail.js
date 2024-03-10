const nodemailer = require("nodemailer");

async function send_mail(ad) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIl_PASS,
      },
    });

    // console.log(rejections);
    const mailOptions = {
      // from: process.env.EMAIL_FROM,
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Alert",
      html: `<h1 style="font-family: sans-serif;">New Ad for Approval</h1>
       <p> ${ad} </p>
      <div style="display: flex; justify-content: center;">
      <a href='${process.env.Host}/admin/dashboard_page/Dashboard' style="margin-top:40px; ">
      <button style="background-color: green; color:white; border: none;  padding: 10px 20px; font-size: 16px; border-radius: 5px;  cursor: pointer;">Check</button>
      </a>
      </div>`,
    };
    const sended = await transporter.sendMail(mailOptions);
  } catch (error) {
 
    return;
  }
  return ;

}


export {send_mail}