# Fullstack Course-Administration Application
> [!NOTE] 
> - Using **DEPRECATED** `create-react-app` per assignment spec

## Action Roster

## Devlog
- [ ] `rough UpdateCourse component`
- [x] `rough CreateCourse component`
- `add ErrorList, cookies`
    - [x] add cookies to UserContext
    - [x] add error messaging to UserContext, UserSignIn with ErrorList
- `rough UserContext, UserSignIn-component`:
- `rough CourseDetail component`:
- `test client-api wiring with Test.js`

### `Apr 9, 2024`


### `Apr 8, 2024`+
```bash
#  ./api
$ npm i cors
$ npm audit fix
```
- [x] Test simple API request from client App.js
    - `GET`, to `api/courses`
- [x] Add CORS support

## Notes

### `20240408`
- "Works":
```bash
$ npm uninstall create-react-app #try global uninstall in needed
$ npx create-react-app courses #Installs latest version, includes templates
> Need to install: create-react-app@5.0.1. Ok to proceed?
> {Y}
$ npm start
```

- Did not work:
```bash
#Navigate to project-parent folder "/unit"
$ npm i create-react-app #Local install only
> npm WARN deprecated tar@2.2.2: This version of tar is no longer supported, and will not receive security updates. Please upgrade asap.
$ npm i tar
$ npm audit fix --force
$ npm audit
> found 0 vulnerabilities
$ npx create-react-app courses
$ npm audit fix
$ cd courses
$ npm i
```

## Externalities
1. *Must* use `create-react-app` per spec


### 20240407
- [x] Reinitialize `Slack` on new PC; 
    - [x] Ask if I *MUST* I use `create-react-app` or can I use `vite`


## CLI
```conf
# Remote Repo
https://github.com/jcruzaxaeon/pagination.git
# CLI
cd /mnt/i/srv/axaeon/app/unit/10t
# Backup
I:\ops\bak\site\axaeon\app\unit\t10_courses
# Live
I:\srv\axaeon\app\unit\10t
```

## Git
```conf
# URL
https://github.com/jcruzaxaeon/courses.git

# CLI Create a new repo
echo "# courses" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/jcruzaxaeon/courses.git
git push -u origin main

# CLI Push an Existing Repo
git remote add origin https://github.com/jcruzaxaeon/courses.git
git branch -M main
git push -u origin main
```

### Stack
- `Node.js`, `Express`, `React`, `JSX`, `React Router`, `React Context API`, `Create React App`
- `react-router-dom`
- `js-cookie`

### Initial Specification
- Use `React` to create a client for `school-courses-db` (Project 9t REST API)
- View, CRUD courses
- Create an account
- Signin to make changes to DB

### Procedure
1. Use `Create React App` to setup initial project
1. Use `JavaScript` and `JSX` to build out modular-components
1. Use `React Router` to setup routes
1. Use either `Fetch API` or `Axios` to fetch data from REST API
1. Allow signup, and `Basic Authentication` to signin
1. Add CSS to personalize


## Checklist
 16 steps

