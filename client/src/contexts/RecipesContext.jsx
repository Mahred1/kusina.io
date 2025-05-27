import { createContext, useContext, useEffect, useReducer } from "react";
import Favourite from "../pages/Favourite";

const recipesProvider = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "recipes":
      return { ...state, recipes: action.payload, isLoading: false };
      break;
    case "favourite":
      return { ...state, favourite: action.payload };
      break;
    case "favourite/add":
      return { ...state, favourite: [...state.favourite, action.payload] };
      break;
    case "add/recipe":
      return { ...state, recipes: [...state.recipes, action.payload] };
      break;
    case "loading":
      return { ...state, isLoading: true };
      break;
    case "search":
      return { ...state, search: action.payload };
      break;
    default:
      break;
  }
}
function RecipesContext({ children }) {
  const [{ recipes, favourite, isLoading, search }, dispatch] = useReducer(
    reducer,
    {
      recipes: [],
      favourite: [],
      isLoading: false,
      search: "",
    }
  );
  useEffect(function () {
    async function getData() {
      dispatch({ type: "loading" });
      const res = await fetch("http://127.0.0.1:8000/recipebook/recipes/", {
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("user")}`,
        },
      });
      const data = await res.json();
      dispatch({ type: "recipes", payload: data });
    }
    getData();
  }, []);

  useEffect(function () {
    async function getFav() {
      const res = await fetch("http://localhost:4000/favourite");
      const favourite = await res.json();
      dispatch({ type: "favourite", payload: favourite });
    }
    getFav();
  }, []);
  function updateRecipes(data) {
    dispatch({ type: "recipes", payload: data });
  }
  async function addRecipe(data) {
    console.log(data);
    const res = await fetch("http://127.0.0.1:8000/recipebook/admin/recipes/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.log(res);
    } else {
      dispatch({ type: "add/recipe", payload: data });
    }
  }

  const userFavouriteList = favourite.map((fav) => fav.id);
  const userFavourite = recipes.filter((recipe) =>
    userFavouriteList.includes(recipe.id)
  );
  const searchResult = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search)
  );
  function updateFav(data) {
    dispatch({ type: "favourite", payload: data });
  }
  function onSearch(data) {
    dispatch({ type: "search", payload: data });
  }
  return (
    <recipesProvider.Provider
      value={{
        recipes,
        favourite,
        isLoading,
        userFavourite,
        userFavouriteList,
        search,
        searchResult,
        onSearch,
        updateFav,
        updateRecipes,
        addRecipe,
      }}
    >
      {children}
    </recipesProvider.Provider>
  );
}
function useRecipe() {
  const context = useContext(recipesProvider);
  return context;
}

export { RecipesContext, useRecipe };
