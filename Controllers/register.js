const mysql      = require('mysql');
const pool=require('../db');
const nodemailer=require('nodemailer');
const generator=require('generate-password');


exports.login = async (req, res) => {
    try {
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            connection.query("Select * from Users where CustId= ?",req.query.cust_id,function(err,result){
                if(err) throw err;
                if(result.length>0){
                    console.log(result)
                    if (req.query.password==result[0].Pass){
                        res.status(200).json({
                            success: {
                                status: {
                                    status: 200,
                                    message: 'LOGIN SUCCESS',
                                    role_id:result[0].RoleId
                                }
                            }
                        })
                    }
                    else{
                        res.status(403).json({ error: { status: 403, message: 'INVALID PASSWORD' } })
                    }
                }
                else res.status(403).json({ error: { status: 403, message: 'User Not Found' } })
            })
            connection.release();
        })
            
            
        
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: { status: 400, message: 'BAD REQUEST' } });
    }
}


exports.checkPanCard = async (req, res) => {
    try {
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            connection.query("Select count(*) as count from Customer where PanCardNo=?",[req.query.pan_card],function(err,result){
                if(err) throw err;
                console.log(result[0].count)
                if(result[0].count>0) res.send("Pan Card already exists")
                else res.send("Pan Card doesn't exists")
            })
            connection.release();
        })
        res.status(200);
 
        
    } catch (err) {

        console.log(err)
        res.status(400);
    }
}
exports.register = async (req, res) => {
    try {
        let acc_no=Math.floor(100000000 + Math.random() * 9000000000);
        let customer_id=Math.floor(100000000 + Math.random() * 900000);

        let temp_password=generator.generate({
            length:10,
            numbers:true
        })

        let post_customer = {
            
            CustId:customer_id,
            PanCardNo : req.body.PanCardNo,
            AdharNo  : req.body.AdharNo,
            CustName : req.body.CustName,
            Address : req.body.Address,
            Email :req.body.Email,
            DOB : req.body.DOB
            // pan_image: req.body.pan_image,
            // adhaar_image:req.body.adhaar_image
        }
        let post_account={
            AccountNo: acc_no,
            CustId:customer_id,
            Balance:0
        }
        let post_users={
            CustId:customer_id,
            RoleId:2,
            Pass: temp_password

        }
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            connection.query("Insert into Customer set ?",post_customer,function(err,result){
                if(err) throw err;
                console.log(result)
            })
            connection.query("Insert into bankAccount SET ? ",post_account,function(err,result){
                if(err) throw err;
                console.log(result)
            })
            connection.query("Insert into Users SET ? ",post_users,function(err,result){
                if(err) throw err;
                console.log(result)
            })
            connection.release();
        })
        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.ethereal.email',
        //     port: 587,
        //     auth: {
        //         user: 'benton.adams45@ethereal.email',
        //         pass: 'Dz1TxPuu9nndKg1Y6T'
        //     }
        // });
        // let info = await transporter.sendMail({
        //     from: '"Bank Management" <benton.adams45@ethereal.email>', // sender address
        //     to: req.body.email, // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: `Hello , Please find your userId and temporary password . UserID- ${customer_id}, Password- ${temp_password}` // plain text body
            
        //   });
        //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.status(200).json({
            success: {
                status: {
                    status: 200,
                    message: 'Registration successful'
                }
            }
        });

 
        
    } catch (err) {

        console.log(err)
        res.status(400);
    }
}

exports.updatePassword = async (req, res) => {
    try{
        let pass=req.body.password
        let cust_id=req.body.cust_id
        pool.getConnection((err,connection)=>{
            if (err) throw err;
            
            connection.query("Update Users SET Pass=? where CustId= ?",[pass,cust_id],function(err,result){
                if(err) throw err;
                console.log(result)
                
            })
            connection.release()
        })
        res.status(200).json({
            success: {
                status: {
                    status: 200,
                    message: 'Password Updated Successfully'
                }
            }
        });




    }
    catch (err) {

        console.log(err)
        res.status(400);
    }
}


exports.viewAccounts = async (req, res) => {
    try{
        
        let cust_id=req.query.cust_id
        pool.getConnection((err,connection)=>{
            if (err) throw err;
            
            connection.query("SELECT * from bankAccount where CustId= ?",[cust_id],function(err,result){
                if(err) throw err;
                console.log(result)
                let accounts=[]
                for(let i=0;i<result.length;i++){
                    accounts.push(result[i])
                }
                console.log(accounts)

                
                 res.send(accounts)
                
            })
            connection.release()
        })
        ;




    }
    catch (err) {

        console.log(err)
        res.status(400);
    }
}

exports.viewTransanctions = async (req, res) => {
    try{
        
        let acc_no=req.query.AccountNo
        pool.getConnection((err,connection)=>{
            if (err) throw err;
            
            connection.query("SELECT * from Transactions where AccountNo= ?",[acc_no],function(err,result){
                if(err) throw err;
                console.log(result)
                let transactions=[]
                for(let i=0;i<result.length;i++){
                    transactions.push(result[i])
                }
                console.log(transactions)

                
                 res.send(transactions)
                
            })
            connection.release()
        })
        ;




    }
    catch (err) {

        console.log(err)
        res.status(400);
    }
}

exports.customerInfo = async (req, res) => {
    try{
        
        let cust_id=req.query.cust_id
        pool.getConnection((err,connection)=>{
            if (err) throw err;
            
            connection.query("SELECT * from Customer where CustId= ?",[cust_id],function(err,result){
                if(err) throw err;
                console.log(result)
                

                
                 res.send(result[0])
                
            })
            connection.release()
        })
        ;




    }
    catch (err) {

        console.log(err)
        res.status(400);
    }
}