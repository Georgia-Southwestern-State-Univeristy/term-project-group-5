import Destination from '../models/Destination.js';

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
    const { name, country, description, image_url , attributes } = req.body;
    const newDestination = new Destination({ name, country, description, image_url , attributes });

    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    console.error('error in createDestination controller: ', error);
    res.status(500).json({ message: 'internal server error' });
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