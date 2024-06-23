# VTAI
Front-End: The workflow of the front-end application is:

Display a login page.
Accept a video file for upload and upload it.
To disk or cloud storage is up to you!
Redirect to a page that can display the uploaded media.
On the redirected page, show a video player that can play the uploaded media.
Don’t worry about codecs or media types.
We advise mp4 as the test file type.
 

Your front-end will be judged based on:

Angular (16, 17 or 18) - a lot of the work is moving Angular 16 → 18.
Use of the Material Design Library.
Use of the NGRX library to manage state.
3 pages, (i) Login page, (ii) Upload page, and (iii) Video player page.
 

Back-End: Your backend should support the front-end workflow:

We use a RESTful, API-based architecture internally.
Display a login page.
Deny access to all other pages unless logged in.
After logging in, redirect to an upload page.
Accept a file upload.
Redirect to a video player page.
Your backend workflow must also:

Write the original file name and size for the database; the database schema design is up to you.
Authenticate the user.
Return an error message on an unsuccessful login.
 

Your backend will be judged on:

NodeJS
Chosen web service, we use ExpressJS internally.
REST-fullness, the API should be “RESTful” or the URL scheme show-casing a well-thought approach to handling file uploads.
Persistence, (i) an SQL-based database is recommended, (ii) we use Postgres internally, (iii) use of an SQL driver, (iv) we use Prisma internally.
 
