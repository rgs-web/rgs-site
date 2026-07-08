# Reliant Global Solutions – API Contracts

## Purpose
Persist contact form submissions to MongoDB. Email delivery is intentionally deferred (user requested "skip email for now").

## Backend Endpoints

### POST /api/contact
Create a new contact submission.

Request JSON:
```
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "company": "string (optional)",
  "phone": "string (optional)",
  "message": "string (required)"
}
```

Response 201:
```
{
  "id": "uuid",
  "name": "...",
  "email": "...",
  "company": "...",
  "phone": "...",
  "message": "...",
  "submitted_at": "iso datetime",
  "status": "new"
}
```

Errors:
- 400 – validation failure (missing required fields, invalid email)
- 500 – database error

### GET /api/contact
Return all submissions, newest first (for future admin viewing).

Response 200: `List[ContactSubmission]`

## Data Model (MongoDB collection: `contact_submissions`)
```
{
  id: str (uuid),
  name: str,
  email: str,
  company: str | None,
  phone: str | None,
  message: str,
  submitted_at: datetime,
  status: "new" | "reviewed"
}
```

## Frontend Integration
- `pages/Contact.jsx` will POST to `${REACT_APP_BACKEND_URL}/api/contact`.
- Remove localStorage mock save.
- Show success screen on 201, toast error on failure.

## What is mocked (staying mocked)
- Nothing on the contact flow — it becomes real backend once this is done.
- Email delivery to solutions@reliantgs.com is DEFERRED. Submissions live in the DB only.
