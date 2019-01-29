module.exports = {
  Honda: (model, zipCode) => {
    const formattedModel = model.split(' ').join('-');
    return `https://automobiles.honda.com/tools/current-offers?zipcode=${zipCode}&vehiclemodelseries=${formattedModel}`;
  },
  LandRover: (model) => {
    const formattedModel = model.split(' ').join('-');
    return `https://www.landroverusa.com/current-offers/${formattedModel}-offers.html`;
  },
};
