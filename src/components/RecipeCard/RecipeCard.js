/*
component Name : RecipeCard.js
Developer : Pankaj Dwivedi
Description : Main content component, anything between header & footer
*/
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../User/User";
import "./RecipeCard.css";
import Ingredient from "../Ingredient/Ingredient.js";
import { FaEye, FaEyeSlash, FaRegHeart, FaHeart } from "react-icons/fa";
import PubSub from "pubsub-js";

const RecipeCard = ({ recipe, onFavouriteChange }) => {
  const [image_url, setImage_url] = useState(recipe.image);
  const user = useContext(UserContext); //User Context
  const [hideDescription, sethideDescription] = useState(true); // Show or hide Descriptions
  const [isFavourite, setIsFavourite] = useState(recipe.isFavourite); // Local Favourite Boolean

  //Handle Favourite Button Click
  const handleFavouriteToggle = (recipeId) => {
    let FavouriteSet = new Map(); // Map to hold Recipe Id and Name
    //get Data from Local Storage
    if (localStorage.getItem(user.favouriteListName) !== null) {
      //Parse String to convert into JS Map
      FavouriteSet = new Map(
        JSON.parse(localStorage.getItem(user.favouriteListName))
      );
      //If already Favourite Remove
      if (FavouriteSet.has(recipeId)) {
        FavouriteSet.delete(recipeId);
      } else {
        //Add to Favourite
        FavouriteSet.set(recipeId, recipe.name);
      }
    }
    // Update Local Storage
    localStorage.setItem(
      user.favouriteListName,
      JSON.stringify([...FavouriteSet])
    );
    //Notify Parent, Body.js
    onFavouriteChange();
    //Update Local Boolean to Highlight Favourite Icon
    setIsFavourite(recipe.isFavourite);
    PubSub.publish("FavouriteChange", "Update");
  };
  //Toggle Show and hide desciption
  const handleShowHideToggle = () => {
    sethideDescription(!hideDescription);
  };
  const handleError = () => {
    setImage_url(process.env.PUBLIC_URL + "/logo.png");
  };

  return (
    <article className="article">
      <div className="card">
        <img src={image_url} alt="Avatar" onError={handleError} />
        <div className="container">
          <h4>
            <b>{recipe.name}</b>
          </h4>
          <p>CookTime: {recipe.cookTime}</p>
          <p>PrepTime: {recipe.prepTime}</p>
          <p>Yield: {recipe.recipeYield ? recipe.recipeYield : "N/A"}</p>

          <div className={hideDescription ? "hide-description" : null}>
            <p> {recipe.description}</p>
            <p>
              <b>Ingredients</b>
            </p>
            <hr />
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <Ingredient ingredient={ingredient} />
              ))}
            </ul>
          </div>
          <button
            className="card-button card-button-1"
            onClick={(e) => handleShowHideToggle(e)}
          >
            {hideDescription ? <FaEye /> : <FaEyeSlash />}
            {hideDescription ? "View Recipe" : "Hide Recipe"}
          </button>
          <button
            className="card-button"
            onClick={(e) => handleFavouriteToggle(recipe.recipeId)}
          >
            {isFavourite ? <FaHeart /> : <FaRegHeart />}
            {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
          </button>
        </div>
      </div>
    </article>
  );
};
//Best Practice to avoid data type error
RecipeCard.propTypes = {
  recipe: PropTypes.object,
  onFavouriteChange: PropTypes.func,
};

RecipeCard.defaultProps = {
  recipeId: "1",
  name: "Morrocan Carrot and Chickpea Salad",
  description:
    "A beauty of a carrot salad - tricked out with chickpeas, chunks of dried pluots, sliced almonds, and a toasted cumin dressing. Thank you Diane Morgan.",
  image:
    "http://www.101cookbooks.com/mt-static/images/food/moroccan_carrot_salad_recipe.jpg",
  recipeYield: "",
  cookTime: "",
  prepTime: "PT15M",
  ingredients: [
    "Dressing:",
    "1 tablespoon cumin seeds",
    "1/3 cup / 80 ml extra virgin olive oil",
    "2 tablespoons fresh lemon juice",
    "1 tablespoon honey",
    "1/2 teaspoon fine sea salt, plus more to taste",
    "1/8 teaspoon cayenne pepper",
    "10 ounces carrots, shredded on a box grater or sliced whisper thin on a mandolin",
    "2 cups cooked chickpeas (or one 15- ounce can, drained and rinsed)",
    "2/3 cup / 100 g  dried pluots, plums, or dates cut into chickpea-sized pieces",
    "1/3 cup / 30 g fresh mint, torn",
    "For serving: lots of toasted almond slices, dried or fresh rose petals - all optional (but great additions!)",
  ],
};

export default RecipeCard;
