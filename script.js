const listFiltersEl = document.querySelectorAll(".profile-filter");
const categoryContainers = document.querySelectorAll(".dashboard-category");

const appendCategory = (category, container, timeframe) => {
  const categoryBody = document.createElement("div");
  categoryBody.classList.add("category-body");

  categoryBody.innerHTML = `
          <div class="category-title-container">
            <p class="category-title">${category.title}</p>
            <img src="/images/icon-ellipsis.svg" alt="" />
          </div>
          <div class="category-timeframes-container">
            <p class="total-hrs">${category.timeframes[timeframe].current}hrs</p>
            <p class="previous-hrs">Last week - ${category.timeframes[timeframe].previous}hrs</p>
          </div>`;

  container.appendChild(categoryBody);
};

const populateDOM = (data, timeframe) => {
  categoryContainers.forEach((container) => {
    // Clear only category-body elements
    const categoryBodies = container.querySelectorAll(".category-body");
    categoryBodies.forEach((body) => {
      container.removeChild(body);
    });
  });

  data.forEach((item) => {
    const container = document.getElementById(item.id);
    appendCategory(item, container, timeframe);
  });
};

// Load data using async await method
async function loadData() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();

    // dafault data onload
    populateDOM(jsonData, "daily");

    // Selecting Active Filter
    listFiltersEl.forEach((item) => {
      item.addEventListener("click", () => {
        // loop through list items and remove active class when the event click happens
        listFiltersEl.forEach((item) => item.classList.remove("active"));
        // Add active class on the clicked item
        item.classList.add("active");

        const timeframe = item.dataset.id;

        populateDOM(jsonData, timeframe);
      });
    });
  } catch (error) {
    console.error("Error loading JSON", error);
  }
}

loadData();
