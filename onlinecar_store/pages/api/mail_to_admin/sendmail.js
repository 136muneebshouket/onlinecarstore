const nodemailer = require("nodemailer");

async function send_mail(ad ,mail_hint) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIl_PASS,
      },
    });
    let mail_Html = ``;

    if(mail_hint == 'Approval'){
      mail_Html = `<h1 style="font-family: sans-serif;">New Ad for Approval</h1>
      <p> ${ad} </p>
     <div style="display: flex; justify-content: center;">
     <a href='${process.env.Host}/admin/dashboard_page/Dashboard' style="margin-top:40px; ">
     <button style="background-color: green; color:white; border: none;  padding: 10px 20px; font-size: 16px; border-radius: 5px;  cursor: pointer;">Check</button>
     </a>
     </div>`
    }
    if(mail_hint == 'Incpection'){
      mail_Html = `<h1 style="font-family: sans-serif;">New Ad for Incpection</h1>
      <p> ${ad} </p>
     <div style="display: flex; justify-content: center;">
     <a href='${process.env.Host}/admin/dashboard_page/Dashboard' style="margin-top:40px; ">
     <button style="background-color: green; color:white; border: none;  padding: 10px 20px; font-size: 16px; border-radius: 5px;  cursor: pointer;">Check</button>
     </a>
     </div>`
    }
    if(mail_hint == 'report'){
      mail_Html = `<h1 style="font-family: sans-serif;">Ad Reported</h1>
      <p> ${ad} </p>
     <div style="display: flex; justify-content: center;">
     <a href='${process.env.Host}/admin/dashboard_page/Dashboard' style="margin-top:40px; ">
     <button style="background-color: green; color:white; border: none;  padding: 10px 20px; font-size: 16px; border-radius: 5px;  cursor: pointer;">Check</button>
     </a>
     </div>`
    }
   
    const mailOptions = {
      // from: process.env.EMAIL_FROM,
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Alert",
      html: mail_Html ,
    };
    const sended = await transporter.sendMail(mailOptions);
  } catch (error) {
 
    return;
  }
  return ;

}


export {send_mail}