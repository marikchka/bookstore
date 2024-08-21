document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const adminLink = document.getElementById("admin-link");
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");
  const myReservationsLink = document.getElementById("my-reservations-link");

  if (user) {
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    logoutLink.style.display = "block";
    myReservationsLink.style.display = "block";

    if (user.role === "admin") {
      adminLink.style.display = "block";
    }

    loadGenresAndCategories();
    loadAllBooks();

    document
      .getElementById("search-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const searchQuery = document
          .getElementById("search-input")
          .value.toLowerCase();

        const books = JSON.parse(localStorage.getItem("books")) || [];
        const results = books.filter((book) =>
          book.title.toLowerCase().includes(searchQuery)
        );
        displayResults(results);
      });

    logoutLink.addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });

    myReservationsLink.addEventListener("click", function () {
      displayReservations();
    });
  } else {
    loginLink.style.display = "block";
    registerLink.style.display = "block";
    logoutLink.style.display = "none";
    myReservationsLink.style.display = "none";
    adminLink.style.display = "none";
  }

  function loadAllBooks() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    displayAllBooks(books);
  }

  function loadGenresAndCategories() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const genres = [...new Set(books.map((book) => book.genre))];
    const categories = [...new Set(books.map((book) => book.category))];

    const genresDiv = document.getElementById("genres");
    const categoriesDiv = document.getElementById("categories");

    genresDiv.innerHTML = genres
      .map(
        (genre) =>
          `<button class="filter-button" data-filter="genre" data-value="${genre}">${genre}</button>`
      )
      .join("");
    categoriesDiv.innerHTML = categories
      .map(
        (category) =>
          `<button class="filter-button" data-filter="category" data-value="${category}">${category}</button>`
      )
      .join("");

    document.querySelectorAll(".filter-button").forEach((button) => {
      button.addEventListener("click", function () {
        const filterType = this.getAttribute("data-filter");
        const filterValue = this.getAttribute("data-value");
        filterBooks(filterType, filterValue);
      });
    });
  }

  function filterBooks(filterType, filterValue) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const filteredBooks = books.filter(
      (book) => book[filterType] === filterValue
    );
    displayResults(filteredBooks);
  }

  function displayResults(books) {
    const resultsDiv = document.getElementById("search-results");
    resultsDiv.innerHTML = "";

    if (books.length === 0) {
      resultsDiv.innerHTML = "<p>Нічого не знайдено</p>";
    } else {
      books.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
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
            <button class="reserve-button">Зарезервувати</button>
            <div class="reservation-dates" style="display: none;">
              <label for="start-date">Дата початку:</label>
              <input type="date" class="start-date" required>
              <label for="end-date">Дата закінчення:</label>
              <input type="date" class="end-date" required>
              <button class="confirm-reservation-button">Підтвердити резервування</button>
            </div>
          </div>
        `;
        bookDiv
          .querySelector(".reserve-button")
          .addEventListener("click", function () {
            const reservationDates =
              bookDiv.querySelector(".reservation-dates");
            reservationDates.style.display =
              reservationDates.style.display === "none" ? "block" : "none";
          });

        bookDiv
          .querySelector(".confirm-reservation-button")
          .addEventListener("click", function () {
            const startDate = bookDiv.querySelector(".start-date").value;
            const endDate = bookDiv.querySelector(".end-date").value;
            reserveBook(book, startDate, endDate);
          });

        resultsDiv.appendChild(bookDiv);
      });
    }
  }

  function displayAllBooks(books) {
    const allBooksDiv = document.getElementById("all-books");
    allBooksDiv.innerHTML = "";

    if (books.length === 0) {
      allBooksDiv.innerHTML = "<p>Книги не знайдено</p>";
    } else {
      books.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
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
            <button class="reserve-button">Зарезервувати</button>
            <div class="reservation-dates" style="display: none;">
              <label for="start-date">Дата початку:</label>
              <input type="date" class="start-date" required>
              <label for="end-date">Дата закінчення:</label>
              <input type="date" class="end-date" required>
              <button class="confirm-reservation-button">Підтвердити резервування</button>
            </div>
          </div>
        `;
        bookDiv
          .querySelector(".reserve-button")
          .addEventListener("click", function () {
            const reservationDates =
              bookDiv.querySelector(".reservation-dates");
            reservationDates.style.display =
              reservationDates.style.display === "none" ? "block" : "none";
          });

        bookDiv
          .querySelector(".confirm-reservation-button")
          .addEventListener("click", function () {
            const startDate = bookDiv.querySelector(".start-date").value;
            const endDate = bookDiv.querySelector(".end-date").value;
            reserveBook(book, startDate, endDate);
          });

        allBooksDiv.appendChild(bookDiv);
      });
    }
  }

  function reserveBook(book, startDate, endDate) {
    if (!user) {
      alert("Ви повинні увійти в систему, щоб резервувати книги.");
      return;
    }

    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push({
      username: user.username,
      bookTitle: book.title,
      startDate,
      endDate,
    });

    localStorage.setItem("reservations", JSON.stringify(reservations));
    alert(`Книга "${book.title}" зарезервована з ${startDate} по ${endDate}`);
  }

  function displayReservations() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const userReservations = reservations.filter(
      (reservation) => reservation.username === user.username
    );

    const reservationDiv = document.createElement("div");
    reservationDiv.innerHTML = "<h2>Мої резерви</h2>";

    if (userReservations.length === 0) {
      reservationDiv.innerHTML += "<p>Ви ще не резервували книги</p>";
    } else {
      userReservations.forEach((reservation, index) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("reservation");
        bookDiv.innerHTML = `
          <p>Назва книги: ${reservation.bookTitle}</p>
          <p>Дата початку: ${reservation.startDate}</p>
          <p>Дата закінчення: ${reservation.endDate}</p>
          <button class="cancel-button" data-index="${index}">Скасувати резервування</button>
        `;

        bookDiv
          .querySelector(".cancel-button")
          .addEventListener("click", function () {
            const index = this.dataset.index;
            userReservations.splice(index, 1);
            reservations.splice(index, 1);
            localStorage.setItem("reservations", JSON.stringify(reservations));
            displayReservations();
          });

        reservationDiv.appendChild(bookDiv);
      });
    }

    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = "";
    mainContent.appendChild(reservationDiv);
  }
});
