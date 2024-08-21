document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.username === username)) {
      alert("Користувач з таким іменем вже існує");
    } else {
      users.push({ username, password, role });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Успішно зареєстровано!");
      window.location.href = "login.html";
    }
  });
