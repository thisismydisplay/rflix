# rFlix

rFlix is a video streaming platform where users can comment on videos and create customizable profiles with unique settings and watchlist for sharing an account with multiple users.  

Check out a live version of rflix here: [https://rflix.thisismydisplay.com](https://rflix.thisismydisplay.com)

---

## Technologies Used
<img  src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png"  height=40/><img src="https://camo.githubusercontent.com/27d0b117da00485c56d69aef0fa310a3f8a07abecc8aa15fa38c8b78526c60ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667" height=40/><img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png" height=50/><img  src="https://datawookie.dev/img/logo/logo-sqlalchemy.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>

## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/thisismydisplay/rflix.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
6. Change working directory into react-app and install dependencies

    `npm install`

7. Start the app using:

    `npm start`


![rflix-example](https://user-images.githubusercontent.com/66559149/178785367-a26b8c4f-8db4-48f9-8ee6-30ea3650d4ec.gif)





## Features

### Profile
Logged in users can create, read, update, and delete profiles
Profiles have customizable settings such as 'preview on hover over thumbnail' and 'default volume'
Users can upload a custom profile photo

### Comments
Logged in users can post and read all comments and edit or delete their profile's comments

### Watchlist
Each profile has a customizable watchlist to save a list of series the user wants to watch later

### Video Player
There is a video player that enables viewing of video content.  Previews are shown on hover-over by default for video thumbnails, though users can turn off this behavior in manage profile > settings

## Future Features

### Search
### Kids profiles
### Recommended Videos based on browsing history
### Live chat


 ## Developers
  - Mark Osman
    - Github: https://github.com/thisismydisplay
    - LinkedIn: https://www.linkedin.com/in/markrockwellosman/
