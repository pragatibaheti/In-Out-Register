const express = require('express');
const checks = require('../helpers/sanity_checks');
const utils = require('util');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const triggers = require('../helpers/trigger')


mongoose.connect('mongodb://127.0.0.1:27017/inout',{ useNewUrlParser: true });

const router = express.Router();
const GroupModel = mongoose.model('in', Schema({
    visitorname: String,
    visitorphnno: Number,
    visitoremail:String,
    hostname:String,
    hostphnno: Number,
    hostemail:String,
    reminder: Boolean,
    checkintime:Date,
    checkouttime:Date
}));


module.exports.in = async (req,res)=>{
    const VisitorName = req.body.body.visitorname;
    const VisitorPhoneno = req.body.body.visitorphoneno;
    const Visitoremail = req.body.body.visitoremail;
    const Hostname = req.body.body.hostname;
    const HostPhoneno = req.body.body.hostphoneno;
    const Hostemail = req.body.body.hostemail;
    const checkouttime = req.body.body.checkouttime;
    const time = Date.now();
    const dataToVerify = { VisitorName, VisitorPhoneno, Visitoremail, Hostname, HostPhoneno, Hostemail};
    const status = await checks.is_blank(dataToVerify);
    if(status.is_blank) {
        res.status(200);
        res.send({'message':utils.format(errors.blank_variable, status.attribute)});
    }
    
    const group= new GroupModel({
        visitorname: VisitorName,
        visitorphnno: VisitorPhoneno,
        visitoremail:Visitoremail,
        hostname:Hostname,
        hostphnno: HostPhoneno,
        hostemail:Hostemail,
        checkouttime: checkouttime,
        reminder: false,
        checkintime:time
    });
    let result = await group.save()
    let id = result._id
    console.log(id)
    await triggers.visit('company@company.com',Hostemail,VisitorName,Visitoremail,visitorphoneno)
    await triggers.entrymessage(HostPhoneno,VisitorName,Visitoremail,visitorphoneno)
    res.status(200);
    res.send({'message': id});
}

module.exports.out = async (req,res)=>{
    const Visitorid = req.body.body.id;
    const time = Date.now();
    const filter = { _id: Visitorid };
    const update = {checkouttime:time}
    let doc = await GroupModel.findOneAndUpdate(filter, update);
    await triggers.exit('company@company.com',doc.visitoremail,doc.visitorname,doc.visitorphnno,doc.checkintime,doc.checkouttime,doc.hostname)
    res.status(200);
    res.send({'message': "successfully executed"});
}
module.exports.update = async (req,res)=>{
    const Visitorid = req.body.body.id;
    const time = req.body.body.checkouttime;
    const filter = { _id: Visitorid };
    const update = {checkouttime:time,reminder:false};
    await GroupModel.findOneAndUpdate(filter, update);
    res.status(200);
    res.send({'message': "successfully executed"});
}



