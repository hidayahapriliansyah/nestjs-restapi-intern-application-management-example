# Employee Spec

## Create Employee

Endpoint: POST /api/employees

Request body:
```json
{
  "name": "Employee Name",
  "password": "secretpassword",
  "username": "employee_username",
  "role": "EMPLOYEE"
}
```
Enum Role: EMPLOYEE, RECRUITER

Responses:
  - Success

    HTTP Status Code: 200

    ```json
    {
      "success": true,
      "message": "Success to create employee.",
      "data": {
        "employeeId":"uuid",
        "name": "Employee",
        "role": "EMPLOYEE"
      }
    }
    ```
  - Failed
    - Auth Error
    - Validation Error
    - Internal Server Error
