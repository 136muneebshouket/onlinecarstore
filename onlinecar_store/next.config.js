/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add other domains if needed
  },
  reactStrictMode: true,
  env: {
    DB_URI:
      "mongodb+srv://mirza:mirza@cluster0.m1s8oai.mongodb.net/Online_cars",
    NEXTAUTH_SECRET: "codingwithmuneeb",
    // EMAIL_HOST: "smtp.gmail.com",
    // EMAIL_PORT: 587,

    // EMAIL_USER: "mirxa136@gmail.com",
    // EMAIl_PASS: "Mm136952847",
    // EMAIl_FROM: "mirxa136@gmail.com",
    EMAIL_HOST: "'smtp.ethereal.email',",
    EMAIL_PORT: 587,

    EMAIL_USER: "jakayla.toy@ethereal.email",
    EMAIl_PASS: "4Z97DRrRTBEfKyU7vJ",
    EMAIl_FROM: "jakayla.toy@ethereal.email",
     Host:" http://localhost:3000"

  },
};

module.exports = nextConfig;
