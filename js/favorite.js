(function () {
  function renderFavorites() {
    var favGrid = document.getElementById("favGrid");
    if (!favGrid) return;

    var favs = window.AppFavorites.getFavorites();
    favGrid.innerHTML = "";

    if (favs.length === 0) {
      favGrid.innerHTML = "<p class='empty-state'>Aún no tienes favoritos guardados</p>";
      return;
    }

    favs.forEach(function (drink) {
      var card = document.createElement("div");
      card.classList.add("fav-card");
      card.innerHTML = "<img src='" + drink.strDrinkThumb + "' />" +
        "<button class='remove-btn'>❌</button>" +
        "<div class='fav-card-content'><h3>" + drink.strDrink + "</h3></div>";

      var removeBtn = card.querySelector(".remove-btn");
      removeBtn?.addEventListener("click", function (event) {
        event.stopPropagation();
        removeFavorite(drink.idDrink);
      });

      card.addEventListener("click", function () {
        alert(drink.strDrink);
      });

      favGrid.appendChild(card);
    });
  }

  function removeFavorite(id) {
    var favs = window.AppFavorites.getFavorites().filter(function (d) {
      return d.idDrink !== id;
    });
    window.AppFavorites.saveFavorites(favs);
    renderFavorites();
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderFavorites();
  });
})();
