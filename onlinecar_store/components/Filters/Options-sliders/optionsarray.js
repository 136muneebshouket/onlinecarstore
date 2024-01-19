const bodyTypeArray = [
  {
    name: "Sedan",
    img: "1642508249935sedan.png",
    link: '/used_cars/Search-car?filters={"body_type":["Sedan"]}',
  },
  {
    name: "Hatchback",
    img: "1642508258600hatchback.png",
    link: '/used_cars/Search-car?filters={"body_type":["Hatchback"]}',
  },
  {
    name: "SUV",
    img: "1642508270662Compact-SUV.png",
    link: '/used_cars/Search-car?filters={"body_type":["SUV"]}',
  },
  {
    name: "Crossover",
    img: "1667226713819Crossover.png",
    link: '/used_cars/Search-car?filters={"body_type":["Crossover"]}',
  },
  {
    name: "Mini Van",
    img: "1667226804356Mini-Van.png",
    link: '/used_cars/Search-car?filters={"body_type":["Mini Van"]}',
  },
  {
    name: "Double Cabin",
    img: "1642508288479Double-Cabin.png",
    link: '/used_cars/Search-car?filters={"body_type":["Double Cabin"]}',
  },
  {
    name: "Compact sedan",
    img: "1642508249935sedan.png",
    link: '/used_cars/Search-car?filters={"body_type":["Compact sedan"]}',
  },
  {
    name: "MPV",
    img: "1642508407313MPV.png",
    link: '/used_cars/Search-car?filters={"body_type":["MPV"]}',
  },
  {
    name: "Van",
    img: "1642508297432Van.png",
    link: '/used_cars/Search-car?filters={"body_type":["Van"]}',
  },
  {
    name: "Compact SUV",
    img: "1642508270662Compact-SUV.png",
    link: '/used_cars/Search-car?filters={"body_type":["Compact SUV"]}',
  },
  {
    name: "Micro Van",
    img: "1667226751967Micro-Van.png",
    link: '/used_cars/Search-car?filters={"body_type":["Micro Van"]}',
  },
  {
    name: "Pick Up",
    img: "1642508319679Pick-Up.png",
    link: '/used_cars/Search-car?filters={"body_type":["Pick Up"]}',
  },
  {
    name: "Station Wagon",
    img: "1642508417560Station-Wagon.png",
    link: '/used_cars/Search-car?filters={"body_type":["Station Wagon"]}',
  },
  {
    name: "Coupe",
    img: "1667226763888Coupe.png",
    link: '/used_cars/Search-car?filters={"body_type":["Coupe"]}',
  },
  {
    name: "Truck",
    img: "1642508385259Truck.png",
    link: '/used_cars/Search-car?filters={"body_type":["Truck"]}',
  },
  {
    name: "High Roof",
    img: "1642508427320High-Roof.png",
    link: '/used_cars/Search-car?filters={"body_type":["High Roof"]}',
  },
  {
    name: "Convertible",
    img: "1667226775510Convertible.png",
    link: '/used_cars/Search-car?filters={"body_type":["Convertible"]}',
  },
  {
    name: "Single Cabin",
    img: "1642508334268Single-Cabin.png",
    link: '/used_cars/Search-car?filters={"body_type":["Single Cabin"]}',
  },
  {
    name: "Off-Road Vehicles",
    img: "1642508436860Off-Road-Vehicles.png",
    link: '/used_cars/Search-car?filters={"body_type":["Off-Road Vehicles"]}',
  },
  {
    name: "Mini Vehicles",
    img: "1667226751967Micro-Van.png",
    link: '/used_cars/Search-car?filters={"body_type":["Mini Vehicles"]}',
  },
  {
    name: "Compact hatchback",
    img: "1642508258600hatchback.png",
    link: '/used_cars/Search-car?filters={"body_type":["Compact hatchback"]}',
  },
  {
    name: "Subcompact hatchback",
    img: "1642508258600hatchback.png",
    link: '/used_cars/Search-car?filters={"body_type":["Subcompact hatchback"]}',
  },
];
const carBrands = [
  {
    name: "Toyota",
    img: "Tyota.png",
    link: '/used_cars/Search-car?filters={"brand":["Toyota"]}',
  },
  {
    name: "Suzuki",
    img: "Suzuki.png",
    link: '/used_cars/Search-car?filters={"brand":["Suzuki"]}',
  },
  {
    name: "Honda",
    img: "Honda.png",
    link: '/used_cars/Search-car?filters={"brand":["Honda"]}',
  },
  {
    name: "Daihatsu",
    img: "daihatsu.png",
    link: '/used_cars/Search-car?filters={"brand":["Daihatsu"]}',
  },
  {
    name: "KIA",
    img: "kia.png",
    link: '/used_cars/Search-car?filters={"brand":["KIA"]}',
  },
  {
    name: "Hyundai",
    img: "hyundai.png",
    link: '/used_cars/Search-car?filters={"brand":["Hyundai"]}',
  },
  {
    name: "Nissan",
    img: "Nisan.png",
    link: '/used_cars/Search-car?filters={"brand":["Nissan"]}',
  },
  {
    name: "Mitsubishi",
    img: "Mitsubishi.png",
    link: '/used_cars/Search-car?filters={"brand":["Mitsubishi"]}',
  },
  {
    name: "Changan",
    img: "changan.jpg",
    link: '/used_cars/Search-car?filters={"brand":["Changan"]}',
  },
  {
    name: "Mercedes Benz",
    img: "mercedes.png",
    link: '/used_cars/Search-car?filters={"brand":["Mercedes Benz"]}',
  },
  {
    name: "MG",
    img: "MG.png",
    link: '/used_cars/Search-car?filters={"brand":["MG"]}',
  },
  {
    name: "FAW",
    img: "FAW.png",
    link: '/used_cars/Search-car?filters={"brand":["FAW"]}',
  },
  {
    name: "Audi",
    img: "Audi.png",
    link: '/used_cars/Search-car?filters={"brand":["Audi"]}',
  },
  {
    name: "DFSK",
    img: "DFSK.png",
    link: '/used_cars/Search-car?filters={"brand":["DFSK"]}',
  },
  {
    name: "Proton",
    img: "proton-logo-png-for-website.png",
    link: '/used_cars/Search-car?filters={"brand":["Proton"]}',
  },
  {
    name: "Haval",
    img: "haval-logo-for-website.png",
    link: '/used_cars/Search-car?filters={"brand":["Haval"]}',
  },
  {
    name: "BMW",
    img: "BMW.png",
    link: '/used_cars/Search-car?filters={"brand":["BMW"]}',
  },
  {
    name: "Prince",
    img: "prince.png",
    link: '/used_cars/Search-car?filters={"brand":["Prince"]}',
  },
  {
    name: "Mazda",
    img: "mazda.png",
    link: '/used_cars/Search-car?filters={"brand":["Mazda"]}',
  },
  {
    name: "Jeep",
    img: "Jeep.png",
    link: '/used_cars/Search-car?filters={"brand":["Jeep"]}',
  },
  {
    name: "Peugeot",
    img: "peugeot.png",
    link: '/used_cars/Search-car?filters={"brand":["Peugeot"]}',
  },
  {
    name: "Lexus",
    img: "Lexus.png",
    link: '/used_cars/Search-car?filters={"brand":["Lexus"]}',
  },
  {
    name: "Chery",
    img: "car-logos_chery.png",
    link: '/used_cars/Search-car?filters={"brand":["Chery"]}',
  },
  {
    name: "Chevrolet",
    img: "Chevrolet.png",
    link: '/used_cars/Search-car?filters={"brand":["Chevrolet"]}',
  },
];

