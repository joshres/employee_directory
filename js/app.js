let employees = [];
let index = "";
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalLeft = document.querySelector(".modal-lt");
const modalRight = document.querySelector(".modal-rt");
const searchUsers = document.getElementById('search-bar');

// fetch data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));

function displayEmployees(employeeData) {
    employees = employeeData;

    // store the employee HTML as it is created
    let employeeHTML = '';

    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" alt="employee picture" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `
    });

    gridContainer.innerHTML = employeeHTML;
};

///////// Display Modal /////////

function displayModal(i) {
    index = i;
    let {   name, 
            dob, 
            phone, 
            email, 
            location: {city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
            <img class="avatar" src="${picture.large}" />
            <div class="modal-text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                <hr />
                <p class="phone">${phone}</p>
                <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
                <p class="birthday">Birthday:
                    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
    `;

    overlay.classList.remove("hidden"); 
    modalContainer.innerHTML = modalHTML;
};

////////// Open Modal /////////////

gridContainer.addEventListener('click', e => {

    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {

        // select the card element based on its proximity to the actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

///////// Close Modal /////////

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

///////// Toggle Modal Left/Right /////////

let prevEmployee = () => {
    if (index != 0) {
        index = Number.parseInt(index, 10) -1;
        displayModal(index);
    } else {
        index = 11;
        displayModal(11);
    }
}

let nextEmployee = () => {
    if (index < 11) {
        index = Number.parseInt(index, 10) +1;
        displayModal(index);
    } else {
        index = 0;
        displayModal(0);
    }
}

modalLeft.addEventListener('click', e => {
    prevEmployee();
});

modalRight.addEventListener('click', e => {
    nextEmployee();
})

///////// Search For User /////////

searchUsers.addEventListener('keyup', e => {
    let currentValue = e.target.value.toLowerCase();
    let authors = document.querySelectorAll('h2.name');
    authors.forEach(author => {
        if (author.textContent.toLowerCase().includes(currentValue)) {
            author.parentNode.parentNode.style.display = 'flex';
        } else {
            author.parentNode.parentNode.style.display = 'none';
        }
    })
});
