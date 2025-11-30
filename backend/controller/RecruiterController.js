const recruitermodel=require("../models/RecruiterModel")
const {randomBytes}=require ("crypto")//pour envoyer un code de verify dans l email
const mycode=randomBytes(6).toString("hex")
const nodemailer=require("nodemailer")
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'farhatyasmine161@gmail.com',
      pass: 'tzdf aymn xxwy gvmt',
    }
  });
exports.createRecruiter=async(req,res)=>{
    try {
        if(req.file){
            req.body.image=req.file.filename
        }
        
        //pour faire une instance et met les informations
        const recruiter=new recruitermodel({...req.body,code:mycode })
        const savedrecruiter =await recruiter.save()
        const mailOptions = {
            from : 'farhatyasmine161@email.com',
             to : savedrecruiter.email,
             subject: "Hello " + savedrecruiter.FirstName + " "+savedrecruiter.LastName,
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
                       <h1>Bonjour ${savedrecruiter.FirstName+ " "+savedrecruiter.LastName},</h1>
                       <p>Merci d'avoir créé un compte avec nous. Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
                       <a href="http://localhost:5000/user/verify/${savedrecruiter.code}" class="button">Vérifier mon compte</a>
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
            message:"recruiter create avec succes",
            data:recruiter
        })

        
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}
exports.getallRecruiters=async(req,res)=>{
    try{
        const recruiters=await recruitermodel.find()
        res.status(200).json({
            succes:true,
            message:"recruiter found",
            data:recruiters
        })
    }
    catch(error){
        res.status(400).json({succes:false,
        message:"failed to find recruiters ",
        data:null })

    }
}
exports.getRecruiterById=async(req,res)=>{
    try{
        const recruiterid=req.params.id
        const recruiter=await recruitermodel.findById(recruiterid)
        if (!recruiter){return res.status(404).json({
            succes:false,
            message:"recruiter not found ",
            data:null 
        })}
        res.status(200).json({succes:true,
        message:"recruiter found",
        data:recruiter})
    }
    catch(error){
        res.status(400).json({succes:false,
        message:"failed to find recruiters ",
        data:null })

    }
}
exports.updateRecruiter=async(req,res)=>{
    try{
        const recedata=await recruitermodel.findById(req.params.id)
        if (!recedata){
            return res.status(400).json({
                success:false,
                message:"recruiter not found"
            })
     

        }

        if(req.file){
            req.body.image=req.file.filename
        }
        else{

            req.body.image=recedata.image
        }
        const recruiterid=req.params.id
        const recruiter=await recruitermodel.findByIdAndUpdate(recruiterid,req.body,{new:true})
        res.status(200).json({
            succes:true,
            message:"recruiter updated ",
            data:recruiter})
    }
    catch(error){
        res.status(400).json({succes:false,
        message:"failed to update recruiter ",
        data:null })

    }
}
exports.deleterecruiter=async(req,res)=>{
    try{
        const recruiterid=req.params.id
        const recruiter=await recruitermodel.findByIdAndDelete(recruiterid)
        res.status(200).json({
            succes:true,
            message:"recruiter delete ",
            data:recruiter})
    }
    catch(error){
        res.status(400).json({succes:false,
        message:"failed to delete recruiter ",
        data:null })

    }
}