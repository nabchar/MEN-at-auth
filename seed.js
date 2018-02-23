import User from './models/user';

const seedDatabase = function seedDatabase() {
  User.findOne({ email: 'diaperchampion123@gmail.com' }, (err, response) => {
    console.log('Checking for seeds.........');
    console.log('Found: ', response);
    if (!response) {
      console.log('~~~~~~~~~~Seeding DB~~~~~~~~~~~~~');
      const user = new User({
        firstName: 'Josh',
        lastName: 'Martin',
        email: 'diaperchampion123@gmail.com',
      });
      user.setPassword('lotr4life');
      user.save();
      console.log('~~~~~~~~~DB seeded~~~~~~~~~~~~');
    } else {
      console.log('DB already seeded');
    }
  });
};

export default seedDatabase;
