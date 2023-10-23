import { bubblesort, quicksort, selectionsort, insertionsort, mergesort, randomsort, processing} from './sorting_algs.js'

document.body.style.backgroundColor = '000000';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.translate(0, 0);
ctx.fillStyle = 'white';
ctx.strokeStyle = '#FFFFFF';
ctx.font = '10px Arial';

let originalArr = [];
let arr = generateArray();
document.getElementById('stopRandomsort').style.webkitTextFillColor = 'green';

//ENG: onclick event for the Bubblesort button
//RO: evenimentul pentru click al butonului Bubblesort

document.getElementById('Bubblesort').addEventListener("click", function () {
  if (!arr.isArrSorted  && handler.value == 'ascending') bubblesort(handler.value, 0, arr, showSwap, 0);
  if (!arr.isArrSorted  && handler.value == 'descending') bubblesort(handler.value, arr.length-1, arr, showSwap, 0);
  arr.isArrSorted = true;
});

//ENG: onclick event for the Quicksort button
//RO: evenimentul pentru click al butonului Quicksort

document.getElementById('Quicksort').addEventListener("click", function () {
  if (!arr.isArrSorted) quicksort(arr, 0, arr.length - 1, showSwap, 0);
  arr.isArrSorted = true;
});

//ENG: onclick event for the Selectionsort button
//RO: evenimentul pentru click al butonului Selectionsort

document.getElementById('Selectionsort').addEventListener('click', function() {
  if (!arr.isArrSorted) selectionsort(handler.value, arr.length - 1, arr, showSwap, 0);
  arr.isArrSorted = true;
})

//ENG: onclick event for the Insertionsort button
//RO: evenimentul pentru click al butonului Insertionsort

document.getElementById('Insertionsort').addEventListener('click', function() {
  if (!arr.isArrSorted) insertionsort(arr.length, arr, showSwapInsSort, 0);
  arr.isArrSorted = true;
})

//ENG: onclick event for the Mergesort button
//RO: evenimentul pentru click al butonului Mergesort

document.getElementById('Mergesort').addEventListener('click', function() {
  if (!arr.isArrSorted) mergesort(handler.value, 0, arr.length-1, arr, showSwapInsSort);
  arr.isArrSorted = true;
})

//ENG: onclick event for the Randomsort button
//RO: evenimentul pentru click al butonului Randomsort

document.getElementById('Randomsort').addEventListener('click', function() {
  if (!arr.isArrSorted && !processing) randomsort(arr.length-1, arr, showSwap, 0);
});

//ENG: onclick event for the randomArray button
//RO: evenimentul pentru click al butonului randomArray

document.getElementById('randomArray').addEventListener('click', function () {
  arr = generateArray();
});

//ENG: onchange event for the arrLength input element
//RO: evenimentul pentru schimbare al elementului arrLength

document.getElementById('arrLength').addEventListener('change', function() {
  arr = generateArray();
})

//ENG: onclick event for the stopRandomsort button
//RO: evenimentul pentru click al butonului stopRandomsort

document.getElementById('stopRandomsort').addEventListener('click', function() {
  stopRandomsort.checked = !stopRandomsort.checked;
  if (stopRandomsort.checked) {
    stopRandomsort.style.webkitTextFillColor = 'green';
  } else {
    stopRandomsort.style.webkitTextFillColor = 'red';
  }
})

document.getElementById('sort_handler').addEventListener('change', function() {
  arr.isArrSorted = false;
})

//ENG: onclick event for the revert button
//RO: evenimentul pentru click al butonului revert

document.getElementById('revert').addEventListener('click', function() {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = originalArr[i];
  }
  showArr(arr);
  arr.isArrSorted = false;
})

//ENG: timer is the time interval for showing array changes
//ENG: handler is the sorting handler, ascending/descending
//ENG: stopRandomsort is a button used to stop the random sort
//RO: timer reprezinta intervalul de timp dintre schimbarile din array
//RO: handler arata modul de sortare al array-ului, crescator/descrescator
//RO: stopRandomsort este butonul folosit pentru a opri random sort-ul

export const timer = document.getElementById('timer');
export const handler = document.getElementById('sort_handler');
export const stopRandomsort = document.getElementById('stopRandomsort');

//ENG: getRandomInt generates a random integer between the [min, max] interval
//RO: getRandomInt genereaza un numar intreg aleatoriu din intervalul [min, max]
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//ENG: generateArray generates an array of random integer elements and shows it
//RO: generateArray genereaza un sir de numere intregi aleatorii si il afiseaza

function generateArray() {
  let arr = [];
  let n = document.getElementById('arrLength').value;
  arr.isArrSorted = false;
  for (let i = 0; i < n; i++) {
    arr[i] = getRandomInt(0, 500);
    originalArr[i] = arr[i];
  }
  showArr(arr);
  return arr;
}

//ENG: showArr shows the whole array
//RO: showArr afiseaza sirul

async function showArr(arr) {
  let x = 0; const y = 10; let width = Math.floor((canvas.width-(arr.length-1))/arr.length);
  document.getElementById('moves').innerHTML = `Moves: ${0}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < arr.length; j++) {
      ctx.fillRect(x, y, width, arr[j]);
      x += width+1;
    }
}

//ENG: showSwap redraws two elements of the array
//RO: showSwap redeseneaza doua elemente ale sirului

async function showSwap(arr, i, j) {
    let width = Math.floor((canvas.width-(arr.length-1))/arr.length);
    ctx.fillStyle = 'red';
    ctx.fillRect(i*(width+1), 10, width, arr[j]);
    ctx.fillRect(j*(width+1), 10, width, arr[i]);
    setTimeout(() => {
    ctx.clearRect(i*(width+1), 10, width, arr[j]);
    ctx.clearRect(j*(width+1), 10, width, arr[i]);
    ctx.fillRect(i*(width+1), 10, width, arr[i]);
    ctx.fillRect(j*(width+1), 10, width, arr[j]);
    }, Math.floor(timer.value/2));
    setTimeout(() => {
      ctx.fillStyle = 'white';
      ctx.clearRect(i*(width+1), 10, width, arr[j]);
      ctx.clearRect(j*(width+1), 10, width, arr[i]);
      ctx.fillRect(i*(width+1), 10, width, arr[i]);
      ctx.fillRect(j*(width+1), 10, width, arr[j]);
    }, timer.value);
}
//ENG: showSwapInsSort is the function used to show changes in sorting algorithms making one move at a time
//RO: showSwapInsSort este functia folosita pentru a arata schimbarile in algoritmii de sortare care fac cate o miscare

async function showSwapInsSort(arr, i) {
  let width = Math.floor((canvas.width-(arr.length-1))/arr.length);
  ctx.fillStyle = 'red';
  ctx.clearRect(i*(width+1), 10, width, canvas.height);
  ctx.fillRect(i*(width+1), 10, width, arr[i]);
  setTimeout(() => {
    ctx.fillStyle = 'white';
    ctx.clearRect(i*(width+1), 10, width, canvas.height);
    ctx.fillRect(i*(width+1), 10, width, arr[i]);
  }, timer.value);
}