# API Error Body Response

API error body reponse structure:
- success: boolean (true)
- message: string
- errors: any

## Auth Error
HTTP Status Code: 401
```json
  {
    "success": false,
    "message": "Unauthenticated user.",
    "errors": "User is unknown"
  }

```
## Not Found Error Example
HTTP Status Code: 404
```json
  {
    "success": false,
    "message": "Application intern is not found.",
    "errors": "Application intern with id 4234-234-qwe234-234 is not found."
  }
```

## Validation Error
HTTP Status Code: 400
```json
  {
    "success": false,
    "message": "Validation error.",
    "errors": [
      {
        "error": "bla bla..."
      }
    ]
    // errors can be from zod or other library validation
  }
```

## Internal Server Error
HTTP Status Code: 500
HTTP Status Code: 400
```json
  {
    "success": false,
    "message": "Internal server error.",
    "errors": [
      {
        "error": "bla bla..."
      }
    ]
    // errors can be from system exception or it can be hidden
  }
```