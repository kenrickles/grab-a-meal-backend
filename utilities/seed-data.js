const { getHash } = require('./auth.js');

// array of objects containing category names.
// object template is { name: <categoryname> }
const categoriesList = [];

const categoriesNames = ['Breakfast', 'Coffee', 'Lunch', 'Dinner', 'Supper', 'Budget', 'Fancy', 'Movie', 'Sports', 'Hike', 'Karaoke', 'Clubbing', 'Others'];

for (let i = 0; i < categoriesNames.length; i += 1) {
  categoriesList.push({
    name: categoriesNames[i],
  });
}

// array of objects containing users data
const usersList = [
  {
    name: 'Alvin',
    photo: '/images/profile-photos/anonymous-person.jpg',
    date_of_birth: '2015-03-25',
    email: 'alvin@gmail.com',
    password: getHash('alvin'),
    gender: 'male',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Ken',
    photo: '/images/profile-photos/anonymous-person.jpg',
    date_of_birth: '2015-04-25',
    email: 'ken@gmail.com',
    password: getHash('ken'),
    gender: 'male',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Veena',
    photo: '/images/profile-photos/anonymous-person.jpg',
    date_of_birth: '1987-02-14',
    email: 'veena@gmail.com',
    password: getHash('veena'),
    gender: 'female',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Jit',
    photo: '/images/profile-photos/anonymous-person.jpg',
    date_of_birth: '1996-12-20',
    email: 'jitcorn@gmail.com',
    password: getHash('jitcorn'),
    gender: 'male',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'akira',
    photo: '/images/profile-photos/anonymous-person.jpg',
    date_of_birth: '1998-01-01',
    email: 'akira@gmail.com',
    password: getHash('akira'),
    gender: 'male',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'jeremy',
    photo: '/images/profile-photos/anonymous-person.jpg',
    date_of_birth: '1994-06-06',
    email: 'jeremy@gmail.com',
    password: getHash('jeremy'),
    gender: 'male',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// array of object containing activity data
const activityList = [
  {
    name: 'Lunch at Steakvile',
    description: 'Quick Lunch at the best steak place!',
    date_time: '2015-03-25',
    total_num_of_participants: 5,
    location: 'Singapore',
    is_existing: true,
    category_id: 3,
    creator_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Dinner at Hai Di Lao',
    description: 'Steamboat and hopefully a love boat!',
    date_time: '2015-03-2',
    total_num_of_participants: 4,
    location: 'Singapore',
    is_existing: true,
    category_id: 4,
    creator_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// export the seed data as a module
module.exports = {
  categoriesList,
  usersList,
  activityList,
};
