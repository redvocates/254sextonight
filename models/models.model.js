import mongoose from 'mongoose'

const modelsSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: [true, 'Generate Slug'],
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
    scrapped:{
        type: Boolean,
        required: [true, 'Provide Full Name'],
        default: false,
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
    phonenumber:{
        type: Number,
        required: [true, 'Provide Contact Number']
    },
    idnumber:{
        type: String,
        required: [true, 'Provide National ID Number/ Passport Number']
    },
    yearofbirth:{
        type: Number,
        required: [true, 'Provide Year Of Birth']
    },
    email:{
        type: String,
        required: [true, 'Provide Contact Email Address']
    },
    gender:{
        type: String,
        required: [true, 'Your Gender is Required'],
        enum: ['Male', 'Female']
    },description:{
        type: String,
        required: [true, 'Please Describe your event']
    },
    shot:{
        type: Number,
        required: [true, 'Please Provide Price per Shot']
    },
    verified:{
        type: Boolean,
        required: true,
        default: false
    },
    sleepover:{
        type: Number,
        required: [true, 'Please Provide Price per Sleepover']
    },
    incalls:{
        type: Boolean,
        required: [false, 'Do you Host?']
    },
    outcalls:{
        type: Boolean,
        required: [false, 'Do you travel']
    },
    anal:{
        type: Boolean,
        required: [false, 'Do you do anal for extra tokens?']
    },
    country:{
        type: String,
        required: [true, 'Please provide country'],
        default: "Kenya"
    },
    county:{
        type: String,
        required: [true, 'What your county?']
    },
    detailedlocation:{
        type: String,
        required: [true, 'Detailed description of your location']
    },
    imagedisplay:{
        type: String,
        required: [true, 'Upload Your Image']
    },
    nationalproof:{
        type: String,
        required: [true, 'Upload a national proof, eg national id or a passport picture']
    }
},{timestamps : true})


const ModelsModel =mongoose.models.models|| mongoose.model('models', modelsSchema)


export default ModelsModel