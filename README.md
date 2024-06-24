# Front-End Application Workflow

1. **Display a Login Page**
2. **Accept and Upload a Video File**
   - Upload the file to disk or cloud storage.
3. **Redirect to a Video Display Page**
   - Show a video player that can play the uploaded media.
   - Use `.mp4` as the test file type.

## Front-End Judging Criteria

- **Angular**: Use Angular 16, 17, or 18 (with a focus on moving from Angular 16 to 18).
- **Material Design Library**: Utilize the Material Design Library.
- **NGRX Library**: Manage state using NGRX.
- **Page Requirements**:
  1. Login Page
  2. Upload Page
  3. Video Player Page

# Back-End Support for Front-End Workflow

1. **Display a Login Page**
2. **Restrict Access**: Deny access to all pages except the login page unless logged in.
3. **Redirect Post-Login**: Redirect to an upload page after a successful login.
4. **File Upload**: Accept and process file uploads.
5. **Redirect to Video Player Page**: Redirect to a page where the uploaded video can be played.

## Back-End Workflow Requirements

- **Database Operations**:
  - Write the original file name and size to the database.
  - Database schema design is up to you.
- **User Authentication**:
  - Authenticate the user.
  - Return an error message for unsuccessful logins.

## Back-End Judging Criteria

- **NodeJS**: Use NodeJS for the back-end.
- **Web Service**: Use ExpressJS.
- **RESTfulness**: Ensure the API is RESTful with a well-thought-out URL scheme for file uploads.
- **Persistence**:
  - Use an SQL-based database (Postgres recommended).
  - Utilize an SQL driver (Prisma recommended).