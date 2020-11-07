bodySelector = document.querySelector("body");
formDivSelector = document.getElementById("formDiv")
const newUl = document.createElement("ul");
formDivSelector.appendChild(newUl);
let compteurEleve = 0;
const newHPresent = document.createElement("h3");
buttonValidateSelector = document.getElementById("validateButton")
presentNombreSelector = document.getElementById("presentNombre")

//CREATE FUNCTION//

function createElement(firstName, lastName, age) {
    const newLi = document.createElement("li");
    const newP = document.createElement("p");
    const newButtonDiv = document.createElement("div");
    newButtonDiv.setAttribute("class", "grix xs4")
    const newButtonDelete = document.createElement("button");
    newButtonDelete.innerHTML = "delete";
    newButtonDelete.setAttribute("class", "btn red dark-1 rounded-1 small primary")
    const newCheckBox = document.createElement("input");
    newCheckBox.setAttribute("type", "checkbox");
    const modifyButton = document.createElement("button")
    modifyButton.innerHTML = "Modifier";
    modifyButton.setAttribute("id", "modifyButton");
    modifyButton.setAttribute("class", "btn shadow-1 rounded-1 small primary");


    newUl.appendChild(newLi);
    newUl.appendChild(newP);
    newUl.appendChild(newButtonDiv)
    newButtonDiv.appendChild(modifyButton);
    newButtonDiv.appendChild(newButtonDelete);
    newButtonDiv.appendChild(newCheckBox);

    //AFFICHAGE AGE//

    newLi.innerHTML = firstName + " " + lastName;
    newP.innerHTML = age + " ans";
    newP.classList.add("age");
    newLi.addEventListener("click", () => {
        newP.classList.toggle("age");
    });

    //MODIFIER BUTTON//

    modifyButton.addEventListener("click", () => {
        firstName = prompt("Nouveau prénom :", firstName);
        lastName = prompt("Nouveau nom :", lastName);
        age = prompt("Nouvelle age :", age);
        newLi.innerHTML = firstName + " " + lastName;
        newP.innerHTML = age;
    });

    //DELETE//

    newButtonDelete.addEventListener("click", () => {
        newButtonDelete.remove();
        newLi.remove();
        newP.innerHTML = "";
        newCheckBox.remove();
        modifyButton.remove();
        if (isPresent === true) {
            compteurEleve--;
        }
    });

//CHECKBOX//

    let isPresent = Boolean();
    newCheckBox.addEventListener("change", () => {
        if (newCheckBox.checked) {
            newLi.style.color = "green";
            compteurEleve++;
            isPresent = true;
        } else {
            newLi.style.color = "black";
            compteurEleve--;
            isPresent = false;
        }
    });

//SEARCH BARRE//

    let searchBarreSelector = document.getElementById("searchBarre");
    searchBarreSelector.addEventListener("keyup", () => {
        let searchBarreValue = searchBarreSelector.value;
        let filterName = firstName.toUpperCase() + " " + lastName.toUpperCase();

        let firstNameSearchBarreArray = [];

        for (let k = 0; k < searchBarreValue.length; k++) {
            firstNameSearchBarreArray.push(filterName[k]);
        }
        firstNameSearchBarreArray = firstNameSearchBarreArray.join("");

        if (searchBarreValue.toUpperCase() !== firstNameSearchBarreArray) {
            newLi.style.display = "none";
            newButtonDelete.style.display = "none";
            modifyButton.style.display = "none";
            newCheckBox.style.display = "none";
        } else {
            newLi.style.display = "initial";
            newButtonDelete.style.display = "initial";
            modifyButton.style.display = "initial";
            newCheckBox.style.display = "initial";
        }
    });
}
//AFFICHAGE TABLEAU//
let index;
for (const character of characters) {
    index = characters.indexOf(character);
    createElement(character.firstName, character.lastName, character.age);
}

//Event submit//

const formSelector = document.querySelector("form");

let i = index + 1;
formSelector.addEventListener("submit", event => {
    event.preventDefault();
    const firstNameValue = document.getElementById("firstName").value;
    const lastNameValue = document.getElementById("lastName").value;
    const ageValue = document.getElementById("age").value;
    characters.push({firstName: firstNameValue, lastName: lastNameValue, age: ageValue})

    for (i; i < characters.length; i++) {
        createElement(characters[i].firstName, characters[i].lastName, characters[i].age, index)
    }
})

//Signature //
buttonValidateSelector.addEventListener("click", () => {
    presentNombreSelector.appendChild(newHPresent);
    if (compteurEleve > 1) {
        newHPresent.innerHTML = compteurEleve + " élèves présents";
    } else if (compteurEleve === 0) {
        newHPresent.innerHTML = "Aucun élève présent";
    } else if (compteurEleve === 1) {
        newHPresent.innerHTML = "1 élève présent";
    }

});