document.getElementById("add-membership").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  const data = { name, price, description };
  fetch("http://localhost:3000/memberships", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => (document.location = "membership.html"));
});

document.getElementById("cancel-btn").addEventListener("click", () => {
  document.location = "membership.html";
});
