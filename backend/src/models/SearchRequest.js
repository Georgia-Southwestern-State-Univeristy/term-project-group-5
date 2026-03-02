import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema(
  {                                      
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        required: false,
      },
      attribute_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attribute',
        required:true
      }]
  },
  { timestamps: true }
);

const SearchRequest = mongoose.model('SearchRequest', searchSchema);

export default SearchRequest;
