window.AppAPI = (function () {
  const API = "https://www.thecocktaildb.com/api/json/v1/1";

  async function request(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data?.drinks || [];
  }

  return {
    searchDrinks: async function (query) {
      if (!query) return [];
      return request(`${API}/search.php?s=${encodeURIComponent(query)}`);
    },
    getRandomDrink: async function () {
      const drinks = await request(`${API}/random.php`);
      return drinks[0] || null;
    },
    lookupDrinkById: async function (id) {
      const drinks = await request(`${API}/lookup.php?i=${encodeURIComponent(id)}`);
      return drinks[0] || null;
    },
    filterDrinksByIngredient: async function (ingredient) {
      if (!ingredient || ingredient === "all") {
        return this.searchDrinks("m");
      }
      return request(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`);
    }
  };
})();
