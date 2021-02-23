const { getNames } = require('country-list');
const { getHash } = require('./auth.js');

// array of objects containing country names.
// object template is { name: <countryname> }
const countriesList = [];
const countriesNames = getNames();

countriesNames.sort();
for (let i = 0; i < countriesNames.length; i += 1) {
  countriesList.push({
    name: countriesNames[i],
  });
}

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
    country_id: 200,
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
    country_id: 200,
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
    country_id: 200,
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
    country_id: 200,
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
    country_id: 200,
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
    country_id: 200,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

// export the seed data as a module
module.exports = {
  countriesList,
  categoriesList,
  usersList,
};
