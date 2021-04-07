var makeRand = (length) => {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
var slugs = localStorage.slugs;
// console.log(slugs);
if (slugs === "undefined" || !slugs) slugs = [];
else slugs = JSON.parse(slugs);
var slugify = (text, id) => {
  text = text.replace(/ /g, "-").toLowerCase() + "-" + id;
  slugs.push({ id: id, slug: text });
  localStorage.slugs = JSON.stringify(slugs);
  return text;
};
var getSlug = (id, text) => {
  let slug = false;
  for (var i = 0; i < slugs.length; i++) {
    if (slugs[i].id === id) {
      slug = slugs[i].slug;
      break;
    }
  }
  if (!slug) {
    slug = slugify(text, id);
  }
  return slug;
};

var formatMoney = (amount) => {
  amount = amount.replace(/₦/g, "");
  amount = amount.replace("$", "");
  amount = Number(amount.replace(/,/g, "")).toFixed(2);
  amount = amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return "₦" + amount;
};

var Custom = { makeRand: makeRand, getSlug: getSlug, formatMoney: formatMoney };
export default Custom;
