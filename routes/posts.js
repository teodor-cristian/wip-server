const express = require('express'),
  router = express.Router(),
  Utils = require( './../utils/utils' );


router.get('/getAllPosts',(req,res) => {
    Utils.readAllFilesFromDirectory('posts')
    .then((filenames) => {
      let enhancedFilesNames = Utils.enhanceFilesNames(filenames)
      res.status(200).send(enhancedFilesNames)
    })
    .catch((err) => res.status(500).send(err))
})

router.get('/getPosts/:fileNameURL',(req,res) => {
    let fileNameURL = req.params.fileNameURL;

    Utils.readAllFilesFromDirectory('posts')
    .then((fileNames) => {
      let enhancedFilesNames = Utils.enhanceFilesNames(fileNames),
        fileName = Utils.getFileName(fileNameURL, enhancedFilesNames)

        if (fileName) {
          Utils.readFile(`posts/${fileName}`)
          .then((data) => {
            res.status(200).send(data)
          })
          .catch((err) => res.status(500).send(err))
        } else {
            res.status(400).send(`Bad request! No matching post for this url: ${fileNameURL}`)
        }
    })
    .catch((err) => res.status(500).send(err))

})


module.exports = router;