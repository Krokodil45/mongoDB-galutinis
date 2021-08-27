function fillServices() {
  fetch("http://localhost:3000/memberships")
    .then((response) => response.json())
    .then((memberships) => {
      console.log(memberships);
      const select = document.querySelector(
        'select[name="membership-options"]'
      );
      memberships.forEach((m) => {
        const opt = document.createElement("option");
        opt.value = m._id;
        opt.textContent = m.name;
        select.appendChild(opt);
      });
    });
}

fillServices();

document.getElementById("add-user").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const service_id = document.getElementById("service-id").value;

  const data = { name, surname, email, service_id };
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => (document.location = "users.html"));
});

document.getElementById("cancel-button").addEventListener("click", () => {
  document.location = "users.html";
});
