import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    filename: String,
    url: String
});

export default mongoose.models.image || mongoose.model('image', ImageSchema);

//const ImageModel = mongoose.models.image || mongoose.model('image', imageSchema);


//export default ImageModel;


//mongoose.models.models|| mongoose.model('models', modelsSchema)