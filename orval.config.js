module.exports = {
  meetup: {
    input: './src/generated/swagger.json',
    output: {
      mode: 'tags-split',
      target: './src/generated/api/meetup.ts',
      client: 'react-query',
    },
  },
};
