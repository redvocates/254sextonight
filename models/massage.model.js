import mongoose from 'mongoose'

const massageSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: [true, 'Provide Full Name'],
        unique: true
    },
    fullname:{
        type: String,
        required: [true, 'Provide Full Name']
    },
    username:{
        type: String,
        required: [true, 'Provide Pseudonym'] 
    },
    idnumber:{
        type: String,
        required: [true, 'Provide National ID Number/ Passport Number']
    },
    businesstype:{
        type: String,
        required: [true, 'Do you provide this services as a company or individual?'],
        enum: ["company" , "individual"]
    },
    location:{
        type: String,
        required: [true, 'Provide organizer location']
    },
    phonenumber:{
        type: Number, 
        required: [true, 'Provide organizer phone number']
    },
    banner:{
        type: String,
        required: [true, 'Provide Display Banner']
    },
    price:{
        type: Number,
        required: [true, 'Provide pricing']
    },
    fine:{
        type: Number,
        required: [true, 'Provide pricing'],
    },
    whyfined:{
        type: String,
        required: false,
    },
    classifiedfinedinformation:{
        type:String,
        required: false,
    },
    email:{
        type: String,
        required: [true, 'Provide contact email']
    },
    packing:{
        type: Boolean,
        required: [true, 'Is packing available?']
    },
    description:{
        type: String,
        required: [true, 'Please Describe your event']
    },
    nationalproof:{
        type: String,
        required: [true, 'Upload a national proof, eg national id or a passport picture'],
    },
    verified:{
       type: Boolean,
       required: true,
       default: false
   }
},{timestamps : true})


const MassageModel = mongoose.model('massage', massageSchema)


export default MassageModel