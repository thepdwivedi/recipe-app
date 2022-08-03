import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Body from "./components/Body/Body.js";
import "./App.css";
import UserContext from "./components/User/User";
const user = {
  name: "Pankaj Dwivedi",
  theme: "dark-mode",
  version: "v1.0",
  groceryListName: "GroceryList",
  favouriteListName: "FavouriteList",
  appName: "Recipe App",
};

function App() {
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Header />
        <Body />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
