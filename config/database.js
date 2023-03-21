const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/jwtauth",{useNewUrlParser:true,useUnifiedTopology:true
})
.then(()=>{
    console.log("successfuly connected");
})
