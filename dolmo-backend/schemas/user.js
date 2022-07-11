export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
    {
      name: 'isVerified',
      title: 'Verified Account',
      type: 'boolean',
      description: '⚡ ADMIN CONTROLS: Mark this if the user if a public figure!',
    }
  ],
};