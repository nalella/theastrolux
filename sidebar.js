// sidebar.js — DO NOT wrap in DOMContentLoaded
(function sidebarLogic() {
  // ====== LOAD RECENT POSTS ======
  const recentList = document.getElementById("recent-posts");
  if (recentList) {
    fetch("posts.json")
      .then(response => {
        if (!response.ok) throw new Error("Failed to load posts.json");
        return response.json();
      })
      .then(posts => {
        // Sort posts by newest date
        posts.sort((a, b) => getPostDate(b) - getPostDate(a));
        const latest = posts.slice(0, 5);

        // Inject posts into sidebar
        recentList.innerHTML = latest
          .map(p => `
            <li>
              <a href="${p.url}" title="${p.title}">
                ${p.title}
              </a>
              <br>
              <small>${p.month} ${p.day}, ${p.year}</small>
            </li>
          `)
          .join("");
      })
      .catch(err => {
        console.error("Error loading latest posts:", err);
        recentList.innerHTML = "<li><em>Failed to load recent posts.</em></li>";
      });
  }

  // ====== SEARCH FUNCTIONALITY ======
  const searchInput = document.querySelector(".search-container input");
  const searchButton = document.querySelector(".search-container .search-btn");

  if (searchInput && searchButton) {
    // When user presses Enter in the input
    searchInput.addEventListener("keypress", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearch();
      }
    });

    // When user clicks the button
    searchButton.addEventListener("click", handleSearch);
  }

  function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    // Redirect to category.html with a search parameter
    window.location.href = `category.html?search=${encodeURIComponent(query)}`;
  }

  // ====== HELPERS ======
  function getMonthIndex(monthName) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months.findIndex(
      m => m.toLowerCase() === (monthName || "").toLowerCase()
    );
  }

  function getPostDate(p) {
    const year = parseInt(p.year);
    const month = getMonthIndex(p.month);
    const day = parseInt(p.day) || 1;
    return new Date(year, month, day);
  }
})();





