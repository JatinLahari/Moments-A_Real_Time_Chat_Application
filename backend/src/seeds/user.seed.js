import { config } from "dotenv";
import { connectDB } from "../lib/db.js"
import User from "../models/user.model.js";
config();

const seedUsers = [
  {
    email: 'emma.thompson@example.com',
    fullName: "Emma Thompson",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    email: 'olivia.miller@example.com',
    fullName: "Olivia Miller",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    email: 'sophia.davis@example.com',
    fullName: "Sophia Davis",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    email: 'emily.willis@example.com',
    fullName: "Emily Willis",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    email: 'elsa.jean@example.com',
    fullName: "Elsa Jean",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  {
    email: 'shakira.morphy@example.com',
    fullName: "Shakira Morphy",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    email: 'alexis.wonder@example.com',
    fullName: "Alexis Wonder",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg"
  },
  {
    email: 'john.cena@example.com',
    fullName: "John Cena",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    email: 'cristine.black@example.com',
    fullName: "Cristine Black",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    email: 'heera.prashad@example.com',
    fullName: "Heera Prashad",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    email: 'william.sandre@example.com',
    fullName: "William Sandre",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    email: 'henry.jackson@example.com',
    fullName: "Henry Jackson",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    email: 'kick.buttowski@example.com',
    fullName: "Kick Buttowski",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg"
  },
  {
    email: 'dean.awesome@example.com',
    fullName: "Dean Awesome",
    password: '123456',
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg"
  },
]

const seedDatabase = async () => {
  try{
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully!");
  }
  catch(err){
    console.error("Error seeding database", error);
  }
};

seedDatabase();