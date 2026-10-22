import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import User from "@/models/User";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

async function main() {
  const [email, plainPassword, name] = process.argv.slice(2);

  if (!email || !plainPassword || !name) {
    throw new Error(
      'Usage: npx tsx scripts/create-admin.ts <email> <password> <name>'
    );
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env.local");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const hashedPassword = await bcrypt.hash(plainPassword, 12);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword, // Important: required field
    role: "SUPER_ADMIN",
  });

  console.log("Admin created successfully:", user.email);

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => {});
  process.exitCode = 1;
});