import Destination from '../models/Destination.js';
import SearchRequest from '../models/SearchRequest.js';
import mongoose from 'mongoose';

export async function getDestinations(req, res) {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    console.error('Error in getDestinations controller', error);
    res.status(500).json({ message: 'internal server error' });
  }
}

export async function createDestination(req, res) {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const savedDestinations = await Destination.insertMany(data);
      return res.status(201).json(savedDestinations);
    }

    const { name, country, description, image_url, attributes } = data;
    const newDestination = new Destination({ 
        name, 
        country, 
        description, 
        image_url, 
        attributes 
    });

    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
    
  } catch (error) {
    console.error('Error in createDestination controller: ', error);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}
export async function searchDestinations(req, res) {
    try {
        const { user_id, attribute_ids } = req.body;
    
        if (!attribute_ids || !Array.isArray(attribute_ids) || attribute_ids.length === 0) {
          return res.status(400).json({ message: 'At least one attribute is required to search.' });
        }
    
        const targetAttributeObjectIds = attribute_ids.map(id => new mongoose.Types.ObjectId(id));
    
        const newSearch = await SearchRequest.create({
          user_id: user_id || null, 
          attribute_ids: targetAttributeObjectIds 
        });
    
        const rankedDestinations = await Destination.aggregate([
          {
            $match: {
              attributes: { $in: targetAttributeObjectIds }
            }
          },
          {
            $addFields: {
              matchCount: {
                $size: {
                  $setIntersection: ["$attributes", targetAttributeObjectIds]
                }
              }
            }
          },
          {
            $sort: { 
              matchCount: -1, 
              createdAt: -1 
            }
          },
          {
            $limit: 8
          }
        ]);
    
        res.status(201).json({
          search_id: newSearch._id,
          results: rankedDestinations
        });
    
    } catch (error) {
        console.error('Error in searchController:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

export async function updateDestination(req, res) {
    try {
      const { name, country, description, image_url, attributes } = req.body;
      const updatedDestination = await Destination.findByIdAndUpdate(
        req.params.id,
        { name, country, description, image_url, attributes },
        { new: true }
      );
  
      if (!updatedDestination)
        return res.status(404).json({ message: 'Destination not found' });
  
      res.status(200).json(updatedDestination);
    } catch (error) {
      console.error('error in updatedDestination controller: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
export async function deleteDestination(req, res) {
    try {
      const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
      if (!deletedDestination)
        return res.status(404).json({ message: 'Destination not found' });
      res.status(200).json({ message: 'Destination deleted successfully' });
    } catch (error) {
      console.error('error in delete Destination controller: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }