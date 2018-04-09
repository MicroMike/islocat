import mongoose from 'mongoose';
import * as Models from '../models/property';
// import cuid from 'cuid';
// import slug from 'limax';
// import sanitizeHtml from 'sanitize-html';

const getData = (Model) => {
  const query = Model.find()
  return query.exec();
}

function getPropertyType() {
  return getData(Models.PropertyType)
}

function getPropertyInfo() {
  return getData(Models.PropertyInfo)
}

function getBuildingOptions() {
  return getData(Models.BuildingOptions)
}

function getPropertyOptions() {
  return getData(Models.PropertyOptions)
}

export function getPropertyData(req, res) {
  const data = {}
  const promises = []

  promises.push(getPropertyType().then(e => data.propertyType = e))
  promises.push(getPropertyInfo().then(e => data.propertyInfo = e))
  promises.push(getBuildingOptions().then(e => data.buildingOptions = e))
  promises.push(getPropertyOptions().then(e => data.propertyOptions = e))

  Promise.all(promises).then(() => {
    res.json(data)
  })
}


const add = (Model, name) => {
  const addModel = new Model(
    {
      _id: new mongoose.Types.ObjectId(),
      name: name
    }
  )
  addModel.save()
}

export const init = (req, res) => {
  add(Models.PropertyType, 'studio')
  add(Models.PropertyType, 'apartment')
  add(Models.PropertyType, 'home')
  add(Models.PropertyType, 'villa')
  add(Models.PropertyType, 'penthouse')

  add(Models.PropertyInfo, 'area')
  add(Models.PropertyInfo, 'availableDate')
  add(Models.PropertyInfo, 'monthlyRent')
  add(Models.PropertyInfo, 'rentalCharges')

  add(Models.BuildingOptions, 'intercom')
  add(Models.BuildingOptions, 'digicode')
  add(Models.BuildingOptions, 'guardian')
  add(Models.BuildingOptions, 'elevator')
  add(Models.BuildingOptions, 'elevatorShabbath')
  add(Models.BuildingOptions, 'handicapAccess')

  add(Models.PropertyOptions, 'furnished')
  add(Models.PropertyOptions, 'airConditioner')
  add(Models.PropertyOptions, 'groundFloor')
  add(Models.PropertyOptions, 'lastFloor')

  res.send('done');
}
