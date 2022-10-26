const {studentCreate,getStudentById,getStudentResult} = require('../student/student.services')


const newStudentInsert = (req,res)=>{

    studentCreate(req.file.path,(err,results)=>{
        if(err){
            res.status(500).json({
                status:500,
                error:err.message
            })
        }else{
            res.status(201).json({
                status:201,
                data:"File Insert sucessfully"
            })
        }
    })
}


const getStudentDetails=(req,res)=>{
    getStudentById(req.params.id,(err,results)=>{
        console.log("result@@@",results)
         
        if(err){
            res.status(500).json({
                status:500,
                error:err.message
            })
        }else{
            if(results.length ===0){
                res.status(404).json({
                    status:404,
                    message:"id not found"
                })
            }else{
                res.status(200).json({
                    status:200,
                    data:results
                })
            }
        }
    })
}

const getAllStudentResults =(req,res)=>{
    getStudentResult(req.query.resultStatus,(err,results)=>{
        if(err){
            res.status(500).json({
                status:500,
                error:err.message
            })
        }else{
            res.status(200).json({
                status:200,
                data:results
            })
        }
    })
}


module.exports={
    newStudentInsert:newStudentInsert,
    getStudentDetails:getStudentDetails,
    getAllStudentResults:getAllStudentResults
}
