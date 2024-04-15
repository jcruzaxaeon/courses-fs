# Fullstack Course-Administration Application
> [!NOTE] 
> - Using **DEPRECATED** `create-react-app` per assignment spec

## Action Roster

## Devlog
- `rough UpdateCourse component`
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

