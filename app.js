'use strict';
let leftImgNumber = 0,
  midImgNumber = 0,
  rightImgNumber = 0,
  attempt = 0,
  maxAttempts = 25;


const imgGalary = document.querySelector('.imgs-container');
const leftImgElement = document.querySelector('.left-img');
const midImgElement = document.querySelector('.mid-img');
const rightImgElement = document.querySelector('.right-img');
const resultBTN = document.querySelector('.result-btn');
const resultList = document.querySelector('.result-list');

const uniqueNumber = function(a, b, c){
  if(a !== b && a!== c)
    return a;
  else
    return uniqueNumber(generateRandomNumber(), b, c);
};

const generateRandomNumber = function(){
  return Math.floor(Math.random() * Product.productList.length);
};

const render = function(){
  leftImgNumber = uniqueNumber(generateRandomNumber(),midImgNumber, rightImgNumber);
  midImgNumber = uniqueNumber(generateRandomNumber(),leftImgNumber, rightImgNumber);
  rightImgNumber = uniqueNumber(generateRandomNumber(),leftImgNumber, midImgNumber);

  leftImgElement.src = Product.productList[leftImgNumber].filePath;
  midImgElement.src = Product.productList[midImgNumber].filePath;
  rightImgElement.src = Product.productList[rightImgNumber].filePath;

  Product.productList[leftImgNumber].shownOnScreen++;
  Product.productList[midImgNumber].shownOnScreen++;
  Product.productList[rightImgNumber].shownOnScreen++;
};

const renderResults = function(){
  for(let i =0; i < Product.productList.length; i++){
    let listItem = document.createElement('li');
    listItem.textContent = `${Product.productList[i].productName} had ${Product.productList[i].clicked} 
    votes, and was seen ${Product.productList[i].shownOnScreen} times`;
    resultList.appendChild(listItem);
  }
  resultBTN.setAttribute('disabled', 'disabled');
};

function Product(productName, filePath){
  this.productName = productName;
  this.filePath = filePath;
  this.clicked = 0;
  this.shownOnScreen = 0;

  Product.productList.push(this);
}

Product.productList = [];

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');


const clickEventHandler = function(event){
  const targetElement = event.target;
  const targetElementClassList = targetElement.classList;

  if(targetElementClassList.contains('left-img') || targetElementClassList.contains('mid-img') || targetElementClassList.contains('right-img')){
    if(attempt < maxAttempts){
      attempt++;

      if(targetElementClassList.contains('left-img'))
        Product.productList[leftImgNumber].clicked++;
      else if(targetElementClassList.contains('mid-img'))
        Product.productList[midImgNumber].clicked++;
      else
        Product.productList[rightImgNumber].clicked++;

      if(attempt !== maxAttempts)
        render();
      else
        clickEventHandler(event);
    }else{
      imgGalary.removeEventListener('click', clickEventHandler);
      resultBTN.removeAttribute('disabled');
    }
  }

};

imgGalary.addEventListener('click', clickEventHandler);
resultBTN.addEventListener('click', function(){
  renderResults();
});

render();
