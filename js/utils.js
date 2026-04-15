window.AppUtils = (function () {
  const TRADUCCIONES = {
    "Shake well": "Agita bien",
    "Add all ingredients": "Añade todos los ingredientes",
    "Serve immediately": "Sirve de inmediato",
    "Mix well": "Mezcla bien",
    "Fill the glass": "Llena el vaso"
  };

  const THEMES = {
    whiskey: {
      gradient: "radial-gradient(circle at top, #3b1f0f, #0f0f0f)"
    },
    mojito: {
      gradient: "radial-gradient(circle at top, #1f3b2f, #0f0f0f)"
    },
    citrus: {
      gradient: "radial-gradient(circle at top, #3b3a1f, #0f0f0f)"
    },
    default: {
      gradient: "radial-gradient(circle at top, #141414, #0f0f0f)"
    }
  };

  function translateText(text) {
    if (!text) return "";
    let result = text;

    Object.keys(TRADUCCIONES).forEach(key => {
      const regex = new RegExp(key, "gi");
      result = result.replace(regex, TRADUCCIONES[key]);
    });

    return result
      .replace(/Shake well/gi, "Agita bien")
      .replace(/Add all ingredients/gi, "Añade todos los ingredientes")
      .replace(/Serve immediately/gi, "Sirve de inmediato")
      .replace(/Mix well/gi, "Mezcla bien")
      .replace(/Fill the glass/gi, "Llena el vaso");
  }

  function formatBartender(text) {
    if (!text) return "";
    const traducido = translateText(text);
    return traducido.charAt(0).toUpperCase() + traducido.slice(1);
  }

  function getDrinkTheme(drink) {
    if (!drink) return "default";
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ing = drink[`strIngredient${i}`];
      if (ing) ingredients.push(ing.toLowerCase());
    }
    if (ingredients.some(i => i.includes("whiskey") || i.includes("bourbon"))) {
      return "whiskey";
    }
    if (ingredients.some(i => i.includes("mint") || i.includes("lime"))) {
      return "mojito";
    }
    if (ingredients.some(i => i.includes("lemon") || i.includes("orange"))) {
      return "citrus";
    }
    return "default";
  }

  function applyTheme(theme) {
    const body = document.body;
    body.style.transition = "background 0.6s ease";
    body.style.background = THEMES[theme]?.gradient || THEMES.default.gradient;
  }

  return {
    translateText,
    formatBartender,
    getDrinkTheme,
    applyTheme
  };
})();
