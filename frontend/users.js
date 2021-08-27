async function loadUsers(sortOrder) {
  const response = await fetch(`http://localhost:3000/users/${sortOrder}`);
  const users = await response.json();
  console.log("users", users);
  renderUsers(users);
}

function renderUsers(userList) {
  const userListElement = document.querySelector(".user-list");
  userListElement.textContent = "";
  userList.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.classList = "user";
    userListElement.appendChild(userElement);

    const userNameList = document.createElement("div");
    userNameList.textContent = user.name + " " + user.surname;
    userNameList.classList = "user-name";
    userElement.appendChild(userNameList);

    userElement.appendChild(renderEmailBlock(user));
    userElement.appendChild(renderMembershipBlock(user));
  });
}

function renderMembershipBlock(user) {
  const membership = document.createElement("div");
  membership.classList = "user-membership";
  membership.appendChild(span("Membership: "));
  membership.appendChild(ancor("membership.html", user.service.name));

  return membership;
}

function renderEmailBlock(user) {
  const emailBlock = document.createElement("div");
  emailBlock.classList = "email";
  emailBlock.appendChild(span("Email Address: "));
  emailBlock.appendChild(mailTo(user.email));
  return emailBlock;
}

function mailTo(mail) {
  return ancor(`mailto:${mail}`, mail);
}

function ancor(src, text) {
  const result = document.createElement("a");
  result.href = src;
  result.textContent = text;
  return result;
}

function span(textContent) {
  const result = document.createElement("span");
  result.textContent = textContent;
  return result;
}

document.querySelector(".order-by").addEventListener("click", (e) => {
  orderBy = orderBy === "asc" ? "desc" : "asc";
  document.querySelector(".current-direction").textContent =
    orderBy.toUpperCase();
  loadUsers(orderBy);
});

let orderBy = "asc";

loadUsers(orderBy);