const cities = [
  { name: "Lahore", link: '/used_cars/Search-car?filters={"city":["Lahore"]}' },
  {
    name: "Karachi",
    link: '/used_cars/Search-car?filters={"city":["Karachi"]}',
  },
  {
    name: "Islamabad",
    link: '/used_cars/Search-car?filters={"city":["Islamabad"]}',
  },
  {
    name: "Rawalpindi",
    link: '/used_cars/Search-car?filters={"city":["Rawalpindi"]}',
  },
  {
    name: "Peshawar",
    link: '/used_cars/Search-car?filters={"city":["Peshawar"]}',
  },
  {
    name: "Faisalabad",
    link: '/used_cars/Search-car?filters={"city":["Faisalabad"]}',
  },
  { name: "Multan", link: '/used_cars/Search-car?filters={"city":["Multan"]}' },
  {
    name: "Gujranwala",
    link: '/used_cars/Search-car?filters={"city":["Gujranwala"]}',
  },
  {
    name: "Sialkot",
    link: '/used_cars/Search-car?filters={"city":["Sialkot"]}',
  },
  {
    name: "Sargodha",
    link: '/used_cars/Search-car?filters={"city":["Sargodha"]}',
  },
  {
    name: "Hyderabad",
    link: '/used_cars/Search-car?filters={"city":["Hyderabad"]}',
  },
  {
    name: "Abbottabad",
    link: '/used_cars/Search-car?filters={"city":["Abbottabad"]}',
  },
  { name: "Mardan", link: '/used_cars/Search-car?filters={"city":["Mardan"]}' },
  { name: "Gujrat", link: '/used_cars/Search-car?filters={"city":["Gujrat"]}' },
  {
    name: "Bahawalpur",
    link: '/used_cars/Search-car?filters={"city":["Bahawalpur"]}',
  },
  { name: "Quetta", link: '/used_cars/Search-car?filters={"city":["Quetta"]}' },
  {
    name: "Wah cantt",
    link: '/used_cars/Search-car?filters={"city":["Wah%20cantt"]}',
  },
  {
    name: "Rahim Yar Khan",
    link: '/used_cars/Search-car?filters={"city":["Rahim%20Yar%20Khan"]}',
  },
  {
    name: "Sahiwal",
    link: '/used_cars/Search-car?filters={"city":["Sahiwal"]}',
  },
  { name: "Jhelum", link: '/used_cars/Search-car?filters={"city":["Jhelum"]}' },
  {
    name: "Mandi bahauddin",
    link: '/used_cars/Search-car?filters={"city":["Mandi%20bahauddin"]}',
  },
  {
    name: "Chakwal",
    link: '/used_cars/Search-car?filters={"city":["Chakwal"]}',
  },
  { name: "Swabi", link: '/used_cars/Search-car?filters={"city":["Swabi"]}' },
  { name: "Attock", link: '/used_cars/Search-car?filters={"city":["Attock"]}' },
  {
    name: "Mansehra",
    link: '/used_cars/Search-car?filters={"city":["Mansehra"]}',
  },
  { name: "Okara", link: '/used_cars/Search-car?filters={"city":["Okara"]}' },
  {
    name: "D.G.Khan",
    link: '/used_cars/Search-car?filters={"city":["D.G.Khan"]}',
  },
  {
    name: "Haripur",
    link: '/used_cars/Search-car?filters={"city":["Haripur"]}',
  },
  {
    name: "Mirpur A.K.",
    link: '/used_cars/Search-car?filters={"city":["Mirpur%20A.K."]',
  },
  { name: "Jhang", link: '/used_cars/Search-car?filters={"city":["Jhang"]}' },
];

