"use strict";

function ingredientsHover() {
  document.getElementById("ingredients").firstElementChild.firstElementChild.style.fontSize = "200%";
}

function ingredientsNormal() {
  document.getElementById("ingredients").firstElementChild.firstElementChild.style.fontSize = "100%";
}

function preparationHover() {
  document.getElementById("preparation").firstElementChild.firstElementChild.style.fontSize = "200%";
}

function preparationNormal() {
  document.getElementById("preparation").firstElementChild.firstElementChild.style.fontSize = "100%";
} //set HTML elements


var mealTitle = document.getElementById("strMeal");
var mealImage = document.getElementById("image");
var category = document.getElementById('category');
var tags = document.getElementById('tags');
var filterList = document.getElementById('filter');
var youtube = document.getElementById("youtube");
var source = document.getElementById("source"); //add list element

function addAsListItem(list, value) {
  var listItem = document.createElement("li");
  listItem.textContent = value;
  list.append(listItem);
} // show ingredients


function showIngredients(mealObj) {
  var ingredientsList = document.getElementById('ingredient-measure');
  var ingredientName;
  var ingredientMeasure;
  var valueToShow;

  for (var i = 0; i <= 20; i++) {
    if (mealObj["strIngredient".concat(i)]) {
      ingredientName = mealObj["strIngredient".concat(i)];
      ingredientMeasure = mealObj["strMeasure".concat(i)];
      valueToShow = "".concat(ingredientMeasure, "  ").concat(ingredientName);
      addAsListItem(ingredientsList, valueToShow);
    }
  }
} //show preparation list


function showPreparationInstructions(mealObj) {
  var prepInstructionsList = document.getElementById("preparation-instructions");
  var instructionsArr = mealObj.strInstructions.split('. ');
  instructionsArr.forEach(function (instruction) {
    addAsListItem(prepInstructionsList, instruction);
  });
}

function showMealMetaInfo(mealObj) {
  var header = document.querySelector('header');
  header.insertAdjacentHTML('beforeend', "<div class\"filter\"><h3 class=\"fa fa-tag\"> ".concat(mealObj.strCategory, "</h3></div>"));

  if (mealObj.strTags) {
    header.insertAdjacentHTML('beforeend', "<div class=\"filter\"><h3 class=\"fa fa-hashtag\"> ".concat(mealObj.strTags, "</h3></div>"));
  }
} //run async function 


function getMeal() {
  var apiUrl, response, data, mealObj;
  return regeneratorRuntime.async(function getMeal$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(apiUrl));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          mealObj = data.meals[0];
          console.log(mealObj);
          mealTitle.textContent = mealObj.strMeal;
          mealImage.src = mealObj.strMealThumb;
          source.src = mealObj.strSource;
          youtube.innerText = mealObj.strYoutube;
          showIngredients(mealObj);
          showPreparationInstructions(mealObj);
          showMealMetaInfo(mealObj);
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 19]]);
}

getMeal();