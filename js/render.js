window.AppRender = (function () {
  function renderGrid(drinks) {
    if (!window.AppElements.grid) return;
    window.AppState.drinkList = drinks || [];
    window.AppState.currentIndex = 0;
    window.AppElements.grid.innerHTML = "";

    (drinks || []).forEach(function (drink) {
      var card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${drink.strDrinkThumb}" />
        <h3>${drink.strDrink}</h3>
      `;
      card.addEventListener("click", function () {
        if (drink.idDrink) {
          window.AppModal.openModalById(drink.idDrink);
        }
      });
      window.AppElements.grid.appendChild(card);
    });
  }

  return {
    renderGrid
  };
})();
