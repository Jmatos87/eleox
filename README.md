# Welcome to my code challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### DEVELOPER STEPS

1. Create Routing with default routing to login page
2. Succeed in making a programatic request to the /login endpoint.
3. Implement a visual notifcation system for failed requests
4. Create logic for local Storage for access_token and reroute to /people-dashboard
5. Create a page for People Dashboard and start hitting the /people endpoint with the access_token
6. Check local storage and assess validity of access_token before making request to /people endpoint.
7. Create a generic list to render the output of /people endpoint and onClick lead to advanced person view.

Took a break and did not like step 7 because making a 3rd page just to show comments felt unnecessary and inconvenient for the user.

8. Changed design from accordion to people cards. Leveraging some of the designs from material-ui.
9. Create buttons for interacting with card and restyled card for minimalistic design.
10. Implemented a modal onClick with delete icon... request only fires after affirmation and updates UI (closes modal immediately and removes the user from the existing list on successful delete response)
11. Comments button on click shows loading gif (briefly) and renders comments from the /people/:id endpoint, after the first call the data is persisted in state and no more calls are made
12. Add Logout Design and NavBar
13. Add redirect logic for any unauthorized requests inside the app.
14. Touch up designs

### DEVELOPER THOUGHTS / THINGS I WOULD DO DIFFERENTLY

- Build Navbar in routes and have it persist outside of login. Could also be a nice global space for handling notifications.
- Redesign Dashboard commments. Would rather have a side panel component that handles requests and rendering... would have liked to make this in a notebook style design
- Create a file to abstract away api handling - integrate react-query
- Create more components for Person Card (ex: modal)
- Create a utils file for computing logic
- Extend notifications to also include successful api calls (delete)
- Implement email validation and error messages (didnt want to spend too much time on the log in screen)
- Implement a create contact button at the beginning of the list of cards. Onclick it opens a form, on submit it sends the POST request to create a new person... update UI (close modal and render new person in existing list) The content of the modal would be its own component and could be reused for the login screen (sign up workflow)
