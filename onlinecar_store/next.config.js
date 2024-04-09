/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add other domains if needed
    domains: ["ik.imagekit.io"], // Add other domains if needed
  },
  reactStrictMode: true,
  env: {
    DB_URI:
      "mongodb+srv://carselectionpk:CARselection%407176@cluster0.iowhdko.mongodb.net/Online_cars",
    // DB_URI: "mongodb://mirza:mirza@ac-ujisrx2-shard-00-00.m1s8oai.mongodb.net:27017,ac-ujisrx2-shard-00-01.m1s8oai.mongodb.net:27017,ac-ujisrx2-shard-00-02.m1s8oai.mongodb.net:27017/Online_cars?replicaSet=atlas-vf9a5g-shard-0&ssl=true&authSource=admin",
    NEXTAUTH_SECRET: "codingwithmuneeb",

    // carselection email send credentials
    EMAIL_HOST: "smtp.gmail.com",
    EMAIL_PORT: 587,
    EMAIL_USER: "carselection.pk@gmail.com",
    EMAIl_PASS: "necl xzew imng tuuz",
    EMAIl_FROM: "jakayla.toy@ethereal.email",

    // carselection imagekit credentials
    PUBLIC_KEY: "public_+6aCO0GalAQwQzxDKgvMYr2cHo8=",
    PRIVATEKEY: "private_fonoeWbVN0dGWGWkoB9vMM7FiE4=",
    URLENDPOINT: "https://ik.imagekit.io/uaoenucv4i",
    // carselection google auth credentials
    GOOGLE_CLIENT_ID:"418417179637-g71g8g6090oa20adu4d0aahat8sm1al7.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",

   

    Host: "https://carselection.pk",
    // Host: "https://car-selection.vercel.app",
    // Host:"http://localhost:3000",
  },
  webpack: (config) => {
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
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://carselection.pk",
          }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
