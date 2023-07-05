/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_URI: "mongodb+srv://mirza:mirza@cluster0.m1s8oai.mongodb.net/Online_cars",
    NEXTAUTH_SECRET: "codingwithmuneeb",
  },
}

module.exports = nextConfig
