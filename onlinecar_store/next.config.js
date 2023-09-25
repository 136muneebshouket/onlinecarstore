/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add other domains if needed
    domains: ['ik.imagekit.io'], // Add other domains if needed
  },
  reactStrictMode: true,
  env: {
    // DB_URI: "mongodb+srv://mirza:mirza@cluster0.m1s8oai.mongodb.net/Online_cars",
    DB_URI: "mongodb://mirza:mirza@ac-ujisrx2-shard-00-00.m1s8oai.mongodb.net:27017,ac-ujisrx2-shard-00-01.m1s8oai.mongodb.net:27017,ac-ujisrx2-shard-00-02.m1s8oai.mongodb.net:27017/Online_cars?replicaSet=atlas-vf9a5g-shard-0&ssl=true&authSource=admin",
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

    APP_PRESET_NAME:"muneeb",
    APP_CLOUD_NAME:"dgyh5n01r",
    APP_CLOUD_API_KEY:'319433391283272',
    APP_SECRET_KEY:'r3aoC0X_ruUgq-rNqpEkPje_gsk',


     Host:"http://localhost:3000",


  },
 
};

module.exports = nextConfig;
