import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const propertyTypeSchema = new Schema({
  name: { type: 'String', required: true },
});

export const PropertyType = mongoose.model('PropertyType', propertyTypeSchema, 'propertyType');
export const PropertyInfo = mongoose.model('PropertyInfo', propertyTypeSchema, 'propertyInfo');
export const BuildingOptions = mongoose.model('BuildingOptions', propertyTypeSchema, 'buildingOptions');
export const PropertyOptions = mongoose.model('PropertyOptions', propertyTypeSchema, 'propertyOptions');