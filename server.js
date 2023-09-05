const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const path = require('path');
require("dotenv").config()
require("./src/DB/connection")


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.text())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRouter = require("./src/Routes/user.routes");
const organizationRouter = require('./src/Routes/organization.routes');
const departmentRouter = require('./src/Routes/department.routes');
const adminRouter = require("./src/Routes/admin.routes");
const documentRoutes = require('./src/Routes/document.routes');

app.use(cors({
    origin: '*'
}));

app.get('/api/getuser' ,(req,res)=>{
    res.send({message:"hello saam",working:true})
})
// app.use('/api/user', userRouter);
// app.use('/api/organization', organizationRouter);
// app.use('/api/department', departmentRouter);
// app.use('/api/admin/', adminRouter);
// app.use('/api/documents', documentRoutes);


console.log(process.env.EMAIL_PASSWORD);


app.listen(8000, () => {
    console.log("listening to port 8000")
})

module.exports = app;