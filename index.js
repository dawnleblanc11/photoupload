
  const express = require('express')
  const fs = require('fs')
  const util = require('util')
  const unlinkFile = util.promisify(fs.unlink)
  const multer  = require('multer')
  const { uploadFile, getFileStream} = require('./s3')

  var port = 3008;
  
  var app = express()
  
  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
  })
  const upload = multer({ storage: storage })
  
  
  app.use(express.static(__dirname + '/public'));
 // move to public/images
  app.use('/uploads', express.static('uploads'));

//  pulls the image from AWS- think we should use post id as the key???

// place in server.js
app.get('/images/:key',(req, res) => {
   const key = req.params.key 
    const readStream = getFileStream(key)

    readStream.pipe(res)
})

// add asyncs and awaits
  app.post('/profile-upload-single', upload.single('profile-file'), (req,res) => {
    // req.file is the `profile-file` file
    // req.body will hold the other blog post fields
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files ed successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    uploadFile(req.file.path)
   // deletes the local file
 //   unlinkFile(req.file.path)
    return res.send(response)
  })
  
    
  app.listen(port,() => console.log(`Server running on port ${port}!`))