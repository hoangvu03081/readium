const mongoose = require('mongoose');

const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    email: "john@example.com",
    password: "JW@Random1",
    biography:
      "I am a 26-year-old golf caddy who enjoy running, eating out and going to the movies. I am generous and gentle, but can also be very standoffish and a bit unfriendly.",
    job: "Singer",
    displayName: "john",
    profileId: "john",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    email: "doe@example.com",
    password: "Manificent@#",
    biography:
      "I am a Colombian who defines himself as straight. I have a degree in sports science.",
    job: "Programmer",
    displayName: "doe",
    profileId: "doe",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    email: "freeuse14@gmail.com",
    password: "lil958naca",
    biography:
      "Physically, I am in pretty good shape. I am average-height with fair skin, white hair and black eyes",
    job: "Gymmer",
    displayName: "freeuse14",
    profileId: "freeuse14",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    email: "takaagmail@gmail.com",
    password: "macmac90",
    biography:
      "I grew up in a working class neighbourhood. I was raised by my mother, my father having left when I was young",
    job: "Student",
    displayName: "takaagmail",
    profileId: "takaagmail",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    email: "gmaill236@gmail.com",
    password: "887acanca",
    biography:
      "I am currently in a relationship with Felix Kristy Hammond. Felix is 2 years older than me and works as a carpenter",
    job: "Farmer",
    displayName: "gmaill236",
    profileId: "gmaill236",
  },
];

module.exports = users;
