const profileData = document.querySelector('#profileData') // div id, this is how to connect the result html

const urlParams = new URLSearchParams(window.location.search); // a way to pass information about a click through its URL

const loginUsername = urlParams.get('loginUsername');

const usersData = JSON.parse(localStorage.getItem(loginUsername)) || {};

// Check if usersData is an object
if (typeof usersData === 'object' && usersData !== null) {
  const inputData = [usersData]; // Assuming you want inputData to be an array

  const displayInfo = (items) => {
    profileData.innerHTML = items.map((item) => {
      var { username, email, firstName, lastName } = item;
      return `<p>Email: ${email}<br></p>
              <p>FirstName : ${firstName}<br></p>
              <p>LastName: ${lastName}<br></p>
              <p>Username: ${username}<br></p>`;
    }).join('');
  };

  displayInfo(inputData);
} else {
  console.error('Data in localStorage is not an object:', usersData);
}

