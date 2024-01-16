const admin = require('firebase-admin');
const serviceAccount = require('./tarot-331d9-firebase-adminsdk-4m2nh-89cf398070.json');

const fireInit = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tarot-331d9.firebaseio.com',
})

export default fireInit

// const createCustomToken = async (req, res) => {
//   const userId = req.body.uid
//   try {
//     const customToken = await admin.auth().createCustomToken(userId)
//     res.send(customToken.toJSON())
//   } catch (err) {
//     console.log('Error creating custom token:', err);
//   }
// }
