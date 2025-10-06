class Car{
  
    
    #model;
    #brand;
    speed = 0;
    isTrunkOpen = false;


  constructor(model, brand){
    this.#brand = brand;
  }
  displayInfo(){
    return `brand: ${this.#brand}, model: ${this.#model}`;
  }

  go(){
    if(this.isTrunkOpen){
      return `The trunk is open! Please close it first.`;
    }
    if (this.speed <= 200){
        this.speed += 5;
         return `The car is going at ${this.speed} km/h`;
    }
    else{
      return `The car is going too fast! ${this.speed} km/h`;
    }
  
  }
  brake(){
    if (this.speed <= 0){
      this.speed = 0;
      return `The car is stopped. ${this.speed} km/h`;
    }
    this.speed -= 5;
    return `The car is going at ${this.speed} km/h`;
  }
  openTrunk(){
    if (this.isTrunkOpen){
      return `The trunk is already open`;
    }
    this.isTrunkOpen = true;
    return `The trunk is now open`;
  }

}

class RaceCar extends Car{
  #accleration;

constructor(carDetails){
  super(carDetails.model, carDetails.brand);
  this.#accleration = carDetails.accleration;

}

  go(){
this.speed += this.#accleration;
if (this.speed > 300){
  this.speed = 300;
  
  }
}
}

const car1 = new Car("Model 3", "Tesla");
const car2 = new Car("Mustang", "Ford");

console.log(car1.displayInfo());
console.log(car2.displayInfo());
console.log('hello from car.js');