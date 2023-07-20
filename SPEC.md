# Farmer Management System API Specification

## Introduction

This API serves as the back-end for the Farmer Management System, allowing clients to manage farmer entities with various attributes. The API provides endpoints for inserting new farmers and retrieving farmer data based on filters.

## Base URL

```
http://localhost:3000
```

Replace `localhost:3000` with the actual base URL where the API is hosted.

## Endpoints

### Insert Farmer

Insert a new farmer entity into the database.

- **URL:** `POST /farmers`
- **Description:** Create a new farmer object in the database.
- **Request Body:**

  The request body should be a JSON object representing the details of the farmer.

  Example Request Body:

  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "08123456789",
    "age": 35,
    "address": "123 Main St, City",
    "crops": "maize,banana"
  }

    ```

- **Response Body:**
    
    The response body will be a JSON object representing the newly created farmer.

    Example Response Body:
    
    ```json
      {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "phone_number": "08123456789",
        "age": 35,
        "address": "123 Main St, City",
        "crops": "maize,banana"
      }
    
    ```

### Retrieve Farmers

Retrieve farmers based on filters.

- **URL:** `GET /farmers`
- **Description:** Retrieve farmers based on filters.

- **Query Parameters:**

  - `attributes`: Comma-separated list of attributes to include in the response.

    - Example: `?attributes=id,first_name,last_name`

        The above example will return the id,first_name and last_name of all farmers.

  - `filter`: Filter the results by the specified attribute.

    - Example: `?filter=age:30`

         The above example will return farmers whose age is to 30.

    - Example: `?filter=age:20-30`

         The above example will return farmers whose age is between 20 and 30.

    The filter parameter can be used multiple times to filter by multiple attributes.

    - Example: `?filter=first_name:John,age:30-40`

        The above example will return farmers whose first name is John and age is between 30 and 40.

    - Example: `?filter=age:30-40,first_name:John,crops:maize`

        The above example will return farmers whose age is between 30 and 40 and first name is John and has a crop maize.


- `combination of attributes and filter`

    - Example: `?attributes=id,first_name,last_name&filter=age:30-40,first_name:John,crops:maize`

        The above example will return the id,first_name and last_name of farmers whose age is between 30 and 40 and first name is John and has a crop maize.

- **Response Body:**
    
    The response body will be a JSON object representing the farmers that match the specified filters.
    
    Example Response Body:
    
    ```json
    {
        "success": "true",
        "farmers":
            [
                {
                    "id": 1,
                    "first_name": "John",
                    "last_name": "Doe",
                    "phone_number": "08123456789",
                    "age": 35,
                    "address": "123 Main St, City",
                    "crops": "maize,banana"
                },
                {
                    "id": 2,
                    "first_name": "Jane",
                    "last_name": "Doe",
                    "phone_number": "08123456789",
                    "age": 25,
                    "address": "123 Main St, City",
                    "crops": "maize,banana"
                }
           ]
    }
    ```

example of a request to the API

```bash
curl -X POST \
  http://localhost:3000/farmers \
  -H 'Content-Type: application/json' \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "08123456789",
    "age": 35,
    "address": "123 Main St, City",
    "crops": "maize,banana"
}'
```

```bash
curl -X GET \
  'http://localhost:3000/farmers?attributes=id,first_name,last_name&filter=age:30-40,first_name:John,crops:maize' \
  -H 'Content-Type: application/json' \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "08123456789",
    "age": 35,
    "address": "123 Main St, City",
    "crops": "maize,banana"
}'
```

## Error Handling

The API returns the following error codes in JSON format.

- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

Example error response:

```json
{
  "success": "false",
  "error": "Invalid request body"
}
```

