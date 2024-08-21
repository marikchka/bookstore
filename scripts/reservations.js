document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const reservationsContainer = document.getElementById(
    "reservations-container"
  );
  const logoutLink = document.getElementById("logout-link");

  if (!user) {
    alert("Ви повинні увійти в систему, щоб переглядати резерви.");
    window.location.href = "login.html";
  } else {
    loadReservations();
    logoutLink.addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
  }

  function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const userReservations = reservations.filter(
      (reservation) => reservation.username === user.username
    );

    reservationsContainer.innerHTML = userReservations.length
      ? userReservations
          .map(
            (reservation, index) => `
                    <div class="reservation">
                        <p>Назва книги: ${reservation.bookTitle}</p>
                        <p>Дата початку: ${reservation.startDate}</p>
                        <p>Дата закінчення: ${reservation.endDate}</p>
                        <button class="cancel-button" data-index="${index}">Скасувати резервування</button>
                    </div>
                `
          )
          .join("")
      : "<p>Ви ще не резервували книги</p>";

    document.querySelectorAll(".cancel-button").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.dataset.index;
        userReservations.splice(index, 1);

        // Оновлення основного масиву резервувань
        const updatedReservations = reservations.filter(
          (reservation) =>
            reservation.username !== user.username ||
            reservation !== reservations[index]
        );

        localStorage.setItem(
          "reservations",
          JSON.stringify(updatedReservations)
        );
        loadReservations();
      });
    });
  }
});
