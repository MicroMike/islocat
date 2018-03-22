import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const propertyTypeSchema = new Schema({
  name: { type: 'String', required: true },
});

export const PropertyType = mongoose.model('PropertyType', propertyTypeSchema, 'propertyType');
