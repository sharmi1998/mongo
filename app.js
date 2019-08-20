const Express=require('express')
var bodyParser=require('body-parser')
var app=new Express()
var request=require('request')
const Mongoose=require('mongoose');
const viewall="http://localhost:3000/viewall"
app.set('view engine','ejs')
app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
const StudentModel=Mongoose.model("studentdetails",{
    name:String,
    roll:String,
    adm:String,
    clg:String
});
Mongoose.connect("mongodb://localhost:27017/collegedb")
app.get('/',(req,res)=>{
    res.render('home')
    
})
app.post('/read',(req,res)=>{
    
    console.log('test')
    console.log(req.body)
    var student=new StudentModel(req.body);
    var result=student.save((error)=>{
        if(error){
            throw error;
          res.send(error)
        }
        else{
res.send("user created");
        }
    })

    res.send(result)
})
app.get('/viewall',(req,res)=>{

result=StudentModel.find((error,data)=>{
    if(error){
        throw error;
    }
    else{
        res.send(data);
    }
})

})
app.get('/view',(req,res)=>{
request(viewall,(error,response,body)=>{
    var data=JSON.parse(body);
    console.log(data)
    res.render('view',{'data':data})
})
    //res.render('view',)



})
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running")
})
