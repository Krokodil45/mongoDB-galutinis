async function main() {
  fetch("http://localhost:3000/memberships")
    .then((response) => response.json())
    .then((memberships) => {
      console.log(memberships);
      renderMemberships(memberships);
    });
}
main();

function renderMemberships(memberships) {
  const allMemberships = document.querySelector(".membership-list");
  memberships.forEach((membership) => {
    const membershipElement = document.createElement("div");
    membershipElement.classList = "membership";

    const price = document.createElement("div");
    price.textContent = "$ " + membership.price + " " + membership.name;
    price.classList = "price";
    membershipElement.appendChild(price);

    const description = document.createElement("div");
    description.textContent = membership.description;
    description.classList = "description";
    membershipElement.appendChild(description);

    const action = document.createElement("div");
    action.classList = "action";
    membershipElement.appendChild(action);
    const deleteButton = createDeleteButton(membership);
    action.appendChild(deleteButton);

    allMemberships.appendChild(membershipElement);
  });
}
function createDeleteButton(membership) {
  const deleteButton = document.createElement("i");
  deleteButton.classList = "delete-button fas fa-trash-alt";
  deleteButton.addEventListener("click", () => {
    fetch("http://localhost:3000/memberships/" + membership._id, {
      method: "DELETE",
    }).then(() => {
      document.location.reload();
    });
  });
  return deleteButton;
}
