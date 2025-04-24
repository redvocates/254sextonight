import mongoose from 'mongoose'

const eventsSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: [true, 'Provide Display Banner'],
        unique: true
    },
    fullname:{
        type: String,
        required: [true, 'Provide organizer name or company']
    },
    username:{
        type: String,
        required: [true, 'Provide organizer name ']
    },
    idnumber:{
        type: String,
        required: [true, 'Provide organizer name or company']
    },
    location:{
        type: String,
        required: [true, 'Provide organizer location']
    },
    banner:{
        type: String,
        required: [true, 'Provide Display Banner']
    },
    nationalproof:{
        type: String,
        required: [true, 'Provide Display Banner']
    },
    phonenumber:{
        type: Number,
        required: [true, 'Provide organizer phone number']
    },
    entry:{
        type: String,
        required: [true, 'Provide entry requirements']
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
    dateofevent:{
        type: Date,
        required: [true, 'Provide the events date']
    },
    packing:{
        type: Boolean,
        required: [true, 'Is packing available?']
    },
    bookinglink:{
        type: String,
        required: [true, 'Provide  booking link, if you dont have one do https://wa.me/254yourwhatsappnumber']
    },
    description:{
        type: String,
        required: [true, 'Please Describe your event']
    },
     verified:{
        type: Boolean,
        required: true,
        default: false
    }
},{timestamps : true}) 


const EventsModel = mongoose.model('events', eventsSchema)


export default EventsModel