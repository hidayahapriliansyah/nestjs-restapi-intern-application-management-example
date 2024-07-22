# Intern Application Spec

## Browse Intern Applications

Endpoint: GET /api/applications/intern

Cookie:
  - itscookiename=jwttoken

Query params:
  - name: string, applican name, optional
  - page: number, default 1, optional
  - limit: number, default 10, optional

Responses:
  - Success
    HTTP Status Code: 200
    ```json
    {
      "success": true,
      "message": "Success to get intern applications.",
      "data": {
        "applications": [
          {
            "id": "a491263c-a3b2-4be6-a9d2-8081addaa0c6",
            "created_at": "2024-07-21 06:40:38.617Z",
            "updated_at": "2024-07-21 06:40:38.617Z",
            "name": "Adi Muhamad Firmansyah",
            "choosen_field": "Backend Developer",
            "date_of_birth": "25-04-2001",
            "university": "STMIK DCI",
            "intern_duration": "3 month(s)",
            "status": "NEED_CONFIRMATION"
          }
        ],
        "paging": {
          "current_page": 2,
          "total_page": 2,
          "total_data": 11,
          "limit_data": 10
        }
      }
    }
    ```
  - Failed
    - Auth Error
    - Validation Error
    - Internal Server Error

## See Detail of Intern Application

Endpoint: GET /api/applications/intern/:applicationId

Cookie:
  - itscookiename=jwttoken

Path parameters:
  - applicationId: string, intern application id

Response
  - Success
    HTTP Status Code: 200
    ```json
    {
      "success": true,
      "message": "Success to get intern application detail",
      "data" {
        "id": "a491263c-a3b2-4be6-a9d2-8081addaa0c6",
        "created_at": "2024-07-21 06:40:38.617Z",
        "updated_at": "2024-07-21 06:40:38.617Z",
        "name": "Adi Muhamad Firmansyah",
        "choosen_field": "Backend Developer",
        "date_of_birth": "25-04-2001",
        "university": "STMIK DCI",
        "intern_duration": "3 month(s)",
        "status": "NEED_CONFIRMATION"
      }
    }
    ```
  - Failed
    - Auth Error
    - Not Found Error
    - Internal Server Error

## Accept Intern Application

Endpoint: PATCH /api/applications/intern/:applicationId

Cookie:
  - itscookiename=jwttoken

Path parameters:
  - applicationId: string, intern application id

Request body:
```json
  {
    "status": "ACCEPTED" // valid status request: ACCEPTED, REJECTED
  }
```

Responses:
- Success
  HTTP Status Code: 200
  ```json
  {
    "success": true,
    "message": "Success to accept intern application",
    "data": {
      "applicationId": "a491263c-a3b2-4be6-a9d2-8081addaa0c6",
      "name": "Adi Muhamad Firmansyah",
      "status": "ACCEPTED",
    }
  }
  ```
- Failed
  - Auth Error
  - Not Found Error
  - Validation Error
  - Internal Server Error

## Reject Intern Application

Endpoint: PATCH /api/applications/intern/:applicationId

Cookie:
  - itscookiename=jwttoken

Path parameters:
  - applicationId: string, intern application id

Request body:
```json
  {
    "status": "REJECTED" // valid status request: ACCEPTED, REJECTED
  }
```

Responses:
- Success
  HTTP Status Code: 200
  ```json
  {
    "success": true,
    "message": "Success to reject intern application",
    "data": {
      "applicationId": "a491263c-a3b2-4be6-a9d2-8081addaa0c6",
      "name": "Adi Muhamad Firmansyah",
      "status": "REJECTED",
    }
  }
  ```
- Failed
  - Auth Error
  - Not Found Error
  - Validation Error
  - Internal Server Error

## Delete Intern Application

Endpoint: DELETE /api/applications/intern/::applicationId

Cookie:
  - itscookiename=jwttoken

Path parameters:
  - applicationId: string, intern application id

Responses:
- Success
  HTTP Status Code: 200
  ```json
  {
    "success": true,
    "message": "Success to delete intern application",
    "data": {
      "applicationId": "a491263c-a3b2-4be6-a9d2-8081addaa0c6"
    }
  }
  ```
- Failed
  - Auth Error
  - Not Found Error
  - Internal Server Error
