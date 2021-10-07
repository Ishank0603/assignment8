const mongoose = require("mongoose");
const dataschema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    phone:{
        type:String,
        trim:true,
    },
    entryTime:{
        type:String,
        trim:true,
    },
    exitTime:{
        type:String,
        default:"-",
        trim:true,
    },
    status:{
        type:Boolean,
        default:true,
    }
});
const Data=mongoose.model('Data',dataschema);
module.exports=Data;