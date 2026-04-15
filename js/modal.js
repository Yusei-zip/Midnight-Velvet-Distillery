window.AppModal = (function () {
  function openModalById(id) {
    return window.AppAPI.lookupDrinkById(id).then(function (drink) {
      if (!drink) return;
      openModal(drink);
    });
  }

  function openModal(drink) {
    if (!drink || !window.AppElements.modal) return;
    window.AppState.currentDrink = drink;
    var theme = window.AppUtils.getDrinkTheme(drink);
    window.AppUtils.applyTheme(theme);

    if (window.AppElements.modalImg) {
      window.AppElements.modalImg.src = drink.strDrinkThumb || "";
    }
    if (window.AppElements.modalTitle) {
      window.AppElements.modalTitle.textContent = drink.strDrink || "";
    }
    if (window.AppElements.modalInstructions) {
      window.AppElements.modalInstructions.textContent = drink.strInstructions || "";
    }
    if (window.AppElements.modalIngredients) {
      window.AppElements.modalIngredients.innerHTML = "";
      for (var i = 1; i <= 15; i++) {
        var ing = drink[`strIngredient${i}`];
        var measure = drink[`strMeasure${i}`];
        if (!ing) continue;
        var li = document.createElement("li");
        li.textContent = `${measure || ""} ${ing}`.trim();
        window.AppElements.modalIngredients.appendChild(li);
      }
    }

    window.AppElements.modal.style.display = "flex";
    window.AppFavorites.updateFavButton();
  }

  function closeModalFn() {
    if (!window.AppElements.modal) return;
    window.AppElements.modal.style.display = "none";
  }

  function initModalEvents() {
    if (window.AppElements.closeModal) {
      window.AppElements.closeModal.addEventListener("click", closeModalFn);
    }

    window.addEventListener("click", function (event) {
      if (event.target === window.AppElements.modal) {
        closeModalFn();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModalFn();
      }
    });

    if (window.AppElements.favBtn) {
      window.AppElements.favBtn.addEventListener("click", function () {
        if (window.AppState.currentDrink) {
          window.AppFavorites.toggleFavorite(window.AppState.currentDrink);
          window.AppFavorites.updateFavButton();
        }
      });
    }

    initSwipe();
  }

  function initSwipe() {
    if (!window.AppElements.modalContent) return;
    var startX = 0;
    window.AppElements.modalContent.addEventListener("touchstart", function (event) {
      startX = event.touches?.[0]?.clientX || 0;
    });
    window.AppElements.modalContent.addEventListener("touchend", function (event) {
      var endX = event.changedTouches?.[0]?.clientX || 0;
      handleSwipe(startX, endX);
    });
    window.AppElements.modalContent.addEventListener("mousedown", function (event) {
      startX = event.clientX;
    });
    window.AppElements.modalContent.addEventListener("mouseup", function (event) {
      handleSwipe(startX, event.clientX);
    });
  }

  function handleSwipe(start, end) {
    var diff = end - start;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) {
      changeDrink((window.AppState.currentIndex - 1 + window.AppState.drinkList.length) % window.AppState.drinkList.length, "left");
    } else {
      changeDrink((window.AppState.currentIndex + 1) % window.AppState.drinkList.length, "right");
    }
  }

  function changeDrink(newIndex, dir) {
    if (window.AppState.isAnimating || window.AppState.drinkList.length === 0 || !window.AppElements.modalContent) return;
    window.AppState.isAnimating = true;
    window.AppElements.modalContent.classList.remove("animate-in", "animate-out-left", "animate-out-right");
    window.AppElements.modalContent.classList.add(dir === "left" ? "animate-out-left" : "animate-out-right");
    setTimeout(function () {
      window.AppElements.modalContent.classList.remove("animate-out-left", "animate-out-right");
      window.AppState.currentIndex = newIndex;
      openModal(window.AppState.drinkList[newIndex]);
      window.AppState.isAnimating = false;
    }, 220);
  }

  return {
    initModalEvents,
    openModalById,
    openModal,
    closeModalFn
  };
})();
