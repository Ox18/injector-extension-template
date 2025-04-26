const fetchContent = (url) => {
  // const path = chrome.extension.getURL(url);
  const path = "http://localhost:5500/js/script.js";
  return fetch(path)
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Hubo un problema con la petición Fetch:");
      console.log("Path:", path);
      console.error("Error al leer el archivo:", error);
    });
};

chrome.storage.sync.get("css_injector", async function (data) {
  console.log("gaaaaa#1 =================================");
  if (document.location.host !== "elcomercio.pe") {
    return;
  }

  const checkoutContainer = document.getElementById("articulos-premium");

  const verifyPremium = () => {
    return new Promise((resolve) => {
      resolve(!!checkoutContainer);
    });
  };

  const removeFader = () => {
    const styleElement = document.querySelector(".story-contents--fade");
    if (styleElement) {
      styleElement.classList.remove("story-contents--fade");
    }
  };

  const removeTpModal = () => {
    setInterval(() => {
      const tpModal = document.querySelector(".tp-modal");
      console.log("existe tpModal", tpModal);
      if (tpModal) {
        tpModal.remove();
      }
    }, 1000);
  };

  const removeGoogleAds = () => {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = "ins { visibility: hidden !important; }";
    document.head.appendChild(style);
  };

  const removePremium = () => {
    checkoutContainer.remove();
  };

  const unlockContent = () => {
    const contenedor = document.getElementById("contenedor");
    if (contenedor) {
      contenedor.style.height = "auto";
      contenedor.style.opacity = "1";
      contenedor.style.visibility = "visible";
    }
  };

  const removeBackdrop = () => {
    // // tp-backdrop tp-active
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = ".tp-backdrop.tp-active { visibility: hidden !important; }";
    document.head.appendChild(style);
  };

  const isPremium = await verifyPremium();

    if (!isPremium) {
      console.log("====================[COMERCIO] No es premium");
      return;
    }

    console.log("====================[COMERCIO] Es premium");

    removePremium();
    removeFader();
    unlockContent();
    removeTpModal()
    removeBackdrop()
    removeGoogleAds();
});
