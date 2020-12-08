const userInfo = document.getElementById("user-info");
const token = document.cookie.split("=")[1];

if (token) {
  payload = JSON.parse(atob(token.split(".")[1]));

  fetch("http://localhost:5000/profile/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload }),
  })
    .then((res) => res.json())
    .then((data) => {
      userInfo.innerText = `User: ${data.email}`;
    });
}
