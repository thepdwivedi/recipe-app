import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FaPlusSquare } from "react-icons/fa";
import UserContext from "../User/User";
import PubSub from "pubsub-js";
import "./Ingredient.css";

const Ingredient = ({ ingredient }) => {
  const user = useContext(UserContext); //User Context
  //Add item to local Storage
  const handleAddIngredient = () => {
    let groceryMap = new Map();
    if (localStorage.getItem(user.groceryListName) !== null) {
      groceryMap = new Map(JSON.parse(localStorage.getItem("GroceryList")));

      if (groceryMap.has(ingredient)) {
        groceryMap.set(ingredient, groceryMap.get(ingredient) + 1);
      } else {
        groceryMap.set(ingredient, 1);
      }
    }
    //convert into string and store
    localStorage.setItem(user.groceryListName, JSON.stringify([...groceryMap]));
    PubSub.publish("GroceryChange", "Update");
  };

  return (
    <li className="add-icon" onClick={handleAddIngredient}>
      {ingredient}{" "}
      <span className="add-icon" >
        <FaPlusSquare />
      </span>
    </li>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.string,
};

Ingredient.defaultProps = {};

export default Ingredient;
