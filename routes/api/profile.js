const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET api/profile
// @desc    Get logged in users profile
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name']);

    if (!profile)
      return res.status(400).json({ msg: 'There is no profile for this user' });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', [auth], (req, res) => {});

// @route    POST api/profile/word
// @desc     Delete word from users profile
// @access   Private
router.post('/word', [auth], async (req, res) => {
  let fieldToUpdate = `words.${req.body[0]}`;
  let update = {
    [fieldToUpdate]: req.body[1]
  };
  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: update },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile/count
// @desc     Add to count
// @access   Private
router.post('/count', [auth], async (req, res) => {
  let fieldToUpdate = `stats.${req.body[0]}`;
  let update = {
    [fieldToUpdate]: 1
  };
  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $inc: update },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
