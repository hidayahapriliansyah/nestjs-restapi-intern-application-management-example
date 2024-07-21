# Auth Spec

## Login Recruiter

Endpoint: POST /api/auth

Request body:
```json
{
  "username": "hidayahapriliansyah",
  "password": "secretpassword"
}
```

Response:
- Success

  HTTP Status Code: 200
  Response body (Success):
  ```json
  {
    "success": true,
    "message": "Login successfully.",
    "data": {
      "userId": "6920560e-e1d0-41b3-9e40-f5de89e635c0"
    }
  }
  ```
- Failed
  HTTP Status Code: 401
  Response body (Success):
  ```json
  {
    "success": false,
    "message": "Unauthenticated user",
    "errors": "Wrong username or password"
  }
  ```
