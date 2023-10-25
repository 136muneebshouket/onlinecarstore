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
    EMAIL_HOST: "smtp.gmail.com",
    EMAIL_PORT: 587,
    EMAIL_USER: "muneeb.office136@gmail.com",
    EMAIl_PASS: "earrmqwgljbhkgas",
    EMAIl_FROM: "jakayla.toy@ethereal.email",
    // APP_PRESET_NAME:"muneeb",
    // APP_CLOUD_NAME:"dgyh5n01r",
    // APP_CLOUD_API_KEY:'319433391283272',
    // APP_SECRET_KEY:'r3aoC0X_ruUgq-rNqpEkPje_gsk',
    PUBLIC_KEY: "public_WOcX0On81i5aCNQXgjCYQmA9OFY=",
    PRIVATEKEY: "private_SRKhBOqRvoKrZ6CUDARN7Ed8tdM=",
    URLENDPOINT: "https://ik.imagekit.io/lxtg60t67",



     Host:"http://localhost:3000",
     GOOGLE_CLIENT_ID:'181411319845-4n9oh7qvmujl7790mh65r7vcf85qa6p8.apps.googleusercontent.com',
     GOOGLE_CLIENT_SECRET:'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'

  },
  webpack: config => {
    /* On `node-fetch` v2, that `supabase-js` uses,
    `encoding` package was optionally required for `.textConverted`
    which means it wasn't in `node-fetch` deps.
    See: https://github.com/node-fetch/node-fetch/issues/412.
    Since `encoding` is not part of the deps by default, when using with webpack,
    it will raise a warning message.
    This can be ignored as it doesn't prevent anything to work well. */
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { file: /Components\/stylecomponents\/Usedcar_dropdown\.js/ },
    ];
  
    return config;
  }
 
};

module.exports = nextConfig;
