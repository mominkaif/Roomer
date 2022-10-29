const Profile = require('../models/profileModels')
const mongoose = require('mongoose')

// get all profiles
const getProfiles = async (req, res) => {
  const profiles = await Profile.find({}).sort({createdAt: -1})

  res.status(200).json(profiles)
}


// get a single profile
const getProfile = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such profile."})
  }

  const profile = await Profile.findById(id)

  if (!profile) {
    return res.status(404).json({error: 'No such profile'})
  }

  res.status(200).json(profile)
}


// create a new profile
const createProfile = async (req, res) => {
  const {name, university, year} = req.body
  // add doc to db
  try{
      const profile = await Profile.create({name, university, year})
      res.status(200).json(profile)
  } catch (error){
      res.status(400).json({error: error.message})
  }
}


// delete a profile
const deleteProfile = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such profile."})
  }

  const profile = await Profile.findOneAndDelete({_id: id})

  if (!profile) {
    return res.status(400).json({error: 'No such profile'})
  }

  res.status(200).json(profile)
}


// update a profile
const updateProfile = async (req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such profile."})
  }

  const profile = await Profile.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!profile) {
    return res.status(400).json({error: 'No such profile'})
  }

  res.status(200).json(profile)
}

module.exports = {
  getProfiles,
  getProfile,
  createProfile,
  deleteProfile,
  updateProfile
}
