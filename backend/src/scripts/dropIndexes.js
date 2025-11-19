const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');

async function run() {
  if (!process.env.DB_CONNECT_STRING) {
    console.error('DB_CONNECT_STRING not found in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.DB_CONNECT_STRING);
  const db = mongoose.connection.db;

  try {
    const collections = await db.listCollections().toArray();
    const userColl = collections.find(c => c.name === 'users');
    if (!userColl) {
      console.error('No `users` collection found in the database. Collections:', collections.map(c => c.name));
      process.exit(1);
    }

    const coll = db.collection('users');
    const indexes = await coll.indexes();
    console.log('Existing indexes on `users`:', indexes.map(i => ({ name: i.name, key: i.key })));

    const toDrop = indexes.filter(i => {
      // Drop any index that references `problemSolved`
      return Object.keys(i.key || {}).some(k => k.includes('problemSolved'));
    });

    if (toDrop.length === 0) {
      console.log('No indexes referencing `problemSolved` found.');
    } else {
      for (const idx of toDrop) {
        console.log('Dropping index:', idx.name);
        await coll.dropIndex(idx.name);
      }
      console.log('Dropped', toDrop.length, 'index(es) referencing `problemSolved`.');
    }
  } catch (err) {
    console.error('Error while listing/dropping indexes:', err);
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
