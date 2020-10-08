import refs from "./refs.js";
import apiService from "./apiService.js";
import templateHbs from "../template/template.hbs";
import debounce from "lodash.debounce";

refs.form.addEventListener(
  "input",
  debounce((event) => {
    event.preventDefault();
    apiService.querry = event.target.value;
    renderApi();
    refs.input.value = "";
  }, 1000)
);
const loadMoreBtn = document.createElement("button");
loadMoreBtn.addEventListener("click", loadMore);

function renderApi() {
  apiService.fetchImages().then(({ hits }) => renderImages(hits));
}

loadMoreBtn.textContent = "Load more";
loadMoreBtn.classList.add("load-more");

function renderImages(data) {
  const items = templateHbs(data);
  refs.galleryList.insertAdjacentHTML("beforeend", items);
  if (refs.galleryList) {
    refs.body.insertAdjacentElement("beforeend", loadMoreBtn);
    loadMoreBtn.classList.remove("hidden");
  } else {
    loadMoreBtn.classList.add("hidden");
  }
}

function loadMore() {
  apiService.setPage();
  apiService.fetchImages().then(({ hits }) => renderImages(hits));
}
