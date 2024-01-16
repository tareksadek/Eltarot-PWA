import { db } from './firebase'

export const getReads = async () => {
  let reads = []
  let readData
  let readsRes

  try {
    readsRes = await db.collection('reads').orderBy('readId').get()
    readsRes.forEach(read => {
      readData = read.data()
      readData.id = read.id
      reads = [...reads, readData]
    })
  } catch (err) {
    throw new Error(err)
  }

  return reads
}

export const getReadByRef = async readRef => {
  let readRes = []

  try {
    const reads = await db.collection('reads').where('ref', '==', readRef).get()
    if (reads.empty) {
      console.log('No matching documents.')
    } else {
      reads.forEach(doc => {
        readRes = [...readRes, doc.data()]
      })
    }
  } catch (err) {
    throw new Error(err)
  }

  return readRes
}
