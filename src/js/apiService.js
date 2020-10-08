import refs from "./refs";

const apiKey = "18623550-dab6c274e7256e60b198db2a4";
const baseUrl = "https://pixabay.com/api/";

export default {
  _querry: "",
  page: 1,
  perPage: 12,
  fetchImages() {
    let url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this._querry}&page=${this.page}&per_page=${this.perPage}&key=${apiKey}`;
    return fetch(url)
      .then((res) => res.json())
      .catch((error) => displayEror(error));
  },
  setPage() {
    return this.page++;
  },

  get querry() {
    return this._querry;
  },

  set querry(newQuerry) {
    this._querry = newQuerry;
  },
};

function displayEror() {
  const errorH2 = document.createElement("h2");
  errorH2.textContent = error;
  refs.body.prepend(errorH2);
}
