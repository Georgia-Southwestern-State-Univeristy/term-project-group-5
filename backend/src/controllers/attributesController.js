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
      const { label, type } = req.body;
      const newAttribute = new Attribute({ label, type });
  
      const savedAttribute = await newAttribute.save();
      res.status(201).json(savedAttribute);
    } catch (error) {
      console.error('error in create Attribute controller: ', error);
      res.status(500).json({ message: 'internal server error' });
    }
  }