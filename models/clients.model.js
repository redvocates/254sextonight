import mongoose from 'mongoose'

const clientsSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: [true, 'Whats you name?'],
    },
    location:{
        type: String,
        required: [true, 'Provide organizer location']
    },
    phonenumber:{
        type: Number,
        required: [true, 'Provide organizer phone number']
    },
    price:{
        type: Number,
        required: [true, 'Provide pricing']
    },
    email:{
        type: String,
        required: [true, 'Provide contact email']
    },
    loverid:{
        type: String,
        required: [true, 'Lover tracking ID']
    },
    lovername:{
        type: String,
    },
    successfull:{
        type: Boolean,
    },
    lovercounty:{
        type: String,
    },
    loverlocation:{
        type: String,
    },
    lovershot:{
        type: String,
    },
    loversleepover:{
        type: String,
    },
    loverage:{
        type: Number,
    },
    loverimage:{
        type: String,
    }
},{timestamps : true})


const ClientsModel = mongoose.models.clients || mongoose.model('clients', clientsSchema);


export default ClientsModel