window.AppFavorites = (function () {
  function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }

  function saveFavorites(favs) {
    localStorage.setItem("favorites", JSON.stringify(favs));
    window.AppState.favorites = favs;
  }

  function isFavorite(drink) {
    if (!drink) return false;
    return getFavorites().some(fav => fav.idDrink === drink.idDrink);
  }

  function toggleFavorite(drink) {
    if (!drink) return;
    const favs = getFavorites();
    const exists = favs.some(fav => fav.idDrink === drink.idDrink);
    if (exists) {
      saveFavorites(favs.filter(fav => fav.idDrink !== drink.idDrink));
      return false;
    }
    saveFavorites([...favs, drink]);
    return true;
  }

  function updateFavButton() {
    var favBtn = window.AppElements.favBtn;
    if (!favBtn || !window.AppState.currentDrink) return;
    var exists = isFavorite(window.AppState.currentDrink);
    favBtn.textContent = exists ? "❌ Quitar de favoritos" : "❤️ Guardar favorito";
  }

  return {
    getFavorites,
    saveFavorites,
    isFavorite,
    toggleFavorite,
    updateFavButton
  };
})();
