import IntaSend from "intasend-node";

if (!process.env.INSTASEND_PUBLISHABLE_KEY) {
  throw new Error("INSTASEND_PUBLISHABLE_KEY is required");
}

if (!process.env.INSTASEND_SECRET_KEY) {
  throw new Error("INSTASEND_SECRET_KEY is required");
}

const instasend = new IntaSend(
  process.env.INSTASEND_PUBLISHABLE_KEY,
  process.env.INSTASEND_SECRET_KEY,
  process.env.NODE_ENV !== "production" // Automatically use test mode in development
);

export default instasend;
