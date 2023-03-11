// making first letter cap
String.prototype.firstLetterCap = function () {
  return this[0].toUpperCase() + this.slice(1);
};

let namee = "arda";
console.log(namee.firstLetterCap());

// Making new colors
// const makeNewColor = function (r, g, b) {
//   const color = {};
//   color.r = r;
//   color.g = g;
//   color.b = b;
//   color.rgb = function () {
//     // console.log(this);
//     const { r, g, b } = this;
//     return `rgb(${r}, ${g}, ${b})`;
//   };
//   return color;
// };

// const makeNewColor2 = function (r, g, b, a) {
//   this.r = r;
//   this.g = g;
//   this.b = b;
//   this.a = a;
// };

// makeNewColor2.prototype.rgba = function () {
//   const { r, g, b, a } = this;
//   return `rgb(${r}, ${g}, ${b}, ${a})`;
// };

// !!!!!!!!!!!!!!!!!!!!!!!

class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  rgb() {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
  }
  rgba(a) {
    const { r, g, b} = this;
    return `rgb(${r}, ${g}, ${b}, ${a})`;
  }
};
const mainColor = new Color(50, 68, 190);
