import formatCurrency from "../scripts/utils/money.js";



export function getProduct(productId){
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export class Product {
  id;
  image;
  name
  rating;
  priceCents;
  stars;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl(){
    const stars = Math.round(this.rating.stars * 10);
    return `images/ratings/rating-${stars}.png`;
  }

  getPrice(){
    return  `$${formatCurrency(this.priceCents)}`
  }
  extraInfoHTML(){
    return ''
  }

  // Backwards compatibility for existing UI code
  get startUrl(){
    return this.getStarsUrl();
  }
  get priceDollars(){
    return this.getPrice();
  }
  extraInfoHtml(){
    return this.extraInfoHTML();
  }
}


export class Appliance extends Product {
  instructionsLink;
  warrantyLink;



  constructor (productDetails){
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML(){
    return `
    <a href="${this.instructionsLink}" target="_blank">Instructions</a>
    <br>
    <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `
  }

}

export class Clothing extends Product {
  sizeChartLink;

  constructor (productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML(){
    return `
    <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    `
  }
}

export let products = [];

export async function loadProducts() {
 const promise = fetch('https://supersimplebackend.dev/products').then((response) => {
    return response.json();
  }).then((productsData) => {
    productsData.forEach((productData) => {
      let product;
      if (productData.type === 'appliance') {
        product = new Appliance(productData);
      } else if (productData.type === 'clothing') {
        product = new Clothing(productData);
      } else {
        product = new Product(productData);
      }
      products.push(product);
    });
  });

  return promise;
}
loadProducts().then;