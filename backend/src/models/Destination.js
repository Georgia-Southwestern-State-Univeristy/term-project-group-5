import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {                                      
    name: {
        type: String,
        required: true,
      },
    country: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        required: true,
      },
    image_url: {
        type: String,
        required: true,
      },
      attributes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attribute',
      }
  },
  { timestamps: true }
);

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
