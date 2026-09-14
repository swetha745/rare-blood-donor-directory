# 🩸 RareBlood – Rare Blood Donor Alert Directory

## 📌 Project Description

**RareBlood** is a web-based blood donor directory designed to help people find available blood donors based on blood group and location.

The system provides a simple platform for managing donor information and blood requests. It uses a React frontend and Django REST Framework backend with SQLite database support.

## 🎯 Objectives

* To maintain a digital directory of blood donors.
* To help users find suitable blood donors quickly.
* To manage donor availability.
* To manage blood requests.
* To provide CRUD operations for donor records.
* To organize blood donor information based on blood group and location.

## ✨ Features

### Donor Management

* Add a new donor.
* View available donors.
* Update donor information.
* Delete donor records.
* Store donor blood group and location.
* Track donor availability.

### Blood Request Management

* Create blood requests.
* Store required blood group.
* Store hospital and location details.
* Store contact information.
* Specify required blood units.
* Mark requests as urgent.

### Technical Features

* REST API based backend.
* CRUD operations.
* SQLite database.
* React-based frontend.
* Django REST Framework backend.

## 🛠️ Technologies Used

### Frontend

* React
* JavaScript
* HTML
* CSS
* Vite

### Backend

* Python
* Django
* Django REST Framework

### Database

* SQLite

### Development Tools

* Visual Studio Code
* Git
* GitHub

## 🏗️ Project Structure

```text
rare-blood-donor-directory/
│
├── backend/
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── donors/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── admin.py
│   │   └── tests.py
│   │
│   └── manage.py
│
├── public/
├── src/
│   ├── assets/
│   ├── main.js
│   ├── style.css
│   └── counter.js
│
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 🔧 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/swetha745/rare-blood-donor-directory.git
cd rare-blood-donor-directory
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

The frontend will be available at the local address shown by Vite.

### 4. Open another terminal for the backend

Go to the backend folder:

```bash
cd backend
```

### 5. Run database migrations

```bash
python manage.py migrate
```

### 6. Start Django server

```bash
python manage.py runserver
```

The Django backend runs at:

```text
http://127.0.0.1:8000/
```

## 🔗 API Endpoints

### Donors

| Method | Endpoint            | Purpose               |
| ------ | ------------------- | --------------------- |
| GET    | `/api/donors/`      | View all donors       |
| POST   | `/api/donors/`      | Add a donor           |
| GET    | `/api/donors/<id>/` | View a specific donor |
| PUT    | `/api/donors/<id>/` | Update a donor        |
| DELETE | `/api/donors/<id>/` | Delete a donor        |

### Blood Requests

| Method | Endpoint                    | Purpose                 |
| ------ | --------------------------- | ----------------------- |
| GET    | `/api/blood-requests/`      | View blood requests     |
| POST   | `/api/blood-requests/`      | Create a blood request  |
| GET    | `/api/blood-requests/<id>/` | View a specific request |
| PUT    | `/api/blood-requests/<id>/` | Update a request        |
| DELETE | `/api/blood-requests/<id>/` | Delete a request        |

## 📸 Screenshots

Screenshots of the application can be added here to demonstrate:

* Home page
* Donor registration
* Donor directory
* Blood request section
* Add/Edit/Delete functionality
* Backend API

## 🚀 Future Enhancements

* User authentication and authorization.
* OTP or email verification.
* Donor notification system.
* Emergency blood request alerts.
* Search and filtering by blood group and location.
* Google Maps integration.
* Donor availability notifications.
* Hospital verification.
* Mobile application.
* Deployment to a cloud platform.

## 👩‍💻 Author

**Swetha**

GitHub: **swetha745**

## 📄 License

This project is developed for educational and project purposes.
