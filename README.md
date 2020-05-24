# serverless-notes-application

## Use Cases

- As a user I can create a note
- As a user I can see my notes in a web application
- As a user I can edit my notes in the web application
- As a user I can log into my web application so that my notes are private

### Stretch Use Cases

- Notes saved are different depending on the user signing in

## Architecture

- DynamoDB to save the notes
- Lambda function for the endpoint
- GraphQL in the lambda function for API management
- AWS Cognito for authentication
