## What is the "utils" folder?

The "utils" folder is used for tools that you use to simplify your code or wrappers for an external tool

## How are we using it?

### data.js

We are using the "data.js" to query data from the sanity backend for the social media posts

### fetchUser.js

This code defines a function named fetchUser that retrieves a user from local storage.

The function first checks if the user item in local storage is defined by checking if it is not equal to the string 'undefined'. If it is defined, the function returns the value of the user item from local storage. If it is not defined, the function clears the local storage and returns undefined.

The // eslint-disable-next-line import/prefer-default-export comment above the export statement disables a warning from the ESLint linter related to the fact that this file only exports a single named export, fetchUser. This is considered a best practice in JavaScript to avoid unnecessary complexity in codebases.
