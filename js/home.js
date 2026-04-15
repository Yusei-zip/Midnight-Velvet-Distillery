window.AppHome = (function () {
  async function loadHome() {
    var drinks = await window.AppAPI.searchDrinks("m");
    window.AppRender.renderGrid(drinks);
  }

  return {
    loadHome
  };
})();
