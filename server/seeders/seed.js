const db = require('../config/connection');
const { User, Bird } = require('../models');
const userSeeds = require('./userSeeds.json');
const birdSeeds = require('./birdSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Bird', 'bird');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < birdSeeds.length; i++) {
      const { _id, birdAuthor } = await Bird.create(birdSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: birdAuthor },
        {
          $addToSet: {
            bird: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});