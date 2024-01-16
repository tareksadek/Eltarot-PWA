const functions = require('firebase-functions')
const admin = require('firebase-admin')
const stripe = require('stripe')('sk_test_51HdlDPCE2YsnFpa1c9SDrEcVDDpQbKwnEYdiV9PKXElpXW5b1rkdGBpH6A1RX6Qj9aHzCyWLF9tYBGlZxjZSaeUS00O99y0edf')

admin.initializeApp()

exports.addSuperAdminRole = functions.https.onCall(async data => {
  try {
    const user = await admin.auth().getUserByEmail(data.email)
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: {
        ...user.customClaims.claims,
        superAdmin: true,
      },
    })
  } catch (err) {
    throw new Error(err)
  }

  return {
    message: `Success! ${data.email} has been made a super admin.`,
  }
})

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  if (context.auth.token.claims.superAdmin !== true) {
    return {
      message: {
        type: 'error',
        body: 'Only super admin can create admins, sucker!',
      },
    }
  }

  try {
    const user = await admin.auth().getUserByEmail(data.email)
    const userCustomClaims = user.customClaims ? { ...user.customClaims.claims, admin: true } : { admin: true }
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: userCustomClaims,
    })
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return {
    message: {
      type: 'success',
      body: `Success! ${data.email} has been made an admin.`,
    },
  }
})

exports.disableAdminRole = functions.https.onCall(async (data, context) => {
  if (context.auth.token.claims.superAdmin !== true) {
    return {
      error: 'Only super admin can disable admins, sucker!',
    }
  }

  try {
    const user = await admin.auth().getUserByEmail(data.email)
    const userCustomClaims = user.customClaims ? { ...user.customClaims.claims, admin: false } : { admin: false }
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: userCustomClaims,
    })
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return {
    message: {
      type: 'success',
      body: `Success! ${data.email} has been disabled as admin.`,
    },
  }
})

exports.createOrderAndSession = functions.https.onCall(async () => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
    })
    return intent.client_secret
  } catch (err) {
    throw new Error(err)
  }
})

exports.addSubscriberRole = functions.https.onCall(async data => {
  try {
    const user = await admin.auth().getUserByEmail(data.email)
    const userCustomClaims = user.customClaims ? { ...user.customClaims.claims, subscriber: true } : { subscriber: true }
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: userCustomClaims,
    })
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return {
    message: {
      type: 'success',
      body: `Success! ${data.email} is subscribed.`,
    },
  }
})

exports.disableSubscriberRole = functions.https.onCall(async data => {
  try {
    const user = await admin.auth().getUserByEmail(data.email)
    const userCustomClaims = user.customClaims ? { ...user.customClaims.claims, subscriber: false } : { subscriber: false }
    await admin.auth().setCustomUserClaims(user.uid, {
      claims: userCustomClaims,
    })
  } catch (err) {
    return {
      message: {
        type: 'error',
        body: `Error occurred! ${err.message}.`,
      },
    }
  }

  return {
    message: {
      type: 'success',
      body: `Success! ${data.email} has been disabled as subscriber.`,
    },
  }
})
