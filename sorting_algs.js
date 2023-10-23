import { handler, timer, stopRandomsort} from './main.js'

export let processing = false; let mergesortmoves = 0;

document.getElementById('stopRandomsort').addEventListener('click', function() {
  processing = false;
});

document.getElementById('Mergesort').addEventListener('click', function() {
  mergesortmoves = 0;
});

document.getElementById('randomArray').addEventListener('click', function () {
  processing = false;
});

export async function quicksort(arr, low, high, show, moves) {
  let movesHTML = document.getElementById('moves');
  movesHTML.innerHTML = `Moves: ${moves}`;
  await new Promise(async (resolve) => {
    if (low < high) {

      let pivot = arr[high];
      let i = (low - 1);

      for (let j = low; j <= high - 1; j++) {
        if (handler.value == 'ascending') {
          if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            moves += 2;
            movesHTML.innerHTML = `Moves: ${moves}`;
            show(arr, i, j);
            await new Promise(resolve => setTimeout(resolve, timer.value));
          }
        }
        else {
          if (arr[j] > pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            moves += 2;
            movesHTML.innerHTML = `Moves: ${moves}`;
            show(arr, i, j);
            await new Promise(resolve => setTimeout(resolve, timer.value));
          }
        }
      }
      resolve(i);
    }
  })
    .then(async (i) => {
      [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
      moves += 2;
      movesHTML.innerHTML = `Moves: ${moves}`;
      i++;
      show(arr, i, high);
      await new Promise(resolve => setTimeout(resolve, timer.value));
      return i;
    })
    .then(async (i) => {
      quicksort(arr, low, i - 1, show, moves);
      quicksort(arr, i + 1, high, show, moves);
    })
}

export async function bubblesort(initial_handler, i, arr, show, moves, show2) {
  let movesHTML = document.getElementById('moves');
  movesHTML.innerHTML = `Moves: ${moves}`;

  //ENG: reset iterator variable if the sort handler changes
  //RO: reseteaza iteratorul daca modul de sortare se schimba

  if (initial_handler != handler.value && handler.value == 'ascending') {
    i = 0;
    //initial_handler = handler.value;
  }
  if (initial_handler != handler.value && handler.value == 'descending') {
    i = arr.length-1;
    //initial_handler = handler.value;
  }

  let isArraySorted = true;
  await new Promise(async (resolve) => {

  //ENG: iterate through the array until it needs a change, swap then break out
  //RO: itereaza prin sir pana cand are nevoie de o schimbare, schimba si iesi

  if (handler.value == 'ascending') {
      while (isArraySorted && i < arr.length) {
          if (arr[i] > arr[i+1]) {
              [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
              isArraySorted = false;
              i++;
              break;
          }
          i++;
      }
  } else {
      while (isArraySorted && i > -1) {
          if (arr[i] > arr[i-1]) {
              [arr[i], arr[i-1]] = [arr[i-1], arr[i]];
              isArraySorted = false;
              i--;
              break;
          }
          i--;
      }
  }
  resolve();
  })
  .then(async (res) => {
    if (!isArraySorted) {
      if (handler.value == 'ascending') {
        show(arr, i-1, i);
        await new Promise(resolve => setTimeout(resolve, timer.value));
      } else {
        await show(arr, i+1, i);
        await new Promise(resolve => setTimeout(resolve, timer.value));
      }
      moves += 2;
      movesHTML.innerHTML = `Moves: ${moves}`;
  }
})
  .then(async (res) => {

  //ENG: reset iterator if it reaches max value
  //RO: reseteaza iteratorul daca atinge valoarea maxima
    
  if (i == arr.length && handler.value == 'ascending') i = 0;

  //ENG: reset iterator if it reaches min value
  //RO: reseteaza iteratorul daca atinge valoarea minima

  if (i == -1 && handler.value == 'descending') i = arr.length-1;
  if (isArraySorted) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (handler.value == 'ascending') {
        if (arr[j] > arr[j + 1]) {
          isArraySorted = false;
        }
      }
      else {
        if (arr[j] < arr[j + 1]) {
          isArraySorted = false;
        }
      }
    }
  }

  //ENG: if the array is not sorted yet, call bubblesort again
  //RO: daca sirul nu este sortat, cheama bubblesort din nou

  if (!isArraySorted) bubblesort(handler.value, i, arr, show, moves, show2);
})
}

export async function selectionsort(initial_handler, end, arr, show, moves) {
  let movesHTML = document.getElementById('moves');
  movesHTML.innerHTML = `Moves: ${moves}`;
  if (initial_handler != handler.value) {

    //ENG: reset end if the sort handler changes
    //RO: daca modul de sortare se schimba reseteaza end

    end = arr.length-1;
    initial_handler = handler.value;
  } 
  if (handler.value == 'ascending') {
  let max = arr[0];
  let index = 0;
  let i = 1;

  //ENG: get the max and its' index
  //RO: ia maximul si index-ul lui

  while (i <= end) {
    if (arr[i] > max) {
      max = arr[i];
      index = i;
    }
    i++;
  }
  //ENG: swap the last element with max
  //RO: schimba ultimul element cu max

  arr[index] = arr[end];
  arr[end] = max;
  show(arr, index, end);
  moves += 2;
  movesHTML.innerHTML = `Moves: ${moves}`;
  await new Promise(resolve => setTimeout(resolve, timer.value));
} else {
  let min = arr[0];
  let index = 0;
  let i = 1;

  //ENG: get the min and its' value
  //RO: ia minimul si index-ul lui

  while (i <= end) {
    if (arr[i] < min) {
      min = arr[i];
      index = i;
    }
    i++;
  }

  //ENG: swap the last element with min
  //RO: schimba ultimul element cu min

  arr[index] = arr[end];
  arr[end] = min;
  show(arr, index, end);
  moves += 2;
  movesHTML.innerHTML = `Moves: ${moves}`;
  await new Promise(resolve => setTimeout(resolve, timer.value));
}
  if (end > 1) selectionsort(initial_handler, end-1, arr, show, moves);
}

export async function insertionsort(end, arr, show, moves) {
  let movesHTML = document.getElementById('moves');
  movesHTML.innerHTML = `Moves: ${moves}`;
  if (handler.value == 'ascending') {
    for (let i = 1; i < end; i++) {
      let pivot = arr[i];
      let j = i-1;
      let swapCheck = false;
      while (j >= 0 && arr[j] > pivot) {
        arr[j+1] = arr[j];
        show(arr, j+1);
        moves += 1;
        swapCheck = true;
        movesHTML.innerHTML = `Moves: ${moves}`;
        await new Promise(resolve => setTimeout(resolve, timer.value));
        j = j-1;
      }
      if (swapCheck) {
        arr[j+1] = pivot;
        show(arr, j+1);
        moves += 1;
        movesHTML.innerHTML = `Moves: ${moves}`;
        await new Promise(resolve => setTimeout(resolve, timer.value));
      }
    }
  } else {
    for (let i = 1; i < end; i++) {
      let pivot = arr[i];
      let j = i-1;
      let swapCheck = false;
      while (j >= 0 && arr[j] < pivot) {
        arr[j+1] = arr[j];
        show(arr, j+1);
        moves += 1;
        swapCheck = true;
        movesHTML.innerHTML = `Moves: ${moves}`;
        await new Promise(resolve => setTimeout(resolve, timer.value));
        j = j-1;
      }
      if (swapCheck) {
        arr[j+1] = pivot;
        show(arr, j+1);
        moves += 1;
        movesHTML.innerHTML = `Moves: ${moves}`;
        await new Promise(resolve => setTimeout(resolve, timer.value));
      }
    }
}
}
async function merge(left, middle, right, arr, show) {
  let movesHTML = document.getElementById('moves');
  movesHTML.innerHTML = `Moves: ${mergesortmoves}`;
  return await new Promise(async (resolve) => {
  let len1 = middle-left+1;
  let arr1 = new Array(len1);
  let len2 = right-middle;
  let arr2 = new Array(len2);
  
  for (let i = 0; i < len1; i++) {
    arr1[i] = arr[left + i];
  }
  
  for (let i = 0; i < len2; i++) {
    arr2[i] = arr[middle+1+i]; 
  }

  let i = 0; let j = 0; let k = left;

  while (i < len1 && j < len2) {
    if (handler.value == 'ascending') {
    if (arr1[i] < arr2[j]) {
      await new Promise(resolve => {
      arr[k] = arr1[i];
      i++;
      show(arr, k);
      mergesortmoves += 1;
      movesHTML.innerHTML = `Moves: ${mergesortmoves}`;
      setTimeout(resolve, timer.value);
      })
    } else {
      await new Promise(resolve => {
      arr[k] = arr2[j];
      j++;
      show(arr, k);
      mergesortmoves += 1;
      movesHTML.innerHTML = `Moves: ${mergesortmoves}`;
      setTimeout(resolve, timer.value);
      });
    }
    k++;
  } else {
    if (arr1[i] > arr2[j]) {
      await new Promise(resolve => {
        arr[k] = arr1[i];
        i++;
        show(arr, k);
        mergesortmoves += 1;
        movesHTML.innerHTML = `Moves: ${mergesortmoves}`;;
        setTimeout(resolve, timer.value);
      })
    } else {
      await new Promise(resolve => {
      arr[k] = arr2[j];
      j++;
      show(arr, k);
      mergesortmoves += 1;
      movesHTML.innerHTML = `Moves: ${mergesortmoves}`;
      setTimeout(resolve, timer.value);
      });
    }
    k++;
  }
}

  while (i < len1) {
    await new Promise(resolve => {
      arr[k] = arr1[i];
      show(arr, k);
      mergesortmoves += 1;
      movesHTML.innerHTML = `Moves: ${mergesortmoves}`;
      i++;
      k++;
      setTimeout(resolve, timer.value);
    })
  }

  while (j < len2) {
    await new Promise(resolve => {
      arr[k] = arr2[j];
      show(arr, k);
      mergesortmoves += 1;
      movesHTML.innerHTML = `Moves: ${mergesortmoves}`;
      j++;
      k++;
      setTimeout(resolve, timer.value);
    })
  }
  resolve();
  })
}

export async function mergesort(initial_handler, left, right, arr, show) {
  if (left >= right) {
    return;
  }
  let middle = left + Math.floor((right-left)/2);
  await mergesort(initial_handler, left, middle, arr, show);  
  await mergesort(initial_handler, middle+1, right, arr, show);
  await merge(left, middle, right, arr, show);
}

export async function randomsort(end, arr, show, moves) {
  processing = true;
  let movesHTML = document.getElementById('moves');
  movesHTML.innerHTML = `Moves: ${moves}`;
  while (stopRandomsort.checked) {

  //ENG: get two random indexes
  //RO: ia doi indici aleatorii

  let firstRandomElement = Math.floor(Math.random() * (end+1));
  let secondRandomElement = Math.floor(Math.random() * (end+1));

  //ENG: swap the elements
  //RO: schimba elementele

  [arr[firstRandomElement], arr[secondRandomElement]] = [arr[secondRandomElement], arr[firstRandomElement]];
  
  //ENG: show the swap
  //RO: arata schimbarea

  show(arr, firstRandomElement, secondRandomElement);
  moves += 2;
  movesHTML.innerHTML = `Moves: ${moves}`;
  await new Promise(resolve => setTimeout(resolve, timer.value));
  
  let sorted = true;

  //ENG: check if the array is sorted, and if it is, break
  //RO: verifica daca sirul este sortat, si daca e, iesi

  for (let i = 0; i < end; i++) {
    if (handler.value == 'ascending') {
      if (arr[i] > arr[i+1]) sorted = false;
    } else {
      if (arr[i] < arr[i+1]) sorted = false;
    }
  }
  if (sorted) break;
  }
}