document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const logoutLink = document.getElementById("logout-link");

  if (!user || user.role !== "admin") {
    alert("Ви повинні увійти як адміністратор для доступу до цієї сторінки.");
    window.location.href = "index.html";
  } else {
    loadBooks();
    loadNews();

    document.querySelectorAll(".tab-button").forEach((button) => {
      button.addEventListener("click", function () {
        document
          .querySelectorAll(".tab")
          .forEach((tab) => tab.classList.remove("active"));
        document
          .querySelectorAll(".tab-button")
          .forEach((btn) => btn.classList.remove("active"));
        document.getElementById(this.dataset.tab).classList.add("active");
        this.classList.add("active");
      });
    });

    document
      .getElementById("add-book-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const newBook = {
          title: document.getElementById("title").value,
          author: document.getElementById("author").value,
          year: document.getElementById("year").value,
          publisher: document.getElementById("publisher").value,
          genre: document.getElementById("genre").value,
          category: document.getElementById("category").value,
          description: document.getElementById("description").value,
          cover: document.getElementById("cover").value,
          language: document.getElementById("language").value,
        };

        const books = JSON.parse(localStorage.getItem("books")) || [];
        books.push(newBook);
        localStorage.setItem("books", JSON.stringify(books));

        alert("Книга додана успішно!");
        this.reset();
        loadBooks();
      });

    logoutLink.addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });

    document
      .getElementById("add-news-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const newNews = {
          title: document.getElementById("news-title").value,
          content: document.getElementById("news-content").value,
          date: new Date().toLocaleDateString(),
        };

        const newsList = JSON.parse(localStorage.getItem("news")) || [];
        newsList.push(newNews);
        localStorage.setItem("news", JSON.stringify(newsList));

        alert("Новина додана успішно!");
        this.reset();
        loadNews();
      });
  }

  function loadBooks() {
    const booksContainer = document.getElementById("books-container");
    const books = JSON.parse(localStorage.getItem("books")) || [];
    booksContainer.innerHTML = books.length
      ? books
          .map(
            (book, index) => `
      <div class="book">
        <img src="${book.cover}" alt="${book.title} cover" width="100">
        <div>
          <h3>${book.title}</h3>
          <p>Автор(и): ${book.author}</p>
          <p>Рік публікації: ${book.year}</p>
          <p>Видавництво: ${book.publisher}</p>
          <p>Жанр: ${book.genre}</p>
          <p>Категорія: ${book.category}</p>
          <p>Коротка анотація/опис: ${book.description}</p>
          <p>Мова: ${book.language}</p>
          <button class="delete-button" data-index="${index}">Видалити</button>
        </div>
      </div>
    `
          )
          .join("")
      : "<p>Немає книг</p>";

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.dataset.index;
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        loadBooks();
      });
    });
  }

  function loadNews() {
    const newsContainer = document.getElementById("news-container");
    const newsList = JSON.parse(localStorage.getItem("news")) || [];
    newsContainer.innerHTML = newsList.length
      ? newsList
          .map(
            (news) => `
      <div class="news-item">
        <h3>${news.title}</h3>
        <p>${news.content}</p>
        <p><small>${news.date}</small></p>
      </div>
    `
          )
          .join("")
      : "<p>Немає новин</p>";
  }
});
