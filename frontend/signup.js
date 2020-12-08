const submitBtn = document.getElementById("button");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const jwt = data.token;

      if (document.cookie === null) {
        const d = new Date();
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        document.cookie = `jwt=${jwt}; expires=${d}; secure=true;`;
      }
    })
    .catch((err) => console.log(err));
});
