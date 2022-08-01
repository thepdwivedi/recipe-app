import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "./GroceryList.css";
import UserContext from "../User/User";
import { FaWindowClose } from "react-icons/fa";
import PubSub from "pubsub-js";

const GroceryList = ({ onGroceryClose }) => {
  const user = useContext(UserContext);
  const [groceryList, setGroceryList] = useState([]); // Items List

  // add the function to the list of subscribers for a particular topic
  PubSub.subscribe("GroceryChange", (msg, data) => {
    refreshList();
  });

  // handle close pop over click
  const handleCloseGroceryList = () => {
    onGroceryClose(); // Notify Parent
  };
  //handle Remove Item
  const handleRemoveItem = (item) => {
    let groceryMap = new Map();
    //get List from Local storage
    if (localStorage.getItem(user.groceryListName) !== null) {
      groceryMap = new Map(
        JSON.parse(localStorage.getItem(user.groceryListName))
      );
      let list = [];
      //delete Selected Item
      groceryMap.delete(item);
      groceryMap.forEach((value, key) => {
        list.push({
          itemName: key,
          quantity: value,
        });
      });

      setGroceryList(list); // upadte list
      //update local Storage
      localStorage.setItem(
        user.groceryListName,
        JSON.stringify([...groceryMap])
      );
    }
  };

  //update list once component open
  const refreshList = () => {
    let groceryMap = new Map();
    if (localStorage.getItem(user.groceryListName) !== null) {
      groceryMap = new Map(
        JSON.parse(localStorage.getItem(user.groceryListName))
      );
      let list = [];
      groceryMap.forEach((value, key) => {
        list.push({
          itemName: key,
          quantity: value,
        });
      });
      setGroceryList(list);
    }
  };
  //update using refreshList method
  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div className="pop-up">
      <div></div>
      <div className="item">
        <div>Items to Shop</div>
        <div className="remove-item" onClick={() => handleCloseGroceryList()}>
          <FaWindowClose />
        </div>
      </div>
      <hr />
      {groceryList.length > 0 ? (
        groceryList.map((g, index) => (
          <div className="item">
            <div>
              {index + 1}. {g.itemName}{" "}
            </div>
            <div
              className="remove-item"
              onClick={() => handleRemoveItem(g.itemName)}
            >
              <FaWindowClose />
            </div>
          </div>
        ))
      ) : (
        <div className="item">
          <div>No Item for Shopping</div>
        </div>
      )}
    </div>
  );
};

GroceryList.propTypes = {
  onGroceryClose: PropTypes.func,
};

GroceryList.defaultProps = {};

export default GroceryList;
