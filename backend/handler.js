'use strict';

const uuid = require('uuid').v4;
const { DynamoDB } = require('aws-sdk');

const documentClient = new DynamoDB.DocumentClient({
  region: process.env.REGION,
});

module.exports.getNotes = async () => {
  const notes = await documentClient
    .scan({
      TableName: process.env.NOTES_TABLE_NAME,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(notes.Items),
  };
};

module.exports.getNote = async (event) => {
  const noteId = event.pathParameters.id;

  const note = await documentClient
    .get({
      TableName: process.env.NOTES_TABLE_NAME,
      Key: {
        id: noteId,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(note),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*'
    }
  };
};

module.exports.createNote = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'No body included in request',
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*'
      }
    };
  }

  const note = {
    id: uuid(),
    noteText: JSON.parse(event.body).text,
  };

  await documentClient
    .put({
      TableName: process.env.NOTES_TABLE_NAME,
      Item: note,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(note),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*'
    }
  };
};

module.exports.updateNote = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'No body included in request',
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*'
      }
    };
  }

  const body = JSON.parse(event.body);
  const note = {
    id: event.pathParameters.id,
    noteText: body.text,
  };

  await documentClient
    .put({
      TableName: process.env.NOTES_TABLE_NAME,
      Item: note,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(note),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*'
    }
  };
};

module.exports.deleteNote = async (event) => {
  const noteId = event.pathParameters.id;

  await documentClient
    .delete({
      TableName: process.env.NOTES_TABLE_NAME,
      Key: {
        id: noteId,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Note successfully deleted' }),
  };
};
