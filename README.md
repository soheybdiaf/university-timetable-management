# Smart University Timetable Management Web App

## Project Overview

Managing university timetables has become increasingly complex with the growing number of students, programs, and academic resources. This project presents a smart, web-based solution designed to **automate** and **optimize** university scheduling processes, eliminating conflicts and ensuring fair resource distribution (professors, rooms, groups).

This application provides a seamless and intelligent interface for generating and managing schedules for students, instructors, and administrative supervisors.

---

## Key Features

**Fast & Responsive Interface**
  Built with lightweight, modern front-end technologies to ensure smooth performance even on low-end devices.

**Secure Authentication with JWT**
  Token-based session management with auto-verification for each request based on user roles.

**Smart Multi-Resource Booking System**
  Automatically checks availability of all required resources (professor, room, group) before booking. Prevents conflicts and partial reservations.

**Role-Based Access Control (RBAC)**
  Access to features and endpoints is granted based on user roles (Student, Professor, Admin).

**Customized Dashboards**

* **Students** can view their group's timetable and personal details.
* **Professors** can view their schedule, courses, assigned groups, and submit preferences.
* **Admins** have full control over timetables, resources, reservations, user accounts, and permissions.

---

## Tech Stack

### Frontend:

* **HTML, CSS, JavaScript** For a clean, modern, and responsive UI.

### Backend:

* **Node.js + Express.js** Powerful and scalable server-side architecture.

* **MySQL2 (Library)** Efficient query execution and connection management.

### Database:

* **MySQL** Secure and flexible relational data storage.

---

## Smart Scheduling Logic

*  **All-in-One Booking** Each reservation includes professor, room, and group—ensuring all dependencies are accounted for.

*  **Conflict Prevention** the system automatically verifies time availability for each resource before confirming any booking.

*  **Dynamic Filtering** Already-booked resources are dynamically excluded from selection lists.

*  **No Partial Reservations**  course cannot be scheduled without selecting all associated resources.

---

## Project Goals

* Automate the creation of university timetables.
* Reduce administrative workload and minimize human error.
* Ensure fair and conflict-free resource allocation.
* Offer tailored user experiences based on access roles.
* Enhance usability for all stakeholders: students, professors, and administrators.

---

## How to Run This Project

1. **Download the project**

   - Click "Code" → "Download ZIP"
   - Extract the folder
   - Open the folder in [Visual Studio Code]

2. **Install dependencies**

   Open the terminal in VS Code and run:

   - npm install

2. **Set up environment variables**

   Create a file named .env in the root folder and add:

    - DB_HOST=localhost
    - DB_USER=root
    - DB_PASSWORD=
    - DB_NAME=cs_timetable
    - JWT_SECRET=your_jwt_secret
    - PORT=3006
    - JWT_SECRET_KEY = your_code
    - BASE_URL=http://localhost:4259

3. **Import the database using phpMyAdmin**

    Open http://localhost/phpmyadmin

    Create a new database (cs_timetable)

    Go to the "Import"

    Choose the SQL file from the project folder (db_mysql/cs_timetable.sql)

    Click Go

4. **Start the server**

   In the terminal cmd, run: npm start

5. **Open in browser and test**

http://localhost:4259/Access_Portal.html

## Admin Login

To access the admin dashboard or protected admin routes, use the following credentials:

- Email: `admin@gmail.com`
- **Password:** `07089002025`.
