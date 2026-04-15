window.AppEvents = (function () {
  var searchTimeout;

  function setActive(selected) {
    window.AppElements.links.forEach(function (link) {
      link.classList.remove("active");
    });
    selected.classList.add("active");
  }

  function setView(view) {
    document.querySelectorAll(".view").forEach(function (section) {
      section.classList.add("hidden");
    });
    var current = document.getElementById(view + "View");
    if (current) {
      current.classList.remove("hidden");
    }
  }

  function setupEvents() {
    if (window.AppElements.links?.length) {
      window.AppElements.links.forEach(function (link) {
        var view = link.dataset.view;
        if (!view) return;
        link.addEventListener("click", function (event) {
          event.preventDefault();
          setActive(link);
          setView(view);
        });
      });
    }

    if (window.AppElements.searchInput) {
      window.AppElements.searchInput.addEventListener("input", function (event) {
        clearTimeout(searchTimeout);
        var q = event.target.value.trim();
        searchTimeout = setTimeout(function () {
          if (!q) return;
          window.AppAPI.searchDrinks(q).then(function (drinks) {
            window.AppRender.renderGrid(drinks);
          });
        }, 400);
      });
    }

    if (window.AppElements.randomBtn) {
      window.AppElements.randomBtn.addEventListener("click", function () {
        window.AppAPI.getRandomDrink().then(function (drink) {
          if (drink?.idDrink) {
            window.AppModal.openModalById(drink.idDrink);
          }
        });
      });
    }

    if (window.AppElements.filterButtons?.length) {
      window.AppElements.filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          window.AppElements.filterButtons.forEach(function (b) {
            b.classList.remove("active");
          });
          button.classList.add("active");
          var ingredient = button.dataset.ingredient;
          window.AppAPI.filterDrinksByIngredient(ingredient).then(function (drinks) {
            window.AppRender.renderGrid(drinks);
          });
        });
      });
    }
  }

  return {
    setupEvents
  };
})();
