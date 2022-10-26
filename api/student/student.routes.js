const {newStudentInsert,getStudentDetails,getAllStudentResults} = require('../student/student.controller')
const router = require('express').Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
        if (!file.originalname.match(/\.(csv)$/)) { 
            // upload only png and jpg format
            return cb(new Error('Please upload a CSV File'))
          }
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.csv')
    }
  })
  
const upload = multer({ storage: storage })    // used  for file uploading


router.post('/upload',upload.single('studentfile'),newStudentInsert)  // use for csv file upload 
router.get('/students/:id',getStudentDetails)   //  get student data acc to id 
router.get('/students',getAllStudentResults) // get result all student enter the passing mark ?resultStatus=

module.exports = router