1. [ ] Create your React project. Use the `create-react-app` tool to set up and create your React project in a folder named `client`.
1. [ ] Set up your REST API. Add a folder named `api` to the root of your repo.  Copy the REST API Express application from your unit 9 project into the api folder.
1. Add CORS support to your REST API
When developing your React application, you'll be using the `create-react-app` development server, which will host your application (by default) at http://localhost:3000/. Your REST API, will be hosted separately from your React application at http://localhost:5000/. While both the React and REST API applications will be using the same hostname, localhost, their port numbers differ, so the browser will treat them as separate origins or domains.
To successfully make a request from the React application's domain to the REST API's domain, you'll need to update your REST API application to support cross-origin resource sharing or CORS (see this page on MDN for more information about CORS).
1. [ ] Add a middleware function to set the appropriate headers to support CORS.
Alternatively, you can install and configure the cors npm package (https://www.npmjs.com/package/cors).
1. [ ] Test calling your REST API from your React application. Before going any further, let's ensure that your React and REST API applications are setup correctly and you can successfully call your REST API from your React application.
1. [ ] Update the React App component (src/App.js file) to call the REST API to get a list of courses and render the results.  We're just confirming the setup of the applications, so just render the list of course titles using some simple markup (e.g. an unordered list or set of divs).
1. [ ] Open a terminal or command window and start your REST API application. Browse to the api folder and run the command npm start.  Once you've started the REST API application, you can typically just leave the app running in the background.
1. Open another terminal or command window and start your React application.  Browse to the client folder and run the command npm start.
The create-react-app development server should start and open your application into your default browser. If the development server started but it didn't open in the browser, try manually browsing to it at http://localhost:3000/.


### Build your app components
- Use the provided HTML files (see the markup folder in the project files download) as a guide while you create the components for this project.
- Use the App component (src/App.js file) that was generated by the create-react-app tool as your main container component.
- Create the following stateful components:

#### Components
1. [ ] `Courses` - This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. Each course needs to link to its respective "Course Detail" screen. This component also renders a link to the "Create Course" screen.
1. [ ] `CourseDetail` - This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. This component also renders an "Update Course" button for navigating to the "Update Course" screen.
1. `UserSignIn` - This component provides the "Sign In" screen by rendering a form that allows a user to sign in using their existing account information. The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
1. `UserSignUp` - This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
1. `CreateCourse` - This component provides the "Create Course" screen by rendering a form that allows a user to create a new course. The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
1. `UpdateCourse` - This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.
- Create the following stateless components:
1. `Header` - Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's name and a button for signing out (if there's an authenticated user).
1. `UserSignOut` - This component is a bit of an oddball as it doesn't render any visual elements. Instead, it signs out the authenticated user and redirects the user to the default route (i.e. the list of courses).
- [ ] Pro Tip: Resist the temptation to keep and manage the courses data as global state in the App component. Instead, allow the 
    - [ ] `Courses` and 
    - [ ] `CourseDetail` components to retrieve their data from the REST API when those components are mounted. Using this approach simplifies the management of the courses data and ensures that the data won't get out of sync with the REST API's persisted data.

