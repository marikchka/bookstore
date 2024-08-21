document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    alert("Помилка авторизації");
  }
});
