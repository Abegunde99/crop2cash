# Farmer Management System

This is a Farmer Management System back-end application built with Node.js and MySQL.

## Documentation
    ```
    https://documenter.getpostman.com/view/21616732/2s946k5VYF
    ```

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone `https://www.github.com/abegunde99/crop2cash.git`
    ```

2. Navigate to the project directory:
    ```bash
    cd crop2cash
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Create a MySQL database:

    - Make sure you have MySQL installed and running.
    - Use your preferred MySQL client to create a new database for the project.

5. Set up the database configuration:

    - In the project's root directory, create a `.env` file.
    - Copy the following content into the `.env` file:

    ```
    DB_HOST=your_database_host
    DB_USER=your_database_username
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    ```

     Replace `your_database_host`, `your_database_username`, `your_database_password`, and `your_database_name` with your actual MySQL credentials and database name.

6. Start the application:
    
    ```bash
    npm start
    ```
    

7. The application will be running on `http://localhost:5006`.

    ## Endpoints
    ### Create Database
    - URL: `GET /api/v1/farmers/createDatabase`
    - Description: Create the database.

    ### Create Table
    - URL: `GET /api/v1/farmers/createTable`
    - Description: Create the table.


    ### Insert Farmer

    - URL: `POST /api/v1/farmers`
    - Description: Create a new farmer object in the database.
    - Request Body: JSON object representing the farmer details.

    ### Retrieve Farmers

    - URL: `GET /farmers`
    - Description: Retrieve farmers based on filters.
    - Query Parameters:
        - `attributes`: Comma-separated list of attributes to include in the response.`attributes=value`
        - `filter`: Filter criteria in the format `filter:value`. Supported filters:

    ## Technologies Used

    - Node.js
    - Express.js
    - MySQL




