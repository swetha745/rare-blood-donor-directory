import './style.css'

const API_URL = 'http://127.0.0.1:8000/api/donors/'

const app = document.getElementById('app')

app.innerHTML = `
  <header>
    <h2>🩸 RareBlood</h2>

    <nav>
      <a href="#home">Home</a>
      <a href="#donor-directory">Donor Directory</a>
      <a href="#find">Find a Donor</a>
      <a href="#requests">Blood Requests</a>
      <a href="#register">Register Donor</a>
    </nav>
  </header>

  <main>

    <section class="hero" id="home">
      <p>EVERY DONATION CAN SAVE A LIFE</p>

      <h1>
        Rare Blood Donor<br>
        Alert Directory
      </h1>

      <p>
        Find rare blood donors quickly and help save lives
        when every second matters.
      </p>

      <button onclick="location.href='#find'">
        Find a Donor
      </button>

      <button onclick="location.href='#register'">
        Register as Donor
      </button>
    </section>

    <section class="cards">

      <div>
        <h2>🩸 Find Donors</h2>
        <p>Search for available rare blood group donors.</p>
      </div>

      <div>
        <h2>🚨 Blood Requests</h2>
        <p>View urgent blood requirements.</p>
      </div>

      <div>
        <h2>❤️ Save Lives</h2>
        <p>Connect donors with people who need blood.</p>
      </div>

    </section>

    <section class="donor-directory" id="donor-directory">

      <h2>🩸 Donor Directory</h2>
      <p>Available blood donors</p>

      <div class="donor-list" id="donorList">
        <p>Loading donors...</p>
      </div>

    </section>

    <section class="find-donor" id="find">

      <h2>🔎 Find a Donor</h2>

      <p>
        Search for donors by blood group and location.
      </p>

      <div class="search-box">

        <select id="searchBloodGroup">
          <option value="">Select Blood Group</option>
          <option value="O-">O-</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="AB+">AB+</option>
        </select>

        <input
          id="searchLocation"
          type="text"
          placeholder="Enter location"
        >

        <button id="searchDonor">
          Search Donor
        </button>

      </div>

      <div id="searchResult"></div>

    </section>

    <section class="requests" id="requests">

      <h2>🚨 Blood Requests</h2>

      <p>
        View urgent blood requirements.
      </p>

      <div class="request-card">

        <h3>Urgent Blood Requirement</h3>

        <p>
          <strong>Blood Group:</strong> O-
        </p>

        <p>
          <strong>Location:</strong> Karur
        </p>

        <button>
          View Request
        </button>

      </div>

    </section>

    <section class="register" id="register">

      <h2>📝 Register as a Donor</h2>

      <p>
        Become a donor and help someone in need.
      </p>

      <form id="donorForm">

        <label>Full Name</label>

        <input
          id="donorName"
          type="text"
          placeholder="Enter your name"
          required
        >

        <label>Blood Group</label>

        <select id="donorBloodGroup" required>
          <option value="">Select blood group</option>
          <option value="O-">O-</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="AB+">AB+</option>
        </select>

        <label>Location</label>

        <input
          id="donorLocation"
          type="text"
          placeholder="Enter your city"
          required
        >

        <label>Phone Number</label>

        <input
          id="donorPhone"
          type="tel"
          placeholder="Enter your phone number"
          required
        >

        <label>Availability</label>

        <select id="donorAvailability">
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>

        <button type="submit">
          Register Donor
        </button>

        <p id="formMessage"></p>

      </form>

    </section>

  </main>
`

let donors = []
let editingId = null


// =========================
// LOAD DONORS
// =========================

async function loadDonors() {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error('Failed to load donors')
    }

    donors = await response.json()

    displayDonors()

  } catch (error) {
    console.error(error)

    document.querySelector('#donorList').innerHTML =
      '<p>❌ Unable to connect to Django server.</p>'
  }
}


// =========================
// REGISTER / UPDATE DONOR
// =========================

const donorForm = document.querySelector('#donorForm')

