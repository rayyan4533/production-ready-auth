
## To-Do
- [ ] Fix email verification bugs
- [ ] Add a `/getme` route 
- [ ] Add middlewares already implemented while routing 

# Authentication API (Self Auth)
A robust, production-ready Authentication API built with Node.js, Express, TypeScript, and Drizzle ORM.

## Tech Stack
- **Backend Framework:** Node.js with Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Validation:** Zod
- **Authentication:** JWT (JSON Web Tokens) with Access & Refresh tokens
- **Password Hashing:** bcrypt
- **Emails:** Nodemailer (Mailtrap for testing)

## Features
- **User Registration:** Secure account creation with hashed passwords.
- **User Login:** Authentication issuing both short-lived Access Tokens and long-lived Refresh Tokens (stored in HTTP-Only cookies).
- **Token Refresh:** Secure endpoint to renew expired Access Tokens using the Refresh Token cookie.
- **Logout:** Clears cookies and securely logs the user out.
- **Role-Based Access Control (RBAC):** Middleware to protect routes and verify user roles (e.g., `admin`, `user`).
- **Email Verification:** (In Progress) Send and verify email tokens.
- **Password Reset:** (In Progress) Securely request and reset forgotten passwords.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js
- PostgreSQL
- `pnpm` (Package Manager)

### Installation

1. **Clone the repository and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory and configure it mapping to your local setup:
   ```env
   # Server
   PORT=5000
   CLIENT_URL=http://localhost:3000

   # Database
   DATABASE_URL=postgresql://postgres:root@localhost:5432/practice_auth

   # JWT Secrets
   JWT_ACCESS_SECRET=your_access_secret
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_REFRESH_EXPIRES_IN=7d

   # SMTP / Email configuration (Mailtrap)
   SMTP_HOST=sandbox.smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=your_user
   SMTP_PASS=your_pass
   SMTP_FROM_NAME=YourAppName
   SMTP_FROM_EMAIL=noreply@yourapp.com
   ```

3. **Database Setup:**
   Generate the Drizzle migrations and apply them to your database:
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

4. **Run the Development Server:**
   ```bash
   pnpm dev
   ```
   The server will start on `http://localhost:5000`.

## API Endpoints

All authentication endpoints have the prefix `/api/auth`

| Method | Endpoint             | Description |
| :---   | :---                 | :--- |
| POST   | `/register`          | Register a new user |
| POST   | `/login`             | Login user & return tokens |
| POST   | `/refresh`           | Get new Access Token using Refresh Token cookie |
| DELETE | `/logout`            | Logout user & clear cookies |
| GET    | `/verify-email/:token`| Verify user email address |
| POST   | `/forgot-password`   | Request password reset link |
| PUT    | `/reset-password`    | Reset password using token |

## Scripts
- `pnpm dev`: Starts the development server using `tsc-watch`.
- `pnpm build`: Compiles TypeScript down to JavaScript in the `dist` folder.
- `pnpm start`: Runs the compiled production code.
- `pnpm studio`: Opens Drizzle Studio to view database tables visually.
