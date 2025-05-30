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

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=cs_timetable
    JWT_SECRET=your_jwt_secret
    PORT=3006
    JWT_SECRET_KEY = your_code
    BASE_URL=http://localhost:4259

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
