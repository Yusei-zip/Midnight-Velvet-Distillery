window.AppState = {
  currentView: "home",
  currentDrink: null,
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  drinkList: [],
  currentIndex: 0,
  isAnimating: false
};
