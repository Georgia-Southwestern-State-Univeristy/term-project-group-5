import mongoose from 'mongoose';

const attributeschema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Attribute = mongoose.model('Attribute', attributeschema);

export default Attribute;
