import refs from "./refs.js";
import apiService from "./apiService.js";
import templateHbs from "../template/template.hbs";
import debounce from "lodash.debounce";
import * as basicLightbox from "basiclightbox";
import lightBoxCss from "../../node_modules/basiclightbox/dist/basicLightbox.min.css";

// Вешаем лайт бокс
refs.galleryList.addEventListener("click", (event) => {
  let boxImg = document.querySelector(".light-box-img");
  if (event.target.nodeName === "IMG") {
    let modalSrc = event.target.dataset.src;

    const instance = basicLightbox.create(`
    <div class="modal">
      <img class'light-box-img' src="${modalSrc}" alt="">
    </div>`);
    instance.show();
  }
});

// Вешаем слушателя которое добавляет новую страницу запроса
refs.form.addEventListener(
  "input",
  debounce((event) => {
    event.preventDefault();
    refs.galleryList.innerHTML = "";
    apiService.querry = event.target.value;
    renderApi();
    refs.input.value = "";
  }, 1000)
);

const loadMoreBtn = document.createElement("button");
loadMoreBtn.addEventListener("click", loadMore);

loadMoreBtn.textContent = "Load more";
loadMoreBtn.classList.add("load-more");

function renderApi() {
  apiService.fetchImages().then(({ hits }) => renderImages(hits));
}

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

  setTimeout(() => {
    window.scrollTo(0, 100);
    window.scrollTo({
      top: 1500,
      behavior: "smooth",
    });
  }, 1000);
}
