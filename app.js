'use strict';
let leftImgNumber = 0,
  midImgNumber = 0,
  rightImgNumber = 0,
  attempt = 0,
  maxAttempts = 25,
  NumberOfchecks = 0,
  toNotRepeat = [],
  productNameList = [],
  productVotsList = [],
  productViewsList = [];


const imgGalary = document.querySelector('.imgs-container');
const leftImgElement = document.querySelector('.left-img');
const midImgElement = document.querySelector('.mid-img');
const rightImgElement = document.querySelector('.right-img');
const resultBTN = document.querySelector('.result-btn');
const resultChart = document.querySelector('.result-chart').getContext('2d');


const uniqueImgNumber = function(a, b, c){
  if(attempt === 0 && (a !== b && a!== c))
    return a;
  else if( attempt > 0 && (a !== b && a!== c) && !toNotRepeat.includes(`${Product.productList[a].filePath}`) ){

    NumberOfchecks++;
    if(NumberOfchecks === 3){
      NumberOfchecks = 0;
      toNotRepeat = [];
    }

    return a;
  }
  else
    return uniqueImgNumber(generateRandomNumber(), b, c);
};

const generateRandomNumber = function(){
  return Math.floor(Math.random() * Product.productList.length);
};

const render = function(){

  if(localStorage.getItem('productList'))
    Product.productList = JSON.parse(localStorage.getItem('productList'));

  if( attempt > 0){
    toNotRepeat.push(Product.productList[leftImgNumber].filePath);
    toNotRepeat.push(Product.productList[midImgNumber].filePath);
    toNotRepeat.push(Product.productList[rightImgNumber].filePath);
  }

  leftImgNumber = uniqueImgNumber(generateRandomNumber(),midImgNumber, rightImgNumber);
  midImgNumber = uniqueImgNumber(generateRandomNumber(),leftImgNumber, rightImgNumber);
  rightImgNumber = uniqueImgNumber(generateRandomNumber(),leftImgNumber, midImgNumber);

  leftImgElement.src = Product.productList[leftImgNumber].filePath;
  midImgElement.src = Product.productList[midImgNumber].filePath;
  rightImgElement.src = Product.productList[rightImgNumber].filePath;

  Product.productList[leftImgNumber].shownOnScreen++;
  Product.productList[midImgNumber].shownOnScreen++;
  Product.productList[rightImgNumber].shownOnScreen++;

  localStorage.setItem('productList', JSON.stringify(Product.productList));
};

const setProductVotesAndViewsLists = function(){
  if(localStorage.getItem('productList'))
    Product.productList = JSON.parse(localStorage.getItem('productList'));

  Product.productList.forEach(product =>{
    productVotsList.push(product.clicked);
    productViewsList.push(product.shownOnScreen);
  });
};

const getChartObj = function(){
  return {
    type: 'bar',
    data: {
      labels: productNameList,
      datasets: [{
        label: '# of Votes',
        data: productVotsList,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },{
        label: '# of Views',
        data: productViewsList,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
};

const renderResults = function(){
  console.log(localStorage);
  const chartObj = getChartObj();
  // eslint-disable-next-line no-undef
  new Chart(resultChart, chartObj);
  resultBTN.setAttribute('disabled', 'disabled');
};

function Product(productName, filePath){
  this.productName = productName;
  this.filePath = filePath;
  this.clicked = 0;
  this.shownOnScreen = 0;

  Product.productList.push(this);
  productNameList.push(this.productName);
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


if(!localStorage.getItem('productList'))
  localStorage.setItem('productList', JSON.stringify(Product.productList));

const clickEventHandler = function(event){
  const targetElement = event.target;
  const targetElementClassList = targetElement.classList;

  if(targetElementClassList.contains('left-img') || targetElementClassList.contains('mid-img') || targetElementClassList.contains('right-img')){
    if(attempt < maxAttempts){
      attempt++;

      if(localStorage.getItem('productList'))
        Product.productList = JSON.parse(localStorage.getItem('productList'));

      if(targetElementClassList.contains('left-img'))
        Product.productList[leftImgNumber].clicked++;
      else if(targetElementClassList.contains('mid-img'))
        Product.productList[midImgNumber].clicked++;
      else
        Product.productList[rightImgNumber].clicked++;

      localStorage.setItem('productList', JSON.stringify(Product.productList));
      if(attempt !== maxAttempts)
        render();
      else
        clickEventHandler(event);
    }else{
      imgGalary.removeEventListener('click', clickEventHandler);
      resultBTN.removeAttribute('disabled');
      setProductVotesAndViewsLists();
    }
  }

};

imgGalary.addEventListener('click', clickEventHandler);
resultBTN.addEventListener('click', function(){
  renderResults();
});

render();
