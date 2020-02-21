const express = require('express');
const router = express.Router();

const Words = require('../../models/Words');

// @route    GET api/words
// @desc     Get all words
// @access   Public
router.get('/', async (req, res) => {
  try {
    const wordList = await Words.find();
    res.json(...wordList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