Set up your routes
Install React Router and set up your <Route> and <Link> or <NavLink> components.
Clicking a link should navigate the user to the correct route, displaying the appropriate info.
The current route should be reflected in the URL.
Your app should include the following routes (listed in the format path - component):
/ - Courses
/courses/create - CreateCourse
/courses/:id/update - UpdateCourse
/courses/:id - CourseDetail
/signin - UserSignIn
/signup - UserSignUp
/signout - UserSignOut
Add support for user authentication
To prepare for implementing user authentication (i.e. user sign in and sign out), determine where you'll manage your application's global state.
One option, is to keep your global state in your App component. Using this approach, the authenticated user and the user sign in and sign out actions (i.e. methods) are made available throughout your application, by using props to pass references down through your component tree.
Another option, is to manage your global state using the React Context API. Using this approach, the authenticated user and the user sign in and sign out actions (i.e. methods) are defined using a Context API <Provider> component and made available throughout your application using Context API <Consumer> components.
Create your signIn() method.
Your signIn() method should define emailAddress and password parameters.
To authenticate the user, make a request to the REST API's /users endpoint, using the emailAddress and password parameter values to set an Authorization header on the request using the Basic Authentication scheme.
If the request to the REST API succeeds (i.e. the server returns an "200 OK" HTTP status code), then you'll know that the supplied user credentials are valid. If the server returns a "401 Unauthorized" HTTP status code, then the supplied user credentials are invalid.
After validating the user's credentials, persist the returned user record and the user's password in the global state. Doing this will allow you to create and set the appropriate Authorization header on future REST API requests that require authentication.
Create your signOut() method.
The signOut() method should remove the authenticated user and password from the global state.
Configure your protected routes
Define a higher-order component (HOC) named PrivateRoute for configuring protected routes (i.e. routes that require authentication).
Use a stateless component to wrap an instance of the <Route> component.
Use the <Route> component's render property to define a function that renders the component associated with the private route if there's an authenticated user or redirects the user to the /signin route if there's not an authenticated user.
Update the following routes to use the PrivateRoute component:
/courses/create
/courses/:id/update
Restrict access to updating and deleting courses
On the "Course Detail" screen, add rendering logic so that the "Update Course" and "Delete Course" buttons only display if:
There's an authenticated user.
And the authenticated user's ID matches that of the user who owns the course.
Display validation errors
Update the "Sign Up", "Create Course", and "Update Course" screens to display validation errors returned from the REST API.
See the create-course.html file in the markup project files folder.
Add support for rendering markdown formatted text
Use npm to install the react-markdown package (see https://www.npmjs.com/package/react-markdown for more information).
On the "Course Detail" screen, use the <ReactMarkdown> component to render the course description and materialsNeeded properties as markdown formatted text.
Add HTML and CSS
Use the HTML files contained within the markup project files folder as a guide while you create the components for this project.
Use the CSS contained within the global.css file in the styles project files folder for your application's styles.
Feel free to experiment with modifying the colors, background colors, or fonts in order to personalize your application.
Add good code comments
Cross-Browser consistency:
Google Chrome has become the default development browser for most developers. With such a selection of browsers for users to choose from, it's a good idea to get in the habit of testing your projects in all modern browsers.
Review the "How you'll be graded" section.
Quality Assurance and Project Submission Checklist
Perform QA testing on your project, checking for bugs, user experience and edge cases.
Check off all of the items on the Student Project Submission Checklist.
NOTE: Seeking assistance

If you're feeling stuck or having trouble with this project
Reach out to the team on Slack.
Review material in the unit.
Practice your Google skills by finding different ways to ask the questions you have, paying close attention to the sort of results you get back depending on how your questions are worded.
NOTE: What you submit is what will get reviewed.

When you submit your project, a snapshot is taken of your repository, and that is what the reviewer will see. Consequently, any changes you make to your repo after you submit will not be seen by the reviewer. So before you submit, it's a smart idea to do a final check to make sure everything in your repo is exactly what you want to submit.
Extra Credit
To get an "exceeds" rating, complete all of the steps below:

 3 steps
Display user-friendly messages
A well-designed application will display user-friendly messages when things go wrong. For example, when a requested page can't be found.
Create the following stateless components:
NotFound - Display a message letting the user know that the requested page can't be found.
Forbidden - Displays a message letting the user know that they can't access the requested page.
UnhandledError - Display a message letting the user know that an unexpected error has occurred.
Add the following routes (listed in the format path - component):
/notfound - NotFound
/forbidden - Forbidden
/error - UnhandledError
Update the CourseDetail and UpdateCourse components to redirect users to the /notfound path if the requested course isn't returned from the REST API.
Update your React Router configuration so that if a route isn't matched the NotFound component will be rendered.
Update the UpdateCourse component to redirect users to the /forbidden path if the requested course isn't owned by the authenticated user.
Throughout your application, redirect users to the /error path when requests to the REST API return a "500 Internal Server Error" HTTP status code.
Persist user credentials
After successfully authenticating a user, persist their credentials using an HTTP cookie or local storage so that the user's authenticated state is maintained even if the application is reloaded or loaded into a new browser tab.
Redirecting the user after successfully signing in
After a user successfully signs in, redirect them back to the previous screen (whatever that happens to be).
For example, if a user attempts to view the "Create Course" screen before they've signed in, they'll be redirected to the "Sign In" screen. After the user has successfully signed in, redirect them to the "Create Course" screen.
NOTE: Getting an "Exceed Expectations" grade.

See the rubric in the "How You'll Be Graded" tab above for details on what you need to receive an "Exceed Expectations" grade.
Passing grades are final. If you try for the "Exceeds Expectations" grade, but miss an item and receive a “Meets Expectations” grade, you won’t get a second chance. Exceptions can be made for items that have been misgraded in review.
Always mention in the comments of your submission or any resubmission, what grade you are going for. Some students want their project to be rejected if they do not meet all Exceeds Expectations Requirements, others will try for all the "exceeds" requirement but do not mind if they pass with a Meets Expectations grade. Leaving a comment in your submission will help the reviewer understand which grade you are specifically going for