const express = require('express')
const {
    createProfile,
    getProfiles,
    getProfile,
    deleteProfile,
    
    updateProfile
} = require('../controllers/profileController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// require auth for all workout routes 
router.use(requireAuth)

//to get all profiles
router.get('/', getProfiles)

//GET single profile
router.get('/:id', getProfile)

//POST a new profile
router.post('/', createProfile)

//DELETE a profile
router.delete('/:id', deleteProfile)

//UPDATE a profile
router.patch('/:id', updateProfile)

module.exports = router