const carModels = [
  {
    name: "Corolla",
    link: '/used_cars/Search-car?filters={"model":["Corolla"]}',
  },
  { name: "Civic", link: '/used_cars/Search-car?filters={"model":["Civic"]}' },
  { name: "City", link: '/used_cars/Search-car?filters={"model":["City"]}' },
  { name: "Alto", link: '/used_cars/Search-car?filters={"model":["Alto"]}' },
  {
    name: "Cultus",
    link: '/used_cars/Search-car?filters={"model":["Cultus"]}',
  },
  {
    name: "Mehran",
    link: '/used_cars/Search-car?filters={"model":["Mehran"]}',
  },
  {
    name: "Wagon R",
    link: '/used_cars/Search-car?filters={"model":["Wagon%20R"]}',
  },
  { name: "Vitz", link: '/used_cars/Search-car?filters={"model":["Vitz"]}' },
  { name: "Swift", link: '/used_cars/Search-car?filters={"model":["Swift"]}' },
  { name: "Hilux", link: '/used_cars/Search-car?filters={"model":["Hilux"]}' },
  { name: "Bolan", link: '/used_cars/Search-car?filters={"model":["Bolan"]}' },
  { name: "Yaris", link: '/used_cars/Search-car?filters={"model":["Yaris"]}' },
  { name: "Prado", link: '/used_cars/Search-car?filters={"model":["Prado"]}' },
  {
    name: "Sportage",
    link: '/used_cars/Search-car?filters={"model":["Sportage"]}',
  },
  {
    name: "Fortuner",
    link: '/used_cars/Search-car?filters={"model":["Fortuner"]}',
  },
  { name: "Passo", link: '/used_cars/Search-car?filters={"model":["Passo"]}' },
  { name: "Mira", link: '/used_cars/Search-car?filters={"model":["Mira"]}' },
  {
    name: "Land Cruiser",
    link: '/used_cars/Search-car?filters={"model":["Land%20Cruiser"]}',
  },
  { name: "Vezel", link: '/used_cars/Search-car?filters={"model":["Vezel"]}' },
  { name: "Prius", link: '/used_cars/Search-car?filters={"model":["Prius"]}' },
  { name: "Cuore", link: '/used_cars/Search-car?filters={"model":["Cuore"]}' },
  { name: "Aqua", link: '/used_cars/Search-car?filters={"model":["Aqua"]}' },
  {
    name: "Khyber",
    link: '/used_cars/Search-car?filters={"model":["Khyber"]}',
  },
  { name: "BR-V", link: '/used_cars/Search-car?filters={"model":["BR-V"]}' },
  {
    name: "Santro",
    link: '/used_cars/Search-car?filters={"model":["Santro"]}',
  },
  {
    name: "Baleno",
    link: '/used_cars/Search-car?filters={"model":["Baleno"]}',
  },
  {
    name: "Tucson",
    link: '/used_cars/Search-car?filters={"model":["Tucson"]}',
  },
  { name: "Every", link: '/used_cars/Search-car?filters={"model":["Every"]}' },
  { name: "HS", link: '/used_cars/Search-car?filters={"model":["HS"]}' },
  {
    name: "Picanto",
    link: '/used_cars/Search-car?filters={"model":["Picanto"]}',
  },
];
// This is the completed updatedCarModels array with the name and link properties for each car model in the carModels array.

const carPrices = [
  {
    name: "Cars under 2 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":200000}"}',
  },
  {
    name: "Cars under 3 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":300000}"}',
  },
  {
    name: "Cars under 4 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":400000}"}',
  },
  {
    name: "Cars under 5 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":500000}"}',
  },
  {
    name: "Cars under 6 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":600000}"}',
  },
  {
    name: "Cars under 7 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":700000}"}',
  },
  {
    name: "Cars under 8 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":800000}"}',
  },
  {
    name: "Cars under 9 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":900000}"}',
  },
  {
    name: "Cars under 10 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":1000000}"}',
  },
  {
    name: "Cars under 15 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":1500000}"}',
  },
  {
    name: "Cars under 20 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":2000000}"}',
  },
  {
    name: "Cars under 25 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":2500000}"}',
  },
  {
    name: "Cars under 30 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":3000000}"}',
  },
  {
    name: "Cars under 40 lakhs",
    link: '/used_cars/Search-car?filters={"price":"{\\"$lt\\":4000000}"}',
  },
];
export { bodyTypeArray, carBrands, cities, carModels, carPrices };
