import { db } from './firebase'

// const getOriginalCards = async () => {
//   const instance = axios.create({
//     baseURL: 'https://tarot.howlcode.com/api/v1/',
//   })
//   try {
//     const cards = await instance.get('cards')
//     return cards.data
//   } catch (err) {
//     throw new Error(err)
//   }
// }
//
// const pushOriginalCards = async () => {
//   let cardInfo
//   try {
//     const originalCards = await getOriginalCards()
//     originalCards.forEach(card => {
//       cardInfo = {
//         cardId: card.id,
//         name: card.name,
//         summary: card.summary,
//         fullMeaning: card.full_meaning,
//         upright: card.upright,
//         reversed: card.reversed,
//         image: card.image,
//       }
//       db.collection('cards').add(cardInfo)
//     })
//   } catch (err) {
//     throw new Error(err)
//   }
// }

export const getCards = async () => {
  let cards = []
  let cardData
  let cardsRes

  try {
    cardsRes = await db.collection('cards').orderBy('cardId').get()
    cardsRes.forEach(card => {
      cardData = card.data()
      cardData.id = card.id
      cards = [...cards, cardData]
    })
  } catch (err) {
    throw new Error(err)
  }

  return cards
}

export const getCardById = async cardId => {
  let cardData
  let cardRes

  try {
    cardRes = await db.collection('cards').doc(cardId).get()
    cardData = cardRes.data()
  } catch (err) {
    throw new Error(err)
  }

  return cardData
}

export const updateCard = async (cardId, updateData) => {
  try {
    await db.collection('cards').doc(cardId).update(updateData)
  } catch (err) {
    throw new Error(err.message)
  }
}
