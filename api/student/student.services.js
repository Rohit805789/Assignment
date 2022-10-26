const pool= require("../../config/db")
const fs = require("fs");
const fastcsv = require("fast-csv");

function studentCreate(filePath, callback){

    let stream = fs.createReadStream(filePath);   // Read the File
    let csvData = [];
    let fileStream = fastcsv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            csvData.shift();   // Remove the header 

            pool.query(`INSERT INTO student_details(name,age,mark1,mark2,mark3)VALUES ?`,
            [
            csvData
            ]
            ,function(err,result){
                if(err){
                    return callback(err)
                }else{
                    return callback(null,result)
                }
                
            })
        })
        stream.pipe(fileStream);
}


function getStudentById(id,callback){
    pool.query(`SELECT * FROM student_details WHERE id=?`,
    [
        id
    ],
    function(err,result,fields){
        if(err){
            return callback(err)
        }else{
            return callback(null,result)
        }
    })
}


function getStudentResult(data,callback){

    let q =`SELECT Name, sum(Mark1+Mark2+Mark3) as Total_Mark, `
    q += `case when sum(Mark1+Mark2+Mark3) >= ? then 'Passed' else 'Failed' end as resultStatus `
    q += `FROM student_details group by Name`

    pool.query(q,
    [
    data
    ]
    ,function(err,results,fields){
           if(err){
            return callback(err)
           }else{
            return callback(null,results)
           }
    })
}


module.exports={
    studentCreate:studentCreate,
    getStudentById:getStudentById,
    getStudentResult:getStudentResult
}


