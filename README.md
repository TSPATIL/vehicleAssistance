# vAssist - Vehicle Breakdown System

Welcome to the Vehicle Breakdown System repository! This system is designed to help users, administrators, and mechanics efficiently manage vehicle breakdown situations. It incorporates various features to streamline the process and provide a seamless experience for all stakeholders.

## Features

### 1. User Types
The system supports three user types:

- **User:** Can request assistance for vehicle breakdowns, track appointments, and make payments.
- **Admin:** Manages user requests, validates mechanics, and oversees the overall system.
- **Mechanic:** Receives and fulfils service requests, updates appointment status, and provides assistance.

### 2. Map Integration (React-Leaflet)
The system utilizes the React-Leaflet library to integrate interactive maps. This lets users pinpoint their location during breakdowns, making it easier for mechanics to reach them quickly.

### 3. Nodemailer Contact Form
Contact forms are crucial for user communication. Nodemailer is used to implement an email contact form, allowing users to contact administrators and mechanics easily.

### 4. Razorpay Payment Integration
Razorpay is integrated into the system to facilitate seamless transactions. Users can make payments securely for the services rendered.

### 5. Appointment Tracking
Users and mechanics can track appointment details, including scheduled times, service types, and location information. This ensures transparency and efficient scheduling.

### 6. Mechanic Validation
Admins validate and manage mechanic profiles to ensure a qualified and trustworthy pool of service providers. Mechanic validation enhances user confidence in the system.

## Getting Started

To get started with the Vehicle Breakdown System, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vehicle-breakdown-system.git

2. Install dependencies:

   ```bash  
   cd vehicle-breakdown-system
   npm install
   cd backend
   npm install
   
Set up the environment variables for API keys, email configuration, and other sensitive information.

3. Install Mongodb and Mongodb compass on your computer.

4. login to Razorpay and generate a test API key for the development phase

5. in .env add port, Razorpay key id and secret, jwt-secret string.

6. in contact.js in backend/route fill appropriate details for nodemailer

7. Run the application:
   
   ```bash   
   cd .. \\(in vehicle-breakdown-system folder)
   npm run both

8. Visit the following URLs in your browser:

User Interface: http://localhost:3000
Admin Dashboard: http://localhost:3000/admin
Mechanic Dashboard: http://localhost:3000/mechanic

9. Feel free to explore the system provide feedback and suggest your features/ideas for its development.

Project made by
Tanmay Patil


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
