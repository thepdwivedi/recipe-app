import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const Search = ({ defaultSearchText, onSearch }) => {
  const [searchText, setSearchText] = useState(defaultSearchText); //Input Search String

  //Handle Input Text Change
  const handleChange = (event) => {
    setSearchText(event.target.value); // get input value and set in searchText variable
    onSearch(event.target.value); //notify Parent => Body.js
  };
  return (
    <div className="App-search">
      <form>
        <input
          type="text"
          name="search"
          value={searchText}
          onChange={(e) => handleChange(e)}
          placeholder="Find Recipe"
        />
      </form>
    </div>
  );
};

Search.propTypes = {
  defaultSearchText: PropTypes.string,
  onSearch: PropTypes.func,
};

Search.defaultProps = {};

export default Search;
