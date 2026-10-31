import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectDB = async (req, res) => {
  try {
    await prisma.$connect();
    console.log("PostgreSQL connected successfully");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error);
    process.exit(1);
  }
};

export default prisma;
