const candidatemodel=require("../models/candidateModel")
const {randomBytes}=require ("crypto")//pour envoyer un code de verify dans l email
const mycode=randomBytes(6).toString("hex")
const nodemailer=require("nodemailer");
const UseModel = require("../models/UseModel");
const Candidate = require("../models/candidateModel");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'farhatyasmine161@gmail.com',
      pass: 'tzdf aymn xxwy gvmt',
    }
  });
exports.createCandidate=async(req,res)=>{
    try{
        if(req.file){
            req.body.image=req.file.filename
        }
        
        const candidate=new candidatemodel({...req.body,code:mycode , role:"candidate"})
        const savedcandidate=await candidate.save()
        const mailOptions = {
            from : 'farhatyasmine161@email.com',
             to : savedcandidate.email,
             subject: "Hello " + savedcandidate.FirstName + " "+savedcandidate.LastName,
             text: "Mail de confirmation",
             html: `
               <!DOCTYPE html>
               <html lang="en">
               <head>
                   <meta charset="UTF-8">
                   <meta http-equiv="X-UA-Compatible" content="IE=edge">
                   <meta name="viewport" content="width=device-width, initial-scale=1.0">
                   <title>Email de Confirmation</title>
                   <style>
                       body {
                           font-family: Arial, sans-serif;
                           background-color: #F4F4F4;
                           margin: 0;
                           padding: 0;
                       }
                       .container {
                           width: 100%;
                           max-width: 600px;
                           margin: 0 auto;
                           background-color: #FFFFFF;
                           padding: 20px;
                           border-radius: 8px;
                           box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                       }
                       h1 {
                           color: #333333;
                           font-size: 24px;
                           margin-bottom: 20px;
                       }
                       p {
                           font-size: 16px;
                           color: #555555;
                       }
                       .button {
                           display: inline-block;
                           padding: 12px 25px;
                           background-color: #0AACC3;
                           color: white;
                           text-decoration: none;
                           border-radius: 5px;
                           margin-top: 20px;
                           text-align: center;
                           font-weight: bold;
                       }
                       .button:hover {
                           background-color: #63B6D4;
                       }
                       footer {
                           margin-top: 40px;
                           font-size: 12px;
                           color: #888888;
                           text-align: center;
                       }
                   </style>
               </head>
               <body>
                   <div class="container">
                       <h1>Bonjour ${savedcandidate.FirstName+ " "+savedcandidate.LastName},</h1>
                       <p>Merci d'avoir créé un compte avec nous. Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
                       <a href="http://localhost:5000/user/verify/${savedcandidate.code}" class="button">Vérifier mon compte</a>
                       <footer>
                           <p>Si vous n'avez pas créé ce compte, ignorez simplement cet email.</p>
                       </footer>
                   </div>
               </body>
               </html>
               `,

          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log("Error!:" ,error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.status(202).json({
            message:"candidate create avec succes",
            data:candidate
        })
         
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
exports.getallcandidate=async(req,res)=>{
    try{
        const candidates=await candidatemodel.find()
        res.status(200).json({
            succes:true,
            message:"candidate found",
            data:candidates
        })

    }
    catch(error){
        res.status(400).json({
        succes:false,
        message:"failed to find candidate",
        data:null})

    }
}
exports.getCandidateById=async(req,res)=>{
    try{
        const candidateid=req.params.id
        const candidate=await UseModel.findById(candidateid)
        if(!candidate){return res.status(404).json({
            succes:false,
            message:"candidate not found",
            data:null
        })}
        res.status(200).json({succes:true,
        message:"candidate found",
        data:candidate})
    }
    catch(error){
        res.status(400).json({succes:false,
        message:"failed to find candidates",
        data:null})
    }
}
exports.updateCandidate=async(req,res)=>{
    try{
        const candidatedata=await UseModel.findById(req.params.id)
        if (!candidatedata){
            return res.status(400).json({
                success:false,
                message:"candidate not found"
            })
            


        }
        if(req.file){
            req.body.image=req.file.filename
        }
        else{

            req.body.image=candidatedata.image
        }
        const candidateid=req.params.id
        const candidate=await Candidate.findByIdAndUpdate(candidateid,req.body,{new:true})
        res.status(200).json({
            succes:true,
            message:"candidate updated",
            data:candidate
        })
    }
    catch(error){
        res.status(400).json({succes:false,
        message:"failed to update candidate ",
        data:null})
    }
}
exports.deleteCandidate=async(req,res)=>{
    try{
        const candidateid=req.params.id
        const candidate=await candidatemodel.findByIdAndDelete(candidateid)
        res.status(200).json({
            succes:true,
            message:"candidate delete ",
            data:candidate})
    }
    catch(error){
        res.status(400).json({succes:false,
        message:"failed to delete candidate ",
        data:null })

    }
}