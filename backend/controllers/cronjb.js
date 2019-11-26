const mongoose = require('mongoose');
let cron = require('node-cron');
mongoose.connect('mongodb://127.0.0.1:27017/inout',{ useNewUrlParser: true });
const triggers = require('../helpers/trigger')
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
cron.schedule('*/2 * * * *', () => {
  const time = Date.now();
  const filter = { reminder: false, age: { $gte: time}}
  const update = {reminder: true}
  let data = await GroupModel.findOneAndUpdate(filter, update);
  data.forEach(doc => { 
    await triggers.remind('company@company.com',doc.visitoremail,doc._id) 
  });
});