

function price_converter(v){
 if (v >= 10000000) {
        return(`${(v / 10000000).toFixed(2)} crore`);
      } else if (v >= 100000) {
        return(`${(v / 100000).toFixed(2)} lacs`);
      } else if (v >= 1000) {
        return(`${(v / 1000).toFixed(2)} thousand`);
      } else {
        return(v);
      }
}
export default price_converter;