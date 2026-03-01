import Attribute from '../models/Attribute.js';

export async function getAttributes(req, res) {
  try {
    const attributes = await Attribute.find();
    res.status(200).json(attributes);
  } catch (error) {
    console.error('Error in get all attributes controller', error);
    res.status(500).json({ message: 'internal server error' });
  }
}
export async function createAttribute(req, res) {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const savedAttributes = await Attribute.insertMany(data);
      return res.status(201).json(savedAttributes);
    }

    const { label, type } = data;
    const newAttribute = new Attribute({ label, type });
    const savedAttribute = await newAttribute.save();
    
    res.status(201).json(savedAttribute);
  } catch (error) {
    console.error('Error in createAttribute controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export async function deleteAttribute(req, res) {
  try {
    const deletedAttribute = await Attribute.findByIdAndDelete(req.params.id);
    if (!deletedAttribute)
      return res.status(404).json({ message: 'Attribute not found' });
    res.status(200).json({ message: 'Attribute deleted successfully' });
  } catch (error) {
    console.error('error in delete Attribute controller: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}