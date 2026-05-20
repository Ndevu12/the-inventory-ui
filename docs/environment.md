### Frontend Integration & URLs

## Frontend Environment Variables

### Required Variables

Frontend variables are prefixed with `NEXT_PUBLIC_` to make them accessible in the browser.

#### `NEXT_PUBLIC_API_URL`

- **Type:** string (full URL)
- **Required:** Yes
- **Purpose:** Base URL for Django REST API calls from the browser
- **Default:** None — must be explicitly set
- **Format:** Must include `/api/v1` path
- **Examples:**
  ```bash
  # Local development
  NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
  
  # Production with shared parent domain (recommended)
  NEXT_PUBLIC_API_URL=https://api.theinventory.ndevuspace.com/api/v1
  
  # Production with same domain
  NEXT_PUBLIC_API_URL=https://example.com/api/v1
  ```

**Important for Authentication:**
- In production, the backend domain must share a common parent domain with the frontend for cookies to work
- Example: `api.theinventory.ndevuspace.com` and `theinventory.ndevuspace.com` share parent `ndevuspace.com`
- See [Authentication Troubleshooting](./AUTHENTICATION_TROUBLESHOOTING.md) for cross-domain setup

#### `NEXT_PUBLIC_APP_NAME`

- **Type:** string
- **Default:** `The Inventory (Local)`
- **Purpose:** Application display name in browser title and UI
- **Examples:**
  ```bash
  NEXT_PUBLIC_APP_NAME="The Inventory (Local)"
  NEXT_PUBLIC_APP_NAME="My Company Inventory"
  NEXT_PUBLIC_APP_NAME="Inventory - Production"
  ```

### Setup

**File location:** `frontend/.env.local` (development) or `frontend/.env.production.local` (production)

**Example `frontend/.env.local`:**

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_NAME="The Inventory (Local)"
```

**For production deployment:**
- Set these variables in your hosting platform (Vercel, Netlify, etc.)
- Or create `frontend/.env.production.local` with production values
- The `.local` files are in `.gitignore` — never committed

---

#### `FRONTEND_URL`

- **Type:** string (full URL)
- **Default:** `http://localhost:3000`
- **Purpose:** Frontend base URL for redirects in password reset emails, OAuth callbacks, etc.
- **Examples:**
  ```bash
  # Local development
  FRONTEND_URL=http://localhost:3000
  
  # Production
  FRONTEND_URL=https://app.example.com
  
  # Staging
  FRONTEND_URL=https://staging.example.com
  ```

#### `PUBLIC_BASE_URL` (Optional)

- **Type:** string (full URL)
- **Default:** Derived from `ALLOWED_HOSTS` or `http://127.0.0.1:8000`
- **Purpose:** Public API endpoint used in emails and API documentation
- **Example:**
  ```bash
  PUBLIC_BASE_URL=https://api.example.com
  ```

#### `WAGTAILADMIN_BASE_URL` (Optional)

- **Type:** string (URL base without `/admin/`)
- **Default:** `PUBLIC_BASE_URL` or `http://127.0.0.1:8000`
- **Purpose:** Wagtail admin URL displayed in emails (e.g., "Edit this at: `https://api.example.com/admin/`")
- **Example:**
  ```bash
  WAGTAILADMIN_BASE_URL=https://api.example.com
  ```

#### `WAGTAIL_SITE_NAME` (Optional)

- **Type:** string
- **Default:** `the_inventory`
- **Purpose:** Display name in Wagtail admin UI and emails
- **Example:**
  ```bash
  WAGTAIL_SITE_NAME="My Company Inventory"
  ```

---

## Backend Configuration for Authentication

For the frontend to authenticate properly, especially in production with cross-domain setups, the backend must be configured correctly.

### JWT Cookie Settings

These settings are in your Django backend's `settings.py` or environment variables:

#### `JWT_COOKIE_DOMAIN`

- **Type:** string
- **Purpose:** Domain scope for JWT authentication cookies
- **Critical for:** Cross-domain authentication (frontend and backend on different subdomains)
- **Examples:**
  ```python
  # Shared parent domain (recommended for production)
  JWT_COOKIE_DOMAIN = ".ndevuspace.com"  # Leading dot allows all subdomains
  
  # Exact domain match
  JWT_COOKIE_DOMAIN = "example.com"
  
  # Local development
  JWT_COOKIE_DOMAIN = None  # or "localhost"
  ```

**Why this matters:**
- `.ndevuspace.com` allows cookies to be shared between `api.theinventory.ndevuspace.com` and `theinventory.ndevuspace.com`
- Without proper domain configuration, cookies are set but not sent on subsequent requests
- See [Authentication Troubleshooting](./AUTHENTICATION_TROUBLESHOOTING.md) for detailed setup

#### `JWT_COOKIE_SECURE`

- **Type:** boolean
- **Default:** `False`
- **Purpose:** Require HTTPS for cookie transmission
- **Examples:**
  ```python
  # Production (HTTPS)
  JWT_COOKIE_SECURE = True
  
  # Local development (HTTP)
  JWT_COOKIE_SECURE = False
  ```

#### `JWT_COOKIE_SAMESITE`

- **Type:** string (`"Lax"`, `"Strict"`, `"None"`)
- **Default:** `"Lax"`
- **Purpose:** Control cross-site cookie behavior
- **Examples:**
  ```python
  # Shared parent domain (recommended)
  JWT_COOKIE_SAMESITE = "Lax"
  
  # Completely different domains (requires Secure=True)
  JWT_COOKIE_SAMESITE = "None"
  ```

### CORS Configuration

Ensure your Django backend allows requests from the frontend:

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "https://theinventory.ndevuspace.com",
    "http://localhost:3000",  # for local development
]

CORS_ALLOW_CREDENTIALS = True  # Required for cookies
```

### Complete Backend Configuration Example

```python
# Production with shared parent domain
JWT_COOKIE_DOMAIN = ".ndevuspace.com"
JWT_COOKIE_SECURE = True
JWT_COOKIE_SAMESITE = "Lax"
JWT_COOKIE_HTTPONLY = True
JWT_COOKIE_PATH = "/"

CORS_ALLOWED_ORIGINS = [
    "https://theinventory.ndevuspace.com",
]
CORS_ALLOW_CREDENTIALS = True
```

### Troubleshooting

If authentication fails in production:
1. Verify `JWT_COOKIE_DOMAIN` matches your domain setup
2. Ensure `CORS_ALLOWED_ORIGINS` includes your frontend URL
3. Check that `CORS_ALLOW_CREDENTIALS = True`
4. See [Authentication Troubleshooting Guide](./AUTHENTICATION_TROUBLESHOOTING.md) for detailed debugging
