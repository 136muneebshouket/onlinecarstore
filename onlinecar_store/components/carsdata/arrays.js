

const carData = [
  {
    name: "Toyota",
    models: [
      {
        name: "Corolla",
        variants: [
          {
            duration: "2014 - 2023",
            variant_name: "Altis Grande X CVT-i 1.8 Beige Interior",
            specs: "1800cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Altis X 1.8",
            specs: "1800cc, Manual, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Altis X Automatic 1.6",
            specs: "1600cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Altis X CVT-i 1.8",
            specs: "1800cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Altis X Manual 1.6",
            specs: "1600cc, Manual, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Altis Grande X CVT-i 1.8 Black Interior",
            specs: "1800cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Altis X Automatic 1.6 Special Edition",
            specs: "1600cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Altis 1.6 X CVT-i",
            specs: "1600cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Altis 1.6 X CVT-i Special Edition",
            specs: "1600cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Yaris",
        variants: [
          {
            duration: "2020 - 2023",
            variant_name: "GLI MT 1.3",
            specs: "1329cc, Manual, Petrol",
          },
          {
            duration: "2020 - 2023",
            variant_name: "GLI CVT 1.3",
            specs: "1329cc, Automatic, Petrol",
          },
          {
            duration: "2020 - 2023",
            variant_name: "ATIV MT 1.3",
            specs: "1329cc, Manual, Petrol",
          },
          {
            duration: "2020 - 2023",
            variant_name: "ATIV CVT 1.3",
            specs: "1329cc, Automatic, Petrol",
          },
          {
            duration: "2020 - 2023",
            variant_name: "ATIV X MT 1.5",
            specs: "1496cc, Manual, Petrol",
          },
          {
            duration: "2020 - 2023",
            variant_name: "ATIV X CVT 1.5",
            specs: "1496cc, Automatic, Petrol",
          },
          {
            duration: "2020 - 2023",
            variant_name: "AERO CVT 1.3",
            specs: "1329cc, Automatic, Petrol",
          },
          {
            duration: "2020 - 2023",
            variant_name: "AERO CVT 1.5",
            specs: "1496cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Aqua",
        variants: [
          {
            duration: "2021 - 2023",
            variant_name: "Z",
            specs: "1500cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Fortuner",
        variants: [
          {
            duration: "2021 - 2023",
            variant_name: "2.7 V",
            specs: "2694cc, Automatic, Petrol",
          },
          {
            duration: "2021 - 2023",
            variant_name: "2.8 Sigma 4",
            specs: "2755cc, Automatic, Diesel",
          },
          {
            duration: "2021 - 2023",
            variant_name: "2.7 G",
            specs: "2694cc, Automatic, Petrol",
          },
          {
            duration: "2021 - 2023",
            variant_name: "Legender",
            specs: "2755cc, Automatic, Diesel",
          },
          {
            duration: "2021 - 2023",
            variant_name: "GR-S",
            specs: "2755cc, Automatic, Diesel",
          },
        ],
      },
      {
        name: "Prius",
        variants: [
          {
            duration: "2015 - 2023",
            variant_name: "PHV GR Sport",
            specs: "1797cc, Automatic, Hybrid",
          },
        ],
      },

      {
        name: "86",
        variants: [
          {
            duration: "2021 - 2023",
            variant_name: "GR",
            specs: "2387cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Allex",
        variants: [],
      },
      {
        name: "Allion",
        variants: [],
      },
      {
        name: "Alphard",
        variants: [
          {
            duration: "2015 - 2023",
            variant_name: "3.5",
            specs: "3456cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Alphard G",
        variants: [],
      },
      {
        name: "Alphard Hybrid",
        variants: [],
      },
      {
        name: "Alphard V",
        variants: [],
      },
      {
        name: "Altezza",
        variants: [],
      },
      {
        name: "Aristo",
        variants: [],
      },
      {
        name: "Auris",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "1.8 Hybrid",
            specs: "1800cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Avalon",
        variants: [],
      },
      {
        name: "Avanza",
        variants: [],
      },
      {
        name: "Avensis",
        variants: [],
      },
      {
        name: "Aygo",
        variants: [],
      },
      {
        name: "B B",
        variants: [],
      },
      {
        name: "Belta",
        variants: [],
      },
      {
        name: "Biyana",
        variants: [],
      },
      {
        name: "Brevis",
        variants: [],
      },
      {
        name: "C-HR",
        variants: [
          {
            duration: "2016 - 2023",
            variant_name: "S",
            specs: "1800cc, Automatic, Hybrid",
          },
          {
            duration: "2016 - 2023",
            variant_name: "Koba",
            specs: "1798cc, Automatic, Hybrid",
          },
          {
            duration: "2016 - 2023",
            variant_name: "G",
            specs: "1797cc, Automatic, Hybrid",
          },
          {
            duration: "2016 - 2023",
            variant_name: "G-LED",
            specs: "1797cc, Automatic, Hybrid",
          },
          {
            duration: "2016 - 2023",
            variant_name: "S-LED",
            specs: "1797cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Caldina",
        variants: [],
      },
      {
        name: "Cami",
        variants: [],
      },
      {
        name: "Camry",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "Low Grade",
            specs: "2487cc, Automatic, Petrol",
          },
          {
            duration: "2018 - 2023",
            variant_name: "High Grade",
            specs: "2487cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Carina",
        variants: [],
      },
      {
        name: "Celica",
        variants: [],
      },
      {
        name: "Celsior",
        variants: [],
      },
      {
        name: "Century",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "5.0",
            specs: "4968cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Chaser",
        variants: [],
      },
      {
        name: "Coaster",
        variants: [
          {
            duration: "2017 - 2023",
            variant_name: "29 Seater F/L",
            specs: "4009cc, Manual, Diesel",
          },
        ],
      },
      {
        name: "Corolla Assista",
        variants: [],
      },
      {
        name: "Corolla Axio",
        variants: [],
      },
      {
        name: "Corolla Cross",
        variants: [
          {
            duration: "2021 - 2023",
            variant_name: "Premium High Grade",
            specs: "1798cc, Automatic, Hybrid",
          },
          {
            duration: "2021 - 2023",
            variant_name: "Smart Mid Grade",
            specs: "1798cc, Automatic, Hybrid",
          },
          {
            duration: "2021 - 2023",
            variant_name: "Low Grade",
            specs: "1798cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Corolla Fielder",
        variants: [],
      },
      {
        name: "Corolla Hatchback",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "Sports",
            specs: "1998cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Corona",
        variants: [],
      },
      {
        name: "Cressida",
        variants: [],
      },
      {
        name: "Cresta",
        variants: [],
      },
      {
        name: "Crown",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "RS Advance",
            specs: "2500cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Cynos",
        variants: [],
      },
      {
        name: "Duet",
        variants: [],
      },
      {
        name: "Dyna",
        variants: [],
      },
      {
        name: "Echo",
        variants: [],
      },
      {
        name: "Ecotec",
        variants: [],
      },
      {
        name: "Esquire",
        variants: [
          {
            duration: "2014 - 2023",
            variant_name: "Gi",
            specs: "1797cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Estima",
        variants: [],
      },
      {
        name: "Fj Cruiser",
        variants: [],
      },
      {
        name: "Gaia",
        variants: [],
      },
      {
        name: "Harrier",
        variants: [
          {
            duration: "2020 - 2023",
            variant_name: "2.0 LUXURY",
            specs: "1987cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Hiace",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "Standard Roof",
            specs: "2755cc, Manual, Diesel",
          },
          {
            duration: "2019 - 2023",
            variant_name: "High Roof Commuter",
            specs: "2755cc, Manual, Diesel",
          },
          {
            duration: "2019 - 2023",
            variant_name: "High Roof Tourer",
            specs: "2755cc, Automatic, Diesel",
          },
          {
            duration: "2019 - 2023",
            variant_name: "Luxury Wagon Low Grade",
            specs: "2755cc, Automatic, Diesel",
          },
          {
            duration: "2019 - 2023",
            variant_name: "Luxury Wagon High Grade",
            specs: "2755cc, Automatic, Diesel",
          },
        ],
      },
      {
        name: "Highlander",
        variants: [
          {
            duration: "2020 - 2023",
            variant_name: "Platinum",
            specs: "3487cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Hilux",
        variants: [
          {
            duration: "2021 - 2023",
            variant_name: "Revo V Automatic 2.8",
            specs: "2755cc, Automatic, Diesel",
          },
          {
            duration: "2021 - 2023",
            variant_name: "Revo G Automatic 2.8",
            specs: "2755cc, Automatic, Diesel",
          },
          {
            duration: "2021 - 2023",
            variant_name: "Revo G 2.8",
            specs: "2755cc, Manual, Diesel",
          },
          {
            duration: "2021 - 2023",
            variant_name: "E",
            specs: "2755cc, Manual, Diesel",
          },
          {
            duration: "2021 - 2023",
            variant_name: "Revo Rocco",
            specs: "2755cc, Automatic, Diesel",
          },
          {
            duration: "2021 - 2023",
            variant_name: "Revo GR-S",
            specs: "2755cc, Automatic, Diesel",
          },
        ],
      },
      {
        name: "Innova",
        variants: [
          {
            duration: "2015 - 2023",
            variant_name: "Z",
            specs: "2694cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "iQ",
        variants: [],
      },
      {
        name: "ISIS",
        variants: [],
      },
      {
        name: "IST",
        variants: [],
      },
      {
        name: "Kluger",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "GX",
            specs: "5cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Land Cruiser",
        variants: [
          {
            duration: "2022 - 2023",
            variant_name: "EXR 3.5L",
            specs: "3445cc, Automatic, Petrol",
          },
          {
            duration: "2022 - 2023",
            variant_name: "GXR 3.5L",
            specs: "3444cc, Automatic, Petrol",
          },
          {
            duration: "2022 - 2023",
            variant_name: "ZX Gasoline 3.5L",
            specs: "3445cc, Automatic, Petrol",
          },
          {
            duration: "1984 - 2023",
            variant_name: "Not Specified",
            specs: "Not Specified",
          },
        ],
      },
      {
        name: "Levin",
        variants: [],
      },
      {
        name: "Lite Ace",
        variants: [],
      },
      {
        name: "Lucida",
        variants: [],
      },
      {
        name: "Mark II",
        variants: [],
      },
      {
        name: "Mark X",
        variants: [],
      },
      {
        name: "Matrix",
        variants: [],
      },
      {
        name: "MR2",
        variants: [],
      },
      {
        name: "Noah",
        variants: [
          {
            duration: "2014 - 2023",
            variant_name: "G",
            specs: "1797cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Other",
        variants: [],
      },
      {
        name: "Passo",
        variants: [
          {
            duration: "2016 - 2023",
            variant_name: "X",
            specs: "996cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "X L Package",
            specs: "996cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "X S",
            specs: "996cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "X L Package S",
            specs: "996cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "X G Package",
            specs: "996cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "Moda G",
            specs: "996cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "Moda S",
            specs: "996cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "Moda",
            specs: "996cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Pickup",
        variants: [],
      },
      {
        name: "Pixis Epoch",
        variants: [
          {
            duration: "2017 - 2023",
            variant_name: "B",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "L",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "X",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "G",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Pixis Space",
        variants: [],
      },
      {
        name: "Pixis Van",
        variants: [],
      },
      {
        name: "Platz",
        variants: [],
      },
      {
        name: "Porte",
        variants: [],
      },
      {
        name: "Prado",
        variants: [
          {
            duration: "2009 - 2023",
            variant_name: "TX 2.7",
            specs: "2693cc, Automatic, Petrol",
          },
          {
            duration: "2009 - 2023",
            variant_name: "TX Limited 2.7",
            specs: "2693cc, Automatic, Petrol",
          },
          {
            duration: "2009 - 2023",
            variant_name: "TZ 4.0",
            specs: "3956cc, Automatic, Petrol",
          },
          {
            duration: "2009 - 2023",
            variant_name: "VX 4.0",
            specs: "4000cc, Automatic, Petrol",
          },
          {
            duration: "2009 - 2023",
            variant_name: "VX 3.0",
            specs: "3000cc, Automatic, Diesel",
          },
          {
            duration: "2009 - 2023",
            variant_name: "TZ G 4.0",
            specs: "3956cc, Automatic, Petrol",
          },
          {
            duration: "2009 - 2023",
            variant_name: "TX 4.0",
            specs: "3955cc, Automatic, Petrol",
          },
          {
            duration: "2009 - 2023",
            variant_name: "TX 3.0D",
            specs: "2982cc, Manual, Diesel",
          },
          {
            duration: "2009 - 2023",
            variant_name: "TX L Package 2.7",
            specs: "2693cc, Automatic, Petrol",
          },
          {
            duration: "2009 - 2023",
            variant_name: "TX 2.8 D AT",
            specs: "2800cc, Automatic, Diesel",
          },
          {
            duration: "2009 - 2023",
            variant_name: "TX 2.8 D MT",
            specs: "2800cc, Manual, Diesel",
          },
          {
            duration: "2009 - 2023",
            variant_name: "TZ-G 2.8L Diesel",
            specs: "2800cc, Automatic, Diesel",
          },
        ],
      },
      {
        name: "Premio",
        variants: [],
      },
      {
        name: "Previa",
        variants: [],
      },
      {
        name: "Prius Alpha",
        variants: [],
      },
      {
        name: "Probox",
        variants: [],
      },
      {
        name: "Ractis",
        variants: [],
      },
      {
        name: "Raize",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "Z",
            specs: "1000cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Raum",
        variants: [],
      },
      {
        name: "Rav4",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "AWD Hybrid",
            specs: "2500cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Roomy",
        variants: [
          {
            duration: "2016 - 2023",
            variant_name: "XS",
            specs: "1000cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Rumion",
        variants: [],
      },
      {
        name: "Runx",
        variants: [],
      },
      {
        name: "Rush",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "G M/T",
            specs: "1496cc, Manual, Petrol",
          },
          {
            duration: "2018 - 2023",
            variant_name: "G A/T",
            specs: "1496cc, Automatic, Petrol",
          },
          {
            duration: "2018 - 2023",
            variant_name: "S",
            specs: "1496cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Sai",
        variants: [],
      },
      {
        name: "Sequoia",
        variants: [],
      },
      {
        name: "Sera",
        variants: [],
      },
      {
        name: "Sienta",
        variants: [],
      },
      {
        name: "Soarer",
        variants: [],
      },
      {
        name: "Spacio",
        variants: [],
      },
      {
        name: "Spade",
        variants: [],
      },
      {
        name: "Sprinter",
        variants: [],
      },
      {
        name: "Starlet",
        variants: [],
      },
      {
        name: "Succeed",
        variants: [],
      },
      {
        name: "Supra",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "3.0 Premium",
            specs: "3000cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Surf",
        variants: [],
      },
      {
        name: "Tacoma",
        variants: [
          {
            duration: "2023 - 2023",
            variant_name: "SR",
            specs: "3500cc, Automatic, Petrol",
          },
          {
            duration: "2023 - 2023",
            variant_name: "TRD Pro",
            specs: "3500cc, Automatic, Petrol",
          },
          {
            duration: "2015 - 2023",
            variant_name: "TRD Sport",
            specs: "3500cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Tank",
        variants: [],
      },
      {
        name: "Tercel",
        variants: [],
      },
      {
        name: "Town Ace",
        variants: [
          {
            duration: "2008 - 2023",
            variant_name: "1.5 DX",
            specs: "1498cc, Manual, Petrol",
          },
        ],
      },
      {
        name: "Toyo Ace",
        variants: [],
      },
      {
        name: "Tundra",
        variants: [],
      },
      {
        name: "Urban Cruiser",
        variants: [
          {
            duration: "2020 - 2023",
            variant_name: "Premium AT",
            specs: "1462cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Van",
        variants: [],
      },
      {
        name: "Vanguard",
        variants: [],
      },
      {
        name: "Vellfire",
        variants: [
          {
            duration: "2015 - 2023",
            variant_name: "2.5",
            specs: "2500cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Verossa",
        variants: [],
      },
      {
        name: "Vios",
        variants: [
          {
            duration: "2013 - 2023",
            variant_name: "1.3 S",
            specs: "1300cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Vitz",
        variants: [
          {
            duration: "2017 - 2023",
            variant_name: "F Safety Edition III",
            specs: "1329cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Voxy",
        variants: [
          {
            duration: "2021 - 2023",
            variant_name: "X",
            specs: "1986cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "2.0 CVT",
            specs: "1986cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Will",
        variants: [],
      },
      {
        name: "Wish",
        variants: [],
      },
      {
        name: "Yaris Cross",
        variants: [
          {
            duration: "2020 - 2023",
            variant_name: "Hybrid Z",
            specs: "1500cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Yaris Hatchback",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "1.5L SE+",
            specs: "1497cc, Automatic, Petrol",
          },
        ],
      },
    ],
  },
  {
    name: "Suzuki",
    models: [
      {
        name: "Alto",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "VX",
            specs: "658cc, Manual, Petrol",
          },
          {
            duration: "2019 - 2023",
            variant_name: "VXR",
            specs: "658cc, Manual, Petrol",
          },
          {
            duration: "2019 - 2023",
            variant_name: "VXL AGS",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2019 - 2023",
            variant_name: "VXR AGS",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Cultus",
        variants: [
          {
            duration: "2017 - 2023",
            variant_name: "VXL",
            specs: "998cc, Manual, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "VXR",
            specs: "998cc, Manual, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "Auto Gear Shift",
            specs: "998cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Wagon R",
        variants: [
          {
            duration: "2017 - 2023",
            variant_name: "Hybrid FZ",
            specs: "657cc, Automatic, Hybrid",
          },
          {
            duration: "2017 - 2023",
            variant_name: "Hybrid FX",
            specs: "658cc, Automatic, Hybrid",
          },
          {
            duration: "2014 - 2023",
            variant_name: "VXR",
            specs: "998cc, Manual, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "VXL",
            specs: "998cc, Manual, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "AGS",
            specs: "998cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Swift",
        variants: [
          {
            duration: "2022 - 2023",
            variant_name: "GL Manual",
            specs: "1200cc, Manual, Petrol",
          },
          {
            duration: "2022 - 2023",
            variant_name: "GLX CVT",
            specs: "1200cc, Automatic, Petrol",
          },
          {
            duration: "2022 - 2023",
            variant_name: "GL CVT",
            specs: "1200cc, Automatic, Petrol",
          },
          {
            duration: "2022 - 2023",
            variant_name: "GL CVT Limited Edition",
            specs: "1200cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "GL Manual",
            specs: "1200cc, Manual, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "GLX CVT",
            specs: "1200cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "GL CVT",
            specs: "1200cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "GL CVT Limited Edition",
            specs: "1200cc, Automatic, Petrol",
          },
        ],
      },

      {
        name: "Aerio",
        variants: [],
      },
      {
        name: "Alto Lapin",
        variants: [],
      },
      {
        name: "APV",
        variants: [
          {
            duration: "2005 - 2023",
            variant_name: "GLX",
            specs: "1590cc, Manual, Petrol",
          },
        ],
      },
      {
        name: "Baleno",
        variants: [],
      },
      {
        name: "Bolan",
        variants: [
          {
            duration: "2012 - 2023",
            variant_name: "VX Euro II",
            specs: "796cc, Manual, Petrol",
          },
          {
            duration: "2012 - 2023",
            variant_name: "Cargo Van Euro II",
            specs: "796cc, Manual, Petrol",
          },
        ],
      },
      {
        name: "Cappuccino",
        variants: [],
      },
      {
        name: "Carry",
        variants: [],
      },
      {
        name: "Celerio",
        variants: [
          {
            duration: "2014 - 2023",
            variant_name: "VXi",
            specs: "998cc, Manual, Petrol",
          },
        ],
      },
      {
        name: "Cervo",
        variants: [],
      },
      {
        name: "Ciaz",
        variants: [],
      },
      {
        name: "Ertiga",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "ZXI+",
            specs: "1462cc, Manual, Hybrid",
          },
        ],
      },
      {
        name: "Escudo",
        variants: [],
      },
      {
        name: "Every",
        variants: [
          {
            duration: "2005 - 2023",
            variant_name: "Join",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2005 - 2023",
            variant_name: "PC",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Every Wagon",
        variants: [],
      },
      {
        name: "FX",
        variants: [],
      },
      {
        name: "Gn250",
        variants: [],
      },
      {
        name: "Hustler",
        variants: [],
      },
      {
        name: "Ignis",
        variants: [
          {
            duration: "2016 - 2023",
            variant_name: "Alpha",
            specs: "1197cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Jimny",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "GA MT",
            specs: "1462cc, Manual, Petrol",
          },
          {
            duration: "2019 - 2023",
            variant_name: "Turbo",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Jimny Sierra",
        variants: [],
      },
      {
        name: "Kei",
        variants: [],
      },
      {
        name: "Khyber",
        variants: [],
      },
      {
        name: "Kizashi",
        variants: [],
      },
      {
        name: "Landy",
        variants: [
          {
            duration: "2016 - 2023",
            variant_name: "S",
            specs: "1997cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Liana",
        variants: [],
      },
      {
        name: "Lj80",
        variants: [],
      },
      {
        name: "Margalla",
        variants: [],
      },
      {
        name: "Mega Carry Xtra",
        variants: [],
      },
      {
        name: "Mehran",
        variants: [],
      },
      {
        name: "MR Wagon",
        variants: [],
      },
      {
        name: "Other",
        variants: [],
      },
      {
        name: "Palette",
        variants: [],
      },
      {
        name: "Palette Sw",
        variants: [],
      },
      {
        name: "Potohar",
        variants: [],
      },
      {
        name: "Ravi",
        variants: [
          {
            duration: "1995 - 2023",
            variant_name: "Euro II",
            specs: "796cc, Manual, Petrol",
          },
        ],
      },
      {
        name: "S Cross",
        variants: [
          {
            duration: "2015 - 2023",
            variant_name: "SZ5",
            specs: "1373cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Samurai",
        variants: [],
      },
      {
        name: "Scrum",
        variants: [],
      },
      {
        name: "Sj410",
        variants: [],
      },
      {
        name: "Solio",
        variants: [
          {
            duration: "2020 - 2023",
            variant_name: "G",
            specs: "1242cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Solio Bandit",
        variants: [],
      },
      {
        name: "Spacia",
        variants: [
          {
            duration: "2017 - 2023",
            variant_name: "X",
            specs: "658cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Splash",
        variants: [],
      },
      {
        name: "Sx4",
        variants: [],
      },
      {
        name: "Twin",
        variants: [],
      },
      {
        name: "Vitara",
        variants: [],
      },
      {
        name: "Xbee",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "MX",
            specs: "996cc, Automatic, Hybrid",
          },
          {
            duration: "2018 - 2023",
            variant_name: "MZ",
            specs: "996cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "XL7",
        variants: [],
      },
    ],
  },
  {
    name: "Honda",
    models: [
      {
        name: "City",
        variants: [
          {
            duration: "2021 - 2023",
            variant_name: "1.2L M/T",
            specs: "1199cc, Manual, Petrol",
          },
          {
            duration: "2021 - 2023",
            variant_name: "1.2L CVT",
            specs: "1199cc, Automatic, Petrol",
          },
          {
            duration: "2021 - 2023",
            variant_name: "1.5L CVT",
            specs: "1497cc, Automatic, Petrol",
          },
          {
            duration: "2021 - 2023",
            variant_name: "1.5L ASPIRE M/T",
            specs: "1497cc, Manual, Petrol",
          },
          {
            duration: "2021 - 2023",
            variant_name: "1.5L ASPIRE CVT",
            specs: "1497cc, Automatic, Petrol",
          },
          {
            duration: "2019 - 2023",
            variant_name: "RS",
            specs: "1500cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Civic",
        variants: [
          {
            duration: "2022 - 2023",
            variant_name: "Standard",
            specs: "1500cc, Automatic, Petrol",
          },
          {
            duration: "2022 - 2023",
            variant_name: "Oriel",
            specs: "1500cc, Automatic, Petrol",
          },
          {
            duration: "2022 - 2023",
            variant_name: "RS",
            specs: "1500cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Vezel",
        variants: [
          {
            duration: "2021 - 2023",
            variant_name: "G",
            specs: "1500cc, Automatic, Petrol",
          },
          {
            duration: "2021 - 2023",
            variant_name: "e-HEV X",
            specs: "1500cc, Automatic, Hybrid",
          },
          {
            duration: "2021 - 2023",
            variant_name: "e-HEV Z",
            specs: "1500cc, Automatic, Hybrid",
          },
          {
            duration: "2021 - 2023",
            variant_name: "e-HEV Play",
            specs: "1500cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "N Wgn",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "G",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Accord",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "1.5L VTEC Turbo",
            specs: "1498cc, Automatic, Petrol",
          },
        ],
      },

      {
        name: "Accord Tourer",
        variants: [],
      },
      {
        name: "Acty",
        variants: [],
      },
      {
        name: "Acura",
        variants: [],
      },
      {
        name: "Airwave",
        variants: [],
      },
      {
        name: "Beat",
        variants: [],
      },
      {
        name: "BR-V",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "i-VTEC S",
            specs: "1497cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Brio",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "1.2 i-VTEC",
            specs: "1200cc, Manual, Petrol",
          },
        ],
      },
      {
        name: "Clarity",
        variants: [],
      },
      {
        name: "Concerto",
        variants: [],
      },
      {
        name: "Cr X",
        variants: [],
      },
      {
        name: "CR-V",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "2.0 CVT",
            specs: "1997cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "CR-Z Sports Hybrid",
        variants: [],
      },
      {
        name: "Cross Road",
        variants: [],
      },
      {
        name: "Element",
        variants: [],
      },
      {
        name: "Elysion",
        variants: [
          {
            duration: "2015 - 2023",
            variant_name: "2.4",
            specs: "2354cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Ferio",
        variants: [],
      },

      {
        name: "Fit",
        variants: [
          {
            duration: "2020 - 2023",
            variant_name: "1.5 EXECUTIVE",
            specs: "1498cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Fit Aria",
        variants: [],
      },
      {
        name: "FR-V",
        variants: [],
      },
      {
        name: "Freed",
        variants: [
          {
            duration: "2016 - 2023",
            variant_name: "Hybrid B",
            specs: "1496cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "Hybrid G Honda Sensing",
            specs: "1496cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "Hybrid EX",
            specs: "1496cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "Hybrid Modulo X Honda Sensing",
            specs: "1496cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "+ Hybrid B",
            specs: "1496cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "+ Hybrid G Honda Sensing",
            specs: "1496cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "+ Hybrid EX",
            specs: "1496cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Grace Hybrid",
        variants: [],
      },
      {
        name: "Horizon",
        variants: [],
      },
      {
        name: "HR-V",
        variants: [
          {
            duration: "2022 - 2023",
            variant_name: "VTi",
            specs: "1498cc, Automatic, Petrol",
          },
          {
            duration: "2022 - 2023",
            variant_name: "VTi-S",
            specs: "1498cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Insight",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "Touring",
            specs: "1498cc, Automatic, Hybrid",
          },
          {
            duration: "2018 - 2023",
            variant_name: "EX",
            specs: "1498cc, Automatic, Hybrid",
          },
          {
            duration: "2018 - 2023",
            variant_name: "EX Black Style",
            specs: "1498cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Insight Exclusive",
        variants: [],
      },
      {
        name: "Inspire",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "1.5L",
            specs: "1498cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Integra",
        variants: [],
      },
      {
        name: "Jade",
        variants: [],
      },
      {
        name: "Jazz",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "1.5L",
            specs: "1498cc, Automatic, Petrol",
          },
          {
            duration: "2020 - 2023",
            variant_name: "Crosstar EX",
            specs: "1498cc, Automatic, Hybrid",
          },
        ],
      },
      {
        name: "Life",
        variants: [],
      },
      {
        name: "Mobilio",
        variants: [
          {
            duration: "2014 - 2023",
            variant_name: "RS",
            specs: "1497cc, Manual, Petrol",
          },
        ],
      },
      {
        name: "N Box",
        variants: [
          {
            duration: "2017 - 2023",
            variant_name: "Slash G",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "Slash X",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "Slash G L Package",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "G Turbo L Package",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "Slash X Turbo Package",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "N One",
        variants: [
          {
            duration: "2020 - 2023",
            variant_name: "Premium Tourer",
            specs: "660cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "N-Van",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "G",
            specs: "658cc, Manual, Petrol",
          },
        ],
      },
      {
        name: "Odyssey",
        variants: [
          {
            duration: "2013 - 2023",
            variant_name: "LX",
            specs: "3487cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Other",
        variants: [],
      },
      {
        name: "Partner",
        variants: [],
      },
      {
        name: "Passport",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "Touring",
            specs: "3471cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Prelude",
        variants: [],
      },
      {
        name: "S2000",
        variants: [],
      },
      {
        name: "S660",
        variants: [],
      },
      {
        name: "Spike",
        variants: [
          {
            duration: "2016 - 2023",
            variant_name: "+ Hybrid EX",
            specs: "1496cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Stepwagon",
        variants: [],
      },
      {
        name: "Stepwagon Spada",
        variants: [],
      },
      {
        name: "Stream",
        variants: [],
      },
      {
        name: "Thats",
        variants: [],
      },
      {
        name: "Today",
        variants: [],
      },
      {
        name: "Vamos",
        variants: [],
      },
      {
        name: "Vamos Hobio",
        variants: [],
      },
      {
        name: "Z",
        variants: [],
      },
      {
        name: "Zest",
        variants: [],
      },
    ],
  },
  {
    name: "Daihatsu",
    models: [
      {
        name: "Cuore",
        variants: [],
      },
      {
        name: "Mira",
        variants: [
          {
            duration: "2017 - 2023",
            variant_name: "B",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "L",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "X",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "G SA III",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "X SA lll",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "LSA 3",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Move",
        variants: [
          {
            duration: "2014 - 2023",
            variant_name: "X",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "L",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Custom X",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Custom RS",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Custom RS SA",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "X Turbo",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Hijet",
        variants: [],
      },
      {
        name: "Charade",
        variants: [],
      },
      {
        name: "Others",
        variants: [],
      },
      {
        name: "Atrai Wagon",
        variants: [],
      },
      {
        name: "Bego",
        variants: [],
      },
      {
        name: "Bezza",
        variants: [
          {
            duration: "2016 - 2023",
            variant_name: "Premium X 1.3",
            specs: "1300cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Boon",
        variants: [],
      },
      {
        name: "Cast",
        variants: [
          {
            duration: "2015 - 2023",
            variant_name: "Activa X",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2015 - 2023",
            variant_name: "Activa G SA III",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2015 - 2023",
            variant_name: "Activa G Turbo",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2015 - 2023",
            variant_name: "Style X",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2015 - 2023",
            variant_name: "Style G SA III",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2015 - 2023",
            variant_name: "Style G Turbo",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2015 - 2023",
            variant_name: "Activa X SA III",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2015 - 2023",
            variant_name: "Style X SA III",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2015 - 2023",
            variant_name: "Sport Turbo SA III",
            specs: "0cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Charmant",
        variants: [],
      },
      {
        name: "Consorte",
        variants: [],
      },
      {
        name: "Coo",
        variants: [],
      },
      {
        name: "Copen",
        variants: [
          {
            duration: "2014 - 2023",
            variant_name: "Robe",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Robe S",
            specs: "658cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "X-Play",
            specs: "659cc, Automatic, Petrol",
          },
          {
            duration: "2014 - 2023",
            variant_name: "Cero",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Esse",
        variants: [],
      },
      {
        name: "Feroza",
        variants: [],
      },
      {
        name: "Gran Max",
        variants: [
          {
            duration: "2007 - 2023",
            variant_name: "MT",
            specs: "1496cc, Manual, Petrol",
          },
        ],
      },
      {
        name: "MAX",
        variants: [],
      },
      {
        name: "Mira Cocoa",
        variants: [],
      },
      {
        name: "Mira Gino",
        variants: [],
      },
      {
        name: "Move Canbus",
        variants: [
          {
            duration: "2016 - 2023",
            variant_name: "X",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Move Conte",
        variants: [],
      },
      {
        name: "Move Latte",
        variants: [],
      },
      {
        name: "Naked",
        variants: [],
      },
      {
        name: "Opti",
        variants: [],
      },
      {
        name: "Other",
        variants: [],
      },
      {
        name: "Rocky",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "1.0 R TC",
            specs: "998cc, Automatic, Petrol",
          },
          {
            duration: "2019 - 2023",
            variant_name: "G",
            specs: "996cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Sirion",
        variants: [],
      },
      {
        name: "Sonica",
        variants: [],
      },
      {
        name: "Storia",
        variants: [],
      },
      {
        name: "Taft",
        variants: [],
      },
      {
        name: "Tanto",
        variants: [
          {
            duration: "2019 - 2023",
            variant_name: "X Turbo",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Terios",
        variants: [
          {
            duration: "2017 - 2023",
            variant_name: "4x4",
            specs: "1595cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Terios Kid",
        variants: [],
      },
      {
        name: "Thor",
        variants: [
          {
            duration: "2016 - 2023",
            variant_name: "Custom G Turbo",
            specs: "998cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Wake",
        variants: [
          {
            duration: "2014 - 2023",
            variant_name: "G Turbo",
            specs: "658cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "Xenia",
        variants: [
          {
            duration: "2021 - 2023",
            variant_name: "XI-VVT-I",
            specs: "1500cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "YRV",
        variants: [],
      },
    ],
  },
  {
    name: "Adam",
    models: [
      {
        name: "Boltoro",
        variants: [],
      },
      {
        name: "Revo",
        variants: [],
      },
      {
        name: "Zabardast",
        variants: [],
      },
    ],
  },
  {
    name: "Alfa Romeo",
    models: [
      {
        name: "Giulietta",
        variants: [],
      },
      {
        name: "Mito",
        variants: [],
      },
      {
        name: "Other",
        variants: [],
      },
    ],
  },
  {
    name: "Audi",
    models: [
      {
        name: "A4",
        variants: [
          {
            duration: "2016 - 2023",
            variant_name: "S-Line Competition",
            specs: "1984cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "1.4 TFSI",
            specs: "1395cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "40 TFSI S tronic",
            specs: "2000cc, Automatic, Petrol",
          },
          {
            duration: "2016 - 2023",
            variant_name: "2.0 TFSI Quattro",
            specs: "1984cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "A6",
        variants: [
          {
            duration: "2018 - 2023",
            variant_name: "2.0 TFSI",
            specs: "2000cc, Automatic, Petrol",
          },
          {
            duration: "2018 - 2023",
            variant_name: "45 TFSI quattro S tronic",
            specs: "2000cc, Automatic, Petrol",
          },
          {
            duration: "2018 - 2023",
            variant_name: "40 TFSI S-Line",
            specs: "1987cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "A3",
        variants: [
          {
            duration: "2020 - 2023",
            variant_name: "35 TFSI S tronic",
            specs: "1500cc, Automatic, Petrol",
          },
          {
            duration: "2020 - 2023",
            variant_name: "40 TFSI quattro S tronic",
            specs: "2000cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "A5",
        variants: [
          {
            duration: "2017 - 2023",
            variant_name: "1.4 TFSI Sportback",
            specs: "1395cc, Automatic, Petrol",
          },
          {
            duration: "2017 - 2023",
            variant_name: "40 TFSI quattro S tronic",
            specs: "2000cc, Automatic, Petrol",
          },
        ],
      },
      {
        name: "A8",
        variants: [
            {
              duration: "2017 - 2023",
              variant_name: "55 TFSI quattro Tiptronic",
              specs: "3000cc, Automatic, Petrol"
            }
          ]
      },
      {
        name: "Others",
        variants: [],
      },
      {
        name: "A1",
        variants: [
            {
              duration: "2018 - 2023",
              variant_name: "Sportback S line",
              specs: "999cc, Automatic, Petrol"
            }
          ]
      },
      {
        name: "A7",
        variants: [
            {
              duration: "2018 - 2023",
              variant_name: "40 TFSI quattro S tronic",
              specs: "2000cc, Automatic, Petrol"
            }
          ]
      },
      {
        name: "e-tron",
        variants: [
            {
              duration: "2020 - 2023",
              variant_name: "50 Quattro 230 kW",
              specs: "0hp, Automatic, Electric"
            },
            {
              duration: "2020 - 2023",
              variant_name: "50 Quattro Sportback 230kW",
              specs: "0hp, Automatic, Electric"
            },
            {
              duration: "2020 - 2023",
              variant_name: "55 Quattro 300kW",
              specs: "0hp, Automatic, Electric"
            },
            {
              duration: "2020 - 2023",
              variant_name: "55 Quattro Sportback 300kW",
              specs: "0hp, Automatic, Electric"
            }
          ]
      },
      {
        name: "e-tron GT",
        variants: [
            {
              duration: "2021 - 2023",
              variant_name: "RS",
              specs: "0hp, Automatic, Electric"
            },
            {
              duration: "2021 - 2023",
              variant_name: "Standard",
              specs: "0hp, Automatic, Electric"
            }
          ]
      },
      {
        name: "Other",
        variants: [],
      },
      {
        name: "Q2",
        variants: [
            {
              duration: "2017 - 2023",
              variant_name: "1.0 TFSI Exclusive Line",
              specs: "999cc, Automatic, Petrol"
            },
            {
              duration: "2017 - 2023",
              variant_name: "1.0 TFSI Standard Line",
              specs: "999cc, Automatic, Petrol"
            }
          ]
      },
      {
        name: "Q3",
        variants: [
            {
              duration: "2018 - 2023",
              variant_name: "35 TDI",
              specs: "2000cc, Automatic, Petrol"
            }
          ]
      },
      {
        name: "Q5",
        variants: [
            {
              duration: "2018 - 2023",
              variant_name: "2.0 TFSI S Tronic Quattro",
              specs: "1984cc, Automatic, Petrol"
            }
          ]
      },
      {
        name: "Q7",
        variants: [
            {
              duration: "2016 - 2023",
              variant_name: "3.0 TFSI",
              specs: "2995cc, Automatic, Petrol"
            }
          ]
      },
      {
        name: "Q8",
        variants: [
            {
              duration: "2018 - 2023",
              variant_name: "3.0 TFSI Quattro",
              specs: "2995cc, Automatic, Hybrid"
            }
          ]
      },
      {
        name: "R8",
        variants: [
            {
              duration: "2015 - 2023",
              variant_name: "V10 Plus",
              specs: "5200cc, Automatic, Petrol"
            }
          ]
      },
      {
        name: "TT",
        variants: [
            {
              duration: "2014 - 2023",
              variant_name: "RS Roadster",
              specs: "2480cc, Automatic, Petrol"
            }
          ]
      },
    ],
  },
  {
    name: "Austin",
    models: [
      {
        name: "10",
        variants: [],
      },
      {
        name: "Fx4",
        variants: [],
      },
      {
        name: "Maxi",
        variants: [],
      },
      {
        name: "Mini",
        variants: [],
      },
    ],
  },
  {
    name: "BAIC",
    models: [
      {
        name: "BJ40",
        variants: [
            {
              duration: "2020 - 2023",
              variant_name: "Exclusive",
              specs: "1987cc, Automatic, Petrol"
            }
          ]
      },
      {
        name: "BJ40 Plus",
        variants: [
            {
              duration: "2021 - 2023",
              variant_name: "Honorable Edition",
              specs: "2000cc, Automatic, Petrol"
            }
          ]
      },
      {
        name: "M50",
        variants: []
      },
      {
        name: "Senova D20",
        variants: [
            {
              duration: "2022 - 2023",
              variant_name: "1.5 AT Fashion",
              specs: "1490cc, Automatic, Petrol"
            }
          ]
      },
      {
        name: "Senova X25",
        variants: [
            {
                duration: "2022 - 2023",
                variant_name: "1.5 AT Fashion",
                specs: "1499cc, Automatic, Petrol"
           }
        ]
      }
    ]
  },
  {
    name: "Bentley",
    models: [
      {
        name: "Continental Gt",
        variants: [
            {
              duration: "2018 - 2023",
              variant_name: "Speed",
              specs: "5993cc, Automatic, Petrol"
            }
          ],
      },
      {
        name: "Flying Spur",
        variants: [
            {
              duration: "2013 - 2023",
              variant_name: "Mulliner",
              specs: "5950cc, Automatic, Petrol"
            }
          ],
      },
      {
        name: "Mulsanne",
        variants: [],
      },
      {
        name: "Other",
        variants: [],
      }
    ]
  },
  {
    name: "BMW",
    models: [],
  },
  {
    name: "Bugatti",
    models: [],
  },
  {
    name: "Buick",
    models: [],
  },
  {
    name: "Cadillac",
    models: [],
  },
  {
    name: "Changan",
    models: [],
  },
  {
    name: "Chery",
    models: [],
  },
  {
    name: "Chevrolet",
    models: [],
  },
  {
    name: "Chrysler",
    models: [],
  },
  {
    name: "Citroen",
    models: [],
  },
  {
    name: "Classic Cars",
    models: [],
  },
  {
    name: "Daehan",
    models: [],
  },
  {
    name: "Daewoo",
    models: [],
  },
  {
    name: "Daimler",
    models: [],
  },
  {
    name: "Datsun",
    models: [],
  },
  {
    name: "DFSK",
    models: [],
  },
  {
    name: "Dodge",
    models: [],
  },
  {
    name: "Dongfeng",
    models: [],
  },
  {
    name: "FAW",
    models: [],
  },
  {
    name: "Ferrari",
    models: [],
  },
  {
    name: "Fiat",
    models: [],
  },
  {
    name: "Ford",
    models: [],
  },
  {
    name: "GAC",
    models: [],
  },
  {
    name: "Geely",
    models: [],
  },
  {
    name: "GMC",
    models: [],
  },
  {
    name: "Golden Dragon",
    models: [],
  },
  {
    name: "Golf",
    models: [],
  },
  {
    name: "GUGU",
    models: [],
  },
  {
    name: "Haval",
    models: [],
  },
  {
    name: "Hillman",
    models: [],
  },
  {
    name: "Hino",
    models: [],
  },
  {
    name: "Hummer",
    models: [],
  },
  {
    name: "Hyundai",
    models: [],
  },
  {
    name: "Isuzu",
    models: [],
  },
  {
    name: "JAC",
    models: [],
  },
  {
    name: "Jaguar",
    models: [],
  },
  {
    name: "Jaxeri",
    models: [],
  },
  {
    name: "Jeep",
    models: [],
  },
  {
    name: "Jinbei",
    models: [],
  },
  {
    name: "JMC",
    models: [],
  },
  {
    name: "JW Forland",
    models: [],
  },
  {
    name: "Kaiser Jeep",
    models: [],
  },
  {
    name: "KIA",
    models: [],
  },
  {
    name: "Lada",
    models: [],
  },
  {
    name: "Lamborghini",
    models: [],
  },
  {
    name: "Land Rover",
    models: [],
  },
  {
    name: "Lexus",
    models: [],
  },
  {
    name: "Lifan",
    models: [],
  },
  {
    name: "Lincoln",
    models: [],
  },
  {
    name: "Maserati",
    models: [],
  },
  {
    name: "Master",
    models: [],
  },
  {
    name: "Mazda",
    models: [],
  },
  {
    name: "McLaren",
    models: [],
  },
  {
    name: "Mercedes Benz",
    models: [],
  },
  {
    name: "MG",
    models: [],
  },
  {
    name: "MINI",
    models: [],
  },
  {
    name: "Mitsubishi",
    models: [],
  },
  {
    name: "Morris",
    models: [],
  },
  {
    name: "Moto Guzzi",
    models: [],
  },
  {
    name: "Mushtaq",
    models: [],
  },
  {
    name: "Nissan",
    models: [],
  },
  {
    name: "Oldsmobile",
    models: [],
  },
  {
    name: "Opel",
    models: [],
  },
  {
    name: "Others",
    models: [],
  },
  {
    name: "Peugeot",
    models: [],
  },
  {
    name: "Plymouth",
    models: [],
  },
  {
    name: "Pontiac",
    models: [],
  },
  {
    name: "Porsche",
    models: [],
  },
  {
    name: "Power",
    models: [],
  },
  {
    name: "Prince",
    models: [],
  },
  {
    name: "Proton",
    models: [],
  },
  {
    name: "Range Rover",
    models: [],
  },
  {
    name: "Renault",
    models: [],
  },
  {
    name: "Rinco",
    models: [],
  },
  {
    name: "Rolls Royce",
    models: [],
  },
  {
    name: "Roma",
    models: [],
  },
  {
    name: "Rover",
    models: [],
  },
  {
    name: "Royal Enfield",
    models: [],
  },
  {
    name: "Saab",
    models: [],
  },
  {
    name: "Scion",
    models: [],
  },
  {
    name: "Skoda",
    models: [],
  },
  {
    name: "Smart",
    models: [],
  },
  {
    name: "Sogo",
    models: [],
  },
  {
    name: "Sokon",
    models: [],
  },
  {
    name: "SsangYong",
    models: [],
  },
  {
    name: "Subaru",
    models: [],
  },
  {
    name: "Tesla",
    models: [],
  },
  {
    name: "Triumph",
    models: [],
  },
  {
    name: "United",
    models: [],
  },
  {
    name: "Vauxhall",
    models: [],
  },
  {
    name: "Volkswagen",
    models: [],
  },
  {
    name: "Volvo",
    models: [],
  },
  {
    name: "Willys",
    models: [],
  },
  {
    name: "ZOTYE",
    models: [],
  },
];


const arrayOfyears = [
  2023,
  2022,
  2021,
  2020,
  2019,
  2018,
  2017,
  2016,
  2015,
  2014,
  2013,
  2012,
  2011,
  2010,
  2009,
  2008,
  2007,
  2006,
  2005,
  2004,
  2003,
  2002,
  2001,
  2000,
  1999,
  1998,
  1997,
  1996,
  1995,
  1994,
  1993,
  1992,
  1991,
  1990,
  1989,
  1988,
  1987,
  1986,
  1985,
  1984,
  1983,
  1982,
  1981,
  1980,
  1979,
  1978,
  1977,
  1976,
  1975,
  1974,
  1973,
  1972,
  1971,
  1970,
  1969,
  1968,
  1967,
  1966,
  1965,
  1964,
  1963,
  1962,
  1961,
  1960,
  1959,
  1958,
  1957,
  1956,
  1955,
  1954,
  1953,
  1952,
  1951,
  1950,
  1949,
  1948,
  1947,
  1946,
  1945,
  1944,
  1943,
  1942,
  1941,
  1940,
];

export { arrayOfyears}
