const mongoose = require('mongoose');
const { copyFileSync } = require('fs');

const domains = [
  {
    service: require("../services/landmark-service"),
    data: require('./LandmarkSeed.json'),
    name: 'Landmark'
  },
  {
    service: require("../services/user-service"),
    data: require('./UserSeed.json'),
    name: 'Users'
  },
  {
    service: require("../services/landmark-comment-service"),
    data: require('./LandmarkCommentSeed.json'),
    name: 'LandmarkComment'
  },

];

const seedData = () => {
  console.log('\n\n\nStarting Seeding Data...\n\n\n');

  domains.map(async ({ service, data, name }) => {
    console.log(`Seeding: ${name}`);

    const oldData = await service.getAll();
    oldData.map(d => service.delete(d.id));

    data.map(d => {
      try {
        if (d?.image) {
          copyFileSync(`${__dirname}/images/${d?.image}`, `/uploads/${d?.image}`);
        }
        service.create({
          ...d,
          ...(d?.image ? { image: `/uploads/${d?.image}` } : {})
        });
      } catch (e) {
        console.error(e);
      }
      
    });

    console.log(`Completed: ${name}`);
  });

  console.log('\n\n\nDone Seeding Data\n\n\n');
}


module.exports = seedData;

