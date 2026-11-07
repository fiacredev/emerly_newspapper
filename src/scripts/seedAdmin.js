import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const seedAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully.");

    const email = "admin@news.com";

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Administrator already exists.");
      return;
    }

    const password = "ChangeThisPassword123!";

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await User.create({
      name: "System Administrator",
      email,
      password: hashedPassword,
      role: "admin",
      isActive: true
    });

    console.log("Administrator created successfully.");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);

  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedAdmin();