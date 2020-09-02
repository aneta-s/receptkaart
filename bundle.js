(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// hover effect icons
function ingredientsHover() {
  document.getElementById(
    "ingredients"
  ).firstElementChild.firstElementChild.style.fontSize = "200%";
}
function ingredientsNormal() {
  document.getElementById(
    "ingredients"
  ).firstElementChild.firstElementChild.style.fontSize = "100%";
}
function preparationHover() {
  document.getElementById(
    "preparation"
  ).firstElementChild.firstElementChild.style.fontSize = "200%";
}
function preparationNormal() {
  document.getElementById(
    "preparation"
  ).firstElementChild.firstElementChild.style.fontSize = "100%";
}

//set HTML elements
const mealTitle = document.getElementById("strMeal");
const mealImage = document.getElementById("image");

const category = document.getElementById("div1");
const tags = document.getElementById("tags");
const filterList = document.getElementById("filter");
const youTube = document.getElementById("youTube");
const source = document.getElementById("source");

//add list element
function addAsListItem(list, value) {
  const listItem = document.createElement("li");
  listItem.textContent = value;
  list.append(listItem);
}

// show ingredients
function showIngredients(mealObj) {
  let ingredientsList = document.getElementById("ingredient-measure");
  let ingredientName;
  let ingredientMeasure;
  let valueToShow;

  for (let i = 0; i <= 20; i++) {
    if (mealObj[`strIngredient${i}`]) {
      ingredientName = mealObj[`strIngredient${i}`];
      ingredientMeasure = mealObj[`strMeasure${i}`];
      valueToShow = `${ingredientMeasure}  ${ingredientName}`;

      addAsListItem(ingredientsList, valueToShow);
    }
  }
}
//show preparation list
function showPreparationInstructions(mealObj) {
  const prepInstructionsList = document.getElementById(
    "preparation-instructions"
  );

  const instructionsArr = mealObj.strInstructions.split(". ");

  instructionsArr.forEach((instruction) => {
    addAsListItem(prepInstructionsList, instruction);
  });
}
// show tags & category
function showMealMetaInfo(mealObj) {
  const header = document.querySelector("header");

  header.insertAdjacentHTML(
    "beforeend",
    `<h3 id="div1" class="fa">${mealObj.strCategory}</h3>`
  );

  if (mealObj.strTags) {
    header.insertAdjacentHTML(
      "beforeend",
      `<h3 class="fa fa-hashtag"> ${mealObj.strTags}</h3>`
    );
  }
}
// animate icon
function ratestar() {
  var a;
  a = document.getElementById("div1");
  a.innerHTML = "&#xf006;";
  setTimeout(function () {
    a.innerHTML = "&#xf123;";
  }, 1000);
  setTimeout(function () {
    a.innerHTML = "&#xf005;";
  }, 2000);
}
ratestar();
setInterval(ratestar, 3000);

//run async function
async function getMeal() {
  const apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const mealObj = data.meals[0];

    console.log(mealObj);

    mealTitle.textContent = mealObj.strMeal;
    mealImage.src = mealObj.strMealThumb;
    source.setAttribute(
      "onclick",
      `window.location.href = '${mealObj.strSource}'`
    );
    youTube.setAttribute("href", mealObj.strYoutube);

    showIngredients(mealObj);
    showPreparationInstructions(mealObj);
    showMealMetaInfo(mealObj);
  } catch (error) {
    console.log(error);
  }
}
getMeal();

},{}]},{},[1]);
