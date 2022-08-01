import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "./FavouriteItems.css";
import UserContext from "../User/User";
import { FaWindowClose } from "react-icons/fa";
import PubSub from "pubsub-js";
const FavouriteItems = ({ onFavouriteClose }) => {
  const user = useContext(UserContext); //User Context
  const [items, setItems] = useState([]); // Favourite Items

  // add the function to the list of subscribers for a particular topic
  PubSub.subscribe("FavouriteChange", (msg, data) => {
    refreshList();
  });
  //Handle Close Pop over
  const handleCloseFavouriteItems = () => {
    onFavouriteClose(); // Notify parent => Navigation
  };

  //Handle remove item
  const handleRemoveItem = (item) => {
    let favMap = new Map();
    //get Data from Local Stoarge
    if (localStorage.getItem(user.favouriteListName) !== null) {
      favMap = new Map(
        JSON.parse(localStorage.getItem(user.favouriteListName))
      );
      let list = [];
      favMap.delete(item); // Delete selected Id
      favMap.forEach((value, key) => {
        list.push({
          itemName: value,
          key: key,
        });
      });
      setItems(list); // refresh List
      localStorage.setItem(user.favouriteListName, JSON.stringify([...favMap])); //update local stoarge
      PubSub.publish("FavouriteChange", "Update");
    }
  };

  //Refresh Data once component loaded
  const refreshList = () => {
    let favMap = new Map();
    if (localStorage.getItem(user.favouriteListName) !== null) {
      favMap = new Map(
        JSON.parse(localStorage.getItem(user.favouriteListName))
      );
      let list = [];
      favMap.forEach((value, key) => {
        list.push({
          itemName: value,
          key: key,
        });
      });
      setItems(list);
    }
  };
  //update data from local Stoarge
  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div className="pop-up">
      <div></div>
      <div className="item">
        <div>Favourite Items</div>
        <div
          className="remove-item"
          onClick={() => handleCloseFavouriteItems()}
        >
          <FaWindowClose />
        </div>
      </div>
      <hr />
      {items.length > 0 ? (
        items.map((g, index) => (
          <div className="item">
            <div>
              {index + 1}. {g.itemName}{" "}
            </div>
            <div
              className="remove-item"
              onClick={() => handleRemoveItem(g.key)}
            >
              <FaWindowClose />
            </div>
          </div>
        ))
      ) : (
        <div className="item">
          <div>No Items</div>
        </div>
      )}
    </div>
  );
};

FavouriteItems.propTypes = {
  onFavouriteClose: PropTypes.func,
};

FavouriteItems.defaultProps = {};

export default FavouriteItems;