donorForm.addEventListener('submit', async function (event) {
  event.preventDefault()

  const name = document.querySelector('#donorName').value.trim()
  const bloodGroup = document.querySelector('#donorBloodGroup').value
  const location = document.querySelector('#donorLocation').value.trim()
  const phone = document.querySelector('#donorPhone').value.trim()
  const availability = document.querySelector('#donorAvailability').value

  const donorData = {
    name: name,
    blood_group: bloodGroup,
    location: location,
    phone: phone,
    available: availability === 'Available'
  }

  try {
    let response

    if (editingId !== null) {
      response = await fetch(
        API_URL + editingId + '/',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(donorData)
        }
      )
    } else {
      response = await fetch(
        API_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(donorData)
        }
      )
    }

    if (!response.ok) {
      const errorData = await response.json()
      console.error(errorData)
      throw new Error('Unable to save donor')
    }

    document.querySelector('#formMessage').textContent =
      editingId !== null
        ? '✅ Donor updated successfully!'
        : '✅ Donor registered successfully!'

    editingId = null

    donorForm.reset()

    await loadDonors()

  } catch (error) {
    console.error(error)

    document.querySelector('#formMessage').textContent =
      '❌ Could not save donor. Please check the Django server.'
  }
})


// =========================
// DISPLAY DONORS
// =========================

function displayDonors() {
  const donorList = document.querySelector('#donorList')

  if (donors.length === 0) {
    donorList.innerHTML =
      '<p>No registered donors yet.</p>'

    return
  }

  donorList.innerHTML = donors.map(function (donor) {

    const status = donor.available
      ? 'Available'
      : 'Not Available'

    const statusClass = donor.available
      ? 'available'
      : 'unavailable'

    return `
      <div class="donor-card">

        <h3>${donor.name}</h3>

        <p>
          <strong>Blood Group:</strong>
          ${donor.blood_group}
        </p>

        <p>
          <strong>Location:</strong>
          ${donor.location}
        </p>

        <p>
          <strong>Phone:</strong>
          ${donor.phone}
        </p>

        <p class="${statusClass}">
          ● ${status}
        </p>

        <button onclick="editDonor(${donor.id})">
          ✏️ Edit
        </button>

        <button onclick="deleteDonor(${donor.id})">
          🗑️ Delete
        </button>

      </div>
    `
  }).join('')
}


// =========================
// DELETE DONOR
// =========================

async function deleteDonor(id) {

  if (!confirm('Are you sure you want to delete this donor?')) {
    return
  }

  try {
    const response = await fetch(
      API_URL + id + '/',
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      throw new Error('Delete failed')
    }

    await loadDonors()

  } catch (error) {
    console.error(error)

    alert('❌ Could not delete donor.')
  }
}


// =========================
// EDIT DONOR
// =========================

function editDonor(id) {

  const donor = donors.find(function (item) {
    return item.id === id
  })

  if (!donor) {
    return
  }

  document.querySelector('#donorName').value =
    donor.name

  document.querySelector('#donorBloodGroup').value =
    donor.blood_group

  document.querySelector('#donorLocation').value =
    donor.location

  document.querySelector('#donorPhone').value =
    donor.phone

  document.querySelector('#donorAvailability').value =
    donor.available
      ? 'Available'
      : 'Not Available'

  editingId = id

  document.querySelector('#formMessage').textContent =
    '✏️ Editing donor details...'

  location.href = '#register'
}


// =========================
// FIND DONOR
// =========================

document.querySelector('#searchDonor').addEventListener(
  'click',
  function () {

    const bloodGroup =
      document.querySelector('#searchBloodGroup').value

    const location =
      document.querySelector('#searchLocation').value
        .trim()
        .toLowerCase()

    const result =
      document.querySelector('#searchResult')

    if (!bloodGroup && !location) {

      result.innerHTML =
        '<p>Please select a blood group or enter a location.</p>'

      return
    }

    const matches =
      donors.filter(function (donor) {

        const bloodMatch =
          !bloodGroup ||
          donor.blood_group === bloodGroup

        const locationMatch =
          !location ||
          donor.location.toLowerCase().includes(location)

        return bloodMatch && locationMatch
      })

    if (matches.length === 0) {

      result.innerHTML =
        '<p>❌ No registered donor found.</p>'

      return
    }

    result.innerHTML =
      matches.map(function (donor) {

        return `
          <div class="card">

            <h3>🩸 ${donor.name}</h3>

            <p>
              <strong>Blood Group:</strong>
              ${donor.blood_group}
            </p>

            <p>
              <strong>Location:</strong>
              ${donor.location}
            </p>

            <p>
              <strong>Phone:</strong>
              ${donor.phone}
            </p>

            <p>
              <strong>Status:</strong>
              ${donor.available
                ? 'Available'
                : 'Not Available'}
            </p>

          </div>
        `
      }).join('')
  }
)


// =========================
// MAKE BUTTONS WORK
// =========================

window.deleteDonor = deleteDonor
window.editDonor = editDonor


// =========================
// START APPLICATION
// =========================

loadDonors()