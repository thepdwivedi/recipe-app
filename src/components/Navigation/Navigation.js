import React, { useState, useContext } from "react";
import GroceryList from "../GroceryList/GroceryList.js";
import FavouriteItems from "../FavouriteItems/FavouriteItems.js";
import UserContext from "../User/User";
import "./Navigation.css";
import { FaUserCircle, FaClipboardList, FaRegHeart } from "react-icons/fa";

const Navigation = () => {
  let [activeTab, setActiveTab] = useState(); //Active Tab/ Menu Item Name
  const user = useContext(UserContext);

  //Based activeTab value Menu item will be highlighted and pop over will be come up
  const handleShowGroceryList = () => {
    setActiveTab("grocery-tab");
  };
  const handleOnGroceryClose = () => {
    setActiveTab("");
  };

  const handleUserTabClick = () => {
    setActiveTab("user-tab");
  };

  const handleShowFavouriteList = () => {
    setActiveTab("favourite-tab");
  };

  const handleOnFavouriteClose = () => {
    setActiveTab("");
  };

  return (
    <div className="app-nav">
      <ul>
        <li
          className={activeTab === "favourite-tab" ? "active-tab" : ""}
          onClick={() => handleShowFavouriteList()}
        >
          {" "}
          <FaRegHeart />
          Favourites
        </li>
        <li
          className={activeTab === "grocery-tab" ? "active-tab" : ""}
          onClick={() => handleShowGroceryList()}
        >
          {" "}
          <FaClipboardList /> Grocery List
        </li>
        <li
          className={activeTab === "user-tab" ? "active-tab" : ""}
          onClick={() => handleUserTabClick()}
        >
          <FaUserCircle /> {user.name}
        </li>
      </ul>
      {activeTab === "grocery-tab" && (
        <GroceryList onGroceryClose={handleOnGroceryClose} />
      )}
      {activeTab === "favourite-tab" && (
        <FavouriteItems onFavouriteClose={handleOnFavouriteClose} />
      )}
    </div>
  );
};

Navigation.propTypes = {};

Navigation.defaultProps = {};

export default Navigation;
