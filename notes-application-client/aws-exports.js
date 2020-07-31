import { Auth } from 'aws-amplify';

const awsmobile = {
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_7RgbnElrn',
    userPoolWebClientId: '193ueshhuq52pd3accdlo6at31',
  },
  API: {
    endpoints: [
      {
        name: 'NotesBackend',
        endpoint: 'https://ao6mp1yx15.execute-api.eu-west-1.amazonaws.com/beta',
        custom_header: async () => ({
          Authorization: `Bearer ${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`,
        }),
      },
    ],
  },
};

export default awsmobile;
