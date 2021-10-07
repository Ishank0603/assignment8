const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const Data=require('./models/dat');
const methodOverride=require('method-override');
const seedDB=require('./seed')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB CONNECTED")
})
.catch((err) => console.log(err));
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
// seedDB();
app.get('/', (req, res)=>{
    res.send("checking")
    // res.redirect('/main');
}) 
app.get('/main', async (req,res)=>{
    res.render('main');
})
app.get('/home',async(req,res)=>{
    const data=await Data.find({});
    console.log(data);
    res.render('home',{data});
})
app.post('/home',async (req,res)=>{

    const newitem={...req.body};
    await Data.create(newitem);
    let date=new Date()
    let time=`${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
    let msg=`heyy, ${newitem.name}, you checkedin at ${time}`;
    sendEmail(newitem.email,msg)
    res.redirect('/home');
})
app.get('/home/enter',(req,res)=>{
    res.render('enter');
});
function sendEmail(email,mesg){
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.API_KEY)
    const msg = {
        to: email, // Change to your recipient
        from: process.env.EMAIL, // Change to your verified sender
        html: mesg,
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })

}
app.patch('/home/exit/:id',async(req,res)=>{
    const {id}=req.params;
    const d=await Data.findById(id);
    let date=new Date()
    let time=`${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
    if(d.status){
        let msg=`heyy, ${d.name}, you checkedout at ${time}`;
        sendEmail(d.email,msg);
        await Data.findByIdAndUpdate(id,{$set:{status:false,exitTime: time}});
    }   
    res.redirect('/home');
});
app.delete('/home/:id',async(req,res)=>{
    const {id}=req.params;
    await Data.findByIdAndDelete(id);
    res.redirect('/home');
});
const port=process.env.PORT||2323;
app.listen(port,(req,res)=>{
    console.log("Server at 2323");
});