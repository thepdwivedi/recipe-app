/*
component Name : Body.js
Developer : Pankaj Dwivedi
Description : Main content component, anything between header & footer
*/

import React, { useState, useContext, useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard.js";
import Search from "../Search/Search.js";
import UserContext from "../User/User";
import recipesdata from "../../data/recipes.json";
import PubSub from "pubsub-js";
function Body() {
  const user = useContext(UserContext); // User Context
  const [recipes, setRecipes] = useState([]); //Temporary list of recipes either all items or filtered items
  const [originalRecipesData, setOriginalRecipesData] = useState([]);

  // add the function to the list of subscribers for a particular topic
  PubSub.subscribe("FavouriteChange", (msg, data) => {
    handleFavouriteChange();
  });

  //Method to handle favourite button click on recipeCard
  //this function will update isFovourite boolean value in item and rerender again
  const handleFavouriteChange = () => {
    let FavouriteList = new Map();
    //get fovourite item list from local storage
    if (localStorage.getItem(user.favouriteListName) !== null) {
      //convert storage string to JavaScript Map
      FavouriteList = new Map(
        JSON.parse(localStorage.getItem(user.favouriteListName))
      );
      //isFavourite check logic
      originalRecipesData.map((recipe) => {
        recipe.isFavourite = FavouriteList.has(recipe.recipeId);
      });
      setRecipes(originalRecipesData);
    }
  };

  //Convert Time format
  const convertTime = (time) => {
    let formatedTime = "N/A";
    let hours = "00";
    let minutes = "00";

    if (time) {
      //if field has value process else assign "00:00"
      time = time.replace("PT", "");
      if (time.includes("H")) {
        //Hour logic
        hours = time.substring(0, time.indexOf("H"));
        const timeArray = time.split("H");
        // Hours with minutes logic
        if (timeArray.length > 1 && timeArray[1].includes("M")) {
          minutes = timeArray[1].substring(0, timeArray[0].indexOf("M"));
        }
      } else {
        //only Minutes logic
        if (time.includes("M")) {
          minutes = time.substring(0, time.indexOf("M"));
        }
      }
      //check if minutes are more than 60 mins and add hours
      if (parseInt(minutes) >= 60) {
        hours = parseInt(hours) + Math.floor(parseInt(minutes) / 60) + "";
        minutes = (parseInt(minutes) % 60) + "";
      }
      //format string
      formatedTime =
        (hours.length > 1 ? hours : "0" + hours) +
        ":" +
        (minutes.length > 1 ? minutes : "0" + minutes);
    }
    return formatedTime;
  };
  //this method will handle search input change
  const searchRecipe = (searchText) => {
    setRecipes(
      originalRecipesData.filter((recipe) => {
        return (
          recipe.name.toUpperCase().includes(searchText.toUpperCase()) ||
          recipe.ingredients
            .toString() //convert array into string
            .toUpperCase()
            .includes(searchText.toUpperCase()) ||
          recipe.description.toUpperCase().includes(searchText.toUpperCase())
        );
      })
    );
  };
  //Fetch callout to get data using recipes.json stored in public folder
  useEffect(() => {
    // fetch(process.env.PUBLIC_URL + "recipes.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    let data = recipesdata;
    let FavouriteList = new Map();
    if (localStorage.getItem(user.favouriteListName) !== null) {
      FavouriteList = new Map(
        JSON.parse(localStorage.getItem(user.favouriteListName))
      );
    }
    let id = 1000;
    data.map((d) => {
      d.recipeId = id++; //Id required for many logic
      d.cookTime = convertTime(d.cookTime); //convert Time
      d.prepTime = convertTime(d.prepTime);
      d.isFavourite = FavouriteList.has(d.recipeId); // add favourite list
    });
    setOriginalRecipesData(data); //set data to original data source
    setRecipes(data); //set data to temporary data source
    // })

    // .catch((error) => {
    //   console.log(error);
    // });
  }, []);

  return (
    <div className="App-body">
      <img
        className="App-logo"
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="Website Logo"
      />
      {/* seacrh component */}
      <Search onSearch={searchRecipe} />
      {/* add recipe card  */}
      <div className="App-body-container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.recipeId}
            recipe={recipe}
            onFavouriteChange={handleFavouriteChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Body;
