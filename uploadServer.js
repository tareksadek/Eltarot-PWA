const express = require('express')
const multer = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/images/cards')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage }).single('file')

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    }
    if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
})

app.listen(8000, () => { console.log('Upload server running on port 8000') })
