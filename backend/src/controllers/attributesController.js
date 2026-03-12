import Attribute from '../models/Attribute.js';
import { logInfo, logError } from '../../utils/logger.js';

export async function getAttributes(req, res, next) {
  const startTime = Date.now();

  logInfo("ATTRIBUTE_FETCH_REQUEST", req.requestId, {
    method: req.method,
    endpoint: req.originalUrl
  });

  try {
    const attributes = await Attribute.find();

    logInfo("ATTRIBUTE_FETCH_SUCCESS", req.requestId, {
      resultCount: attributes.length,
      durationMs: Date.now() - startTime
    });

    res.status(200).json(attributes);

  } catch (error) {

    next(error);
  }
}

export async function createAttribute(req, res, next) {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const savedAttributes = await Attribute.insertMany(data);
      
      logInfo("ATTRIBUTE_BULK_CREATE_SUCCESS", req.requestId, {
        count: savedAttributes.length
      });

      return res.status(201).json(savedAttributes);
    }

    const { label, type } = data;
    const newAttribute = new Attribute({ label, type });
    const savedAttribute = await newAttribute.save();
    
    logInfo("ATTRIBUTE_CREATE_SUCCESS", req.requestId, {
      attributeId: savedAttribute._id
    });

    res.status(201).json(savedAttribute);
  } catch (error) {
    next(error);
  }
}
export async function deleteAttribute(req, res, next) {
  try {
    const deletedAttribute = await Attribute.findByIdAndDelete(req.params.id);
    if (!deletedAttribute) {
      return res.status(404).json({ message: 'Attribute not found' });
    }
    logInfo("ATTRIBUTE_DELETE_SUCCESS", req.requestId, {
      attributeId: req.params.id
    });

      res.status(200).json({ message: 'Attribute deleted successfully' });
  } catch (error) {
    next(error);
  }
}