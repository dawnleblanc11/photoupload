
  var express = require('express')
  var multer  = require('multer')
  var port = 3001;
  
  var app = express()
  
  var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
  })
  var upload = multer({ storage: storage })
  
  
  app.use(express.static(__dirname + '/public'));
  app.use('/uploads', express.static('uploads'));
  
  app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the other blog post fields
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
  })
  
    
  app.listen(port,() => console.log(`Server running on port ${port}!`))