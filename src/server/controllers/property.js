import { PropertyType } from '../models/property';
// import cuid from 'cuid';
// import slug from 'limax';
// import sanitizeHtml from 'sanitize-html';

/**
 * Get all PropertyType
 * @param req
 * @param res
 * @returns void
 */
export function getPropertyType(req, res) {
  PropertyType.find().exec((err, propertyType) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ propertyType });
  });
}