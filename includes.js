document.addEventListener("DOMContentLoaded", function () {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => console.error(err));
  });
});



// LOAD COMPONENTS AND SCRIPTS
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Dynamically load HTML into a container and then load a script.
   * @param {string} selector - CSS selector for container (e.g. ".sidebar")
   * @param {string} htmlFile - Path to HTML file to fetch (e.g. "sidebar.html")
   * @param {string} jsFile - Path to JS file to load after HTML injection (optional)
   */
  function loadComponent(selector, htmlFile, jsFile) {
    const container = document.querySelector(selector);
    if (!container) {
      console.warn(`Container not found: ${selector}`);
      return;
    }

    fetch(htmlFile)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${htmlFile}`);
        return response.text();
      })
      .then(html => {
        container.innerHTML = html;
        console.log(`✅ ${htmlFile} loaded into ${selector}`);

        if (jsFile) {
          const script = document.createElement("script");
          script.src = jsFile;
          script.onload = () => console.log(`✅ ${jsFile} loaded`);
          script.onerror = () => console.error(`❌ Failed to load ${jsFile}`);
          document.body.appendChild(script);
        }
      })
      .catch(err => console.error(`❌ Error loading ${selector}:`, err));
  }

  // Example usage:
  loadComponent(".sidebar", "sidebar.html", "sidebar.js");
  loadComponent("header", "header.html", "header.js");
  loadComponent("footer", "footer.html", null); // footer might not need a script
});
