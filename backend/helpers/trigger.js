// const SendOtp = require('sendotp');
smsGateway = require('sms-gateway-nodejs')(process.env.username, process.env.pass)
const sgMail = require('@sendgrid/mail');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.apiKey,
  apiSecret: process.env.apiSecret
});

const from = 'Have a nice meeting!';




module.exports.entrymessage=async(HostPhoneno,VisitorName,Visitoremail,visitorphoneno)=>{
  const text = ('A visitor has arrived with the following details: Name:',VisitorName,'email:',Visitoremail,'Phone:',visitorphoneno);
  const to = HostPhoneno;
await nexmo.message.sendSms(from, to, text,function(err,res){
   if(err){
     console.log(err)
   }
   else{
     console.log(res)
   }
 });
 console.log("happy")
}

module.exports.visit=async (emailfrom,emailto,visitorname,visitoremail,visitorphn)=> {
sgMail.setApiKey(pocess.env.sgkey);
const msg = {
  to: emailto,
  from: emailfrom,
  subject: 'Guest waiting',
  html: ('<p>A person is there to meet you:</p><br><p>Name:</p>',visitorname,'<br><p>email:</p>',visitoremail,'<br><p>Phone:</p>',visitorphn),                               
};
sgMail.send(msg);
}

module.exports.exit=async (emailfrom,emailto,visitorname,visitorphnno,checkintime,checkoutime,hostname)=> {
  sgMail.setApiKey(pocess.env.sgkey);
  const msg = {
    to: emailto,
    from: emailfrom,
    subject: 'Thanks for your visit!',
    html: ('Your meeting is over. So, details of your visit are as follows: </p><br><p>Name:</p>',visitorname,'<br><p>Phone:</p>',visitorphnno,'<br><p>check-in-time:</p>',checkintime,'<br><p>check-out-time:</p>',checkoutime,'<br><p>Host name:</p>',hostname),                               
  };
  sgMail.send(msg);
}
module.exports.remind=async (emailfrom,emailto,id)=> {
  sgMail.setApiKey(pocess.env.sgkey);
  const msg = {
    to: emailto,
    from: emailfrom,
    subject: 'Update meeting end time',
    html: ('Your meeting might be over. If not you can postpone your expected departure according to your suitability.</p><p>Enter your id',id,'and new out-time </p><a href=\'http://localhost:3000/update \'><p>click on the link </p></a> <p>Or else if you want to close your entry kindly do so </p>'),                             
  };
  sgMail.send(msg);
}