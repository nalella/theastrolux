  // ====== SEARCH FUNCTIONALITY ======
  // Select all search forms
  console.log("Initiating..");
  const searchForms = document.querySelectorAll(".search-container");

  searchForms.forEach(form => {
    const input = form.querySelector("input");

    if (!input) return; // skip if no input

    // Handle form submit (Enter / Go / Search)
    form.addEventListener("submit", e => {
      e.preventDefault();
      const query = input.value.trim();
      if (query) {
        console.log("Search query:", query);
        // Replace this with your actual search logic:
        // Example: redirect to category page with query
        window.location.href = `category.html?search=${encodeURIComponent(query)}`;
      }
    });

    // Optional: support button clicks if you have buttons
    const button = form.querySelector("button");
    if (button) {
      button.addEventListener("click", e => {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          console.log("Search query:", query);
          window.location.href = `category.html?search=${encodeURIComponent(query)}`;
        }
      });
    }
  });