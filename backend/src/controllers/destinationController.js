import Destination from '../models/Destination.js';
import SearchRequest from '../models/SearchRequest.js';
import mongoose from 'mongoose';
import { logInfo, logWarn } from '../../utils/logger.js';

export async function getDestinations(req, res, next) {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    next(error);
  }
}

export async function createDestination(req, res, next) {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const normalizedData = data.map((dest) => ({
        ...dest,
        airportCodes: Array.isArray(dest.airportCodes)
          ? dest.airportCodes.map((code) => code.toUpperCase().trim())
          : []
      }));

      const savedDestinations = await Destination.insertMany(normalizedData);
      return res.status(201).json(savedDestinations);
    }

    const {
      name,
      country,
      description,
      image_url,
      airportCodes,
      attributes
    } = data;

    const newDestination = new Destination({
      name,
      country,
      description,
      image_url,
      airportCodes: Array.isArray(airportCodes)
        ? airportCodes.map((code) => code.toUpperCase().trim())
        : [],
      attributes
    });

    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);

  } catch (error) {
    next(error);
  }
}

export async function searchDestinations(req, res, next) {
  const startTime = Date.now();

  logInfo("DESTINATION_SEARCH_REQUEST", req.requestId, {
    endpoint: req.originalUrl,
    method: req.method,
    body: req.body
  });

  try {
    const { user_id, attribute_ids } = req.body;

    if (!attribute_ids || !Array.isArray(attribute_ids) || attribute_ids.length === 0) {
      logWarn("DESTINATION_SEARCH_VALIDATION_FAILED", req.requestId, {
        reason: "attribute_ids missing or empty"
      });

      return res.status(400).json({
        message: "At least one attribute is required to search."
      });
    }

    for (const id of attribute_ids) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid attribute ID format."
        });
      }
    }

    const targetAttributeObjectIds = attribute_ids.map(
      id => new mongoose.Types.ObjectId(id)
    );

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
      { $limit: 8 }
    ]);

    logInfo("DESTINATION_SEARCH_SUCCESS", req.requestId, {
      resultCount: rankedDestinations.length,
      durationMs: Date.now() - startTime
    });

    res.status(201).json({
      search_id: newSearch._id,
      results: rankedDestinations
    });

  } catch (error) {
    next(error);
  }
}

export async function updateDestination(req, res, next) {
  try {
    const {
      name,
      country,
      description,
      image_url,
      airportCodes,
      attributes
    } = req.body;

    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.id,
      {
        name,
        country,
        description,
        image_url,
        airportCodes: Array.isArray(airportCodes)
          ? airportCodes.map((code) => code.toUpperCase().trim())
          : [],
        attributes
      },
      { new: true }
    );

    if (!updatedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json(updatedDestination);
  } catch (error) {
    next(error);
  }
}

export async function deleteDestination(req, res, next) {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(req.params.id);

    if (!deletedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    next(error);
  }
}