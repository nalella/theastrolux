// categories.js

// Get query parameters
const params = new URLSearchParams(window.location.search);
const categoryName = params.get("name");
const yearParam = params.get("year");
const monthParam = params.get("month");
const dayParam = params.get("day");
const searchParam = params.get("search"); // NEW

// Update the tab title and subheader
const subHeader = document.querySelector(".sub-header .message");

function formatHeader() {
  let label = "Categories";

  if (searchParam) label = `Search: "${searchParam}"`;
  else {
    const parts = [];
    if (categoryName) parts.push(categoryName);
    if (monthParam) parts.push(monthParam);
    if (yearParam) parts.push(yearParam);
    if (dayParam) parts.push(`Day ${dayParam}`);
    label = parts.join(" ") || "Categories";
  }

  document.title = `${label} | theastrolux`;
  subHeader.textContent = label;
}

formatHeader();

// Fetch and display posts
Promise.all([fetch("posts.json"), fetch("posts-content.json")])
  .then(async ([metaRes, fullRes]) => {
    const [meta, full] = await Promise.all([metaRes.json(), fullRes.json()]);
    const fullMap = new Map(full.map(p => [p.id, p]));
    let posts = meta.map(p => ({
      ...p,
      content: fullMap.get(p.id)?.content || ""
    }));

    // Apply filters
    let filtered = posts;

    // Search filter
    if (searchParam) {
      const query = searchParam.toLowerCase();
      filtered = posts.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query)
      );
    }

    // Category and date filters
    if (categoryName) {
      filtered = filtered.filter(
        p => p.category.toLowerCase() === categoryName.toLowerCase()
      );
    }
    if (yearParam) filtered = filtered.filter(p => String(p.year) === String(yearParam));
    if (monthParam)
      filtered = filtered.filter(
        p => p.month.toLowerCase() === monthParam.toLowerCase()
      );
    if (dayParam) filtered = filtered.filter(p => String(p.day) === String(dayParam));

    // If no results found
    const contentDiv = document.querySelector(".content");
    if (filtered.length === 0) {
      contentDiv.innerHTML = "<p>No posts found for this search.</p>";
      return;
    }

    // Sort newest first
    const monthOrder = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

    filtered.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      if (a.month !== b.month) return monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month);
      return (b.day || 0) - (a.day || 0);
    });

    // Display posts
    contentDiv.innerHTML = filtered
      .map(p => `
        <div class="post-card">
          <img src="${p.thumbnail}" alt="${p.title}">
          <div>
            <a href="${p.url}" style="text-decoration:none; color:inherit;">
              <h2>${p.title}</h2>
            </a>
            <a href="${p.cUrl}" style="text-decoration:none; color:#beb591;">
              <h4>${p.category}</h4>
            </a>
            <p style="font-size: 0.9em; color: gray;">
              ${p.month}${p.day ? ' ' + p.day + ',' : ''} ${p.year} · ${p.author}
            </p>
            <p>${p.excerpt}</p>
          </div>
        </div>
      `)
      .join("");
  })
  .catch(err => {
    console.error("Error loading posts:", err);
    document.querySelector(".content").innerHTML =
      "<p>Failed to load posts.</p>";
  });

