var express = require('express');
var router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {
 
  const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user; 
    next();
  });
}



const { Client, Lawyer, Judge, Admin, Case, Judgement,} = require("./users");
const { sendverificationcode, verifyemailclient, verifyemaillawyer,verifyemailjudge } = require("./mailer");



router.get('/', function(req, res) {
  res.render('index',{title:"Debasish"}) ;
});


function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}


//----------------------------------------register client--------------------------------------------------------

router.get("/register/client",async(req,res)=>{
  res.render("registerclient");
})


router.post("/register/client", async (req, res) => {
  try {
    
    const { name, email, password} = req.body;

    
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ error: "Email already registered" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();



   
    const newClient = new Client({
      name,
      email,
      password: hashedPassword,
      points: 0,
      level: "Bronze",
      completed: 0,
      otp
    });

   
      await newClient.save();

 

   
    await sendverificationcode(email, otp);
   
    res.render("verifyotp", { email , userType:"Client"});
 

    //res.redirect("/verify-otp");
  /*res.status(201).json({ 
  message: "Student registered successfully! Verification code sent to email.",
  redirect: "/verify-otp"
});
 */
    //res.status(201).json({ message: "Student registered successfully! Verification code sent to email." });
    
  } catch (err) {
    console.error("Registration error:", err);
    res.render("registerClient", { error: "Something went wrong during registration" });;
  }
});

router.post("/verify-otp/client", async (req, res) => {
  try {
    const{email,otp}=req.body;
    const result=await verifyemailclient(email,otp); // pass req & res directly

    if (result.success) {
    res.send("Email verified successfully! You can now login.");
  } else {
    res.render("verifyotp", {email,userType:"Client",error: result.message });
  }
  }
  catch (err) {
  console.error(err);
  res.render("verifyotp", {
    email: req.body.email,
    userType: "Client",
    error: "Internal server error"
  });
}

});



//-----------------------------------log in client----------------------------


router.get("/login/client", (req, res) => {
  res.render("login", { error: null, userType:"Client" });
});


router.post("/login/client", async (req, res) => {
  try {
    const { email, password } = req.body;

     const client = await Client.findOne({ email });
    if (!client) {
      return res.render("login", { error: "Email not registered", userType:"Client" });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password",userType:"Client" });
    }

    
 const token = jwt.sign(
      {
        id: client._id,
        role: "Client",
        name: client.name,
        
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.redirect("/profile/client");

  } catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong" });
  }
});


router.get("/profile/client",authenticateToken, (req, res) => {
  if (!req.user || req.user.role !== "Client") {
    return res.status(403).send("Access Denied");
  }

  res.render("profile", {
    name: req.user.name,
    userType: "Client"
  });
});
// ---------- LOGOUT ---------------------------------------------------


router.get("/logout/client", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/client");
});




//------------------------------------lawyer Registration-----------------------------------------------------------


router.get("/register/lawyer",async(req,res)=>{
  res.render("registerlawyer");
})



router.post("/register/lawyer", async (req, res) => {
  try {
    const { name, email, password, registration,phone } = req.body;

  
    let existingLawyer = await Lawyer.findOne({ email });
    if (existingLawyer) {
      return res.status(400).send("Lawyer already registered");
    }


  

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();


   const lawyer = new Lawyer({
      name,
      email,
      password: hashedPassword,
      barRegistrationNumber: registration,
      phone,


      otp
    });

    await lawyer.save();


     await sendverificationcode(email, otp);
   
      res.render("verifyotp", { email, userType:"Lawyer" });
 
    } catch (err) {
    console.error("Registration error:", err);
    res.render("registerlawyer", { error: "Something went wrong during registration" });;
  }
});

router.post("/verify-otp/lawyer", async (req, res) => {
  try {
    const{email,otp}=req.body;
    const result=await verifyemaillawyer(email,otp); 

    if (result.success) {
    res.send("Email verified successfully! You can now login.");
  } else {
    res.render("verifyotp", {email,userType:"Lawyer",error: result.message });
  }
  }
   catch (err) {
    res.render("verifyotp", {email: req.body.email, error:"Internal server error"});
  }
});





//-------------------------------------------lawyer login--------------------------------------------

router.get("/login/lawyer", (req, res) => {
  res.render("login", { error: null, userType:"Lawyer" });
});

router.post("/login/lawyer", async (req, res) => {
  try {
    const { email, password } = req.body;

    const lawyer = await Lawyer.findOne({ email });
    if (!lawyer) {
      return res.render("login", { error: "Email not registered", userType:"Lawyer"});
    }

    const isMatch = await bcrypt.compare(password, lawyer.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password", userType:"Lawyer"});
    }

    const token = jwt.sign(
      {
        id: lawyer._id,
        role: "Lawyer",
        name: lawyer.name,
        email: lawyer.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.redirect("/profile/lawyer");

  } catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong" });
  }
});   


// PROFILE ROUTE (Must be outside)
router.get("/profile/lawyer", authenticateToken, (req, res) => {
  if (!req.user || req.user.role !== "Lawyer") {
    return res.status(403).send("Access Denied");
  }

  res.render("profile", {
    name: req.user.name,
    userType: "Lawyer"
  });
});


// LOGOUT
router.get("/logout/lawyer", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/lawyer");
});







//------------------------------------judge Registration-------------------------------------------

router.get("/register/judge", (req, res) => {
  res.render("registerjudge");
});


router.post("/register/judge", async (req, res) => {
  try {
    const { name, email, password, courtName, barRegistrationNumber } = req.body;

    // Check if teacher already registered
    const existingJudge = await Judge.findOne({ email });
    if (existingJudge) {
      return res.render("registerjudge", { error: "Email already registered" });
    }


 
  

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save teacher
    const judge = new Judge({
      name,
      email,
      password: hashedPassword,
      courtName,
      barRegistrationNumber,
      otp
    });
   

    await judge.save();

   



      await sendverificationcode(email, otp);
   
      res.render("verifyotp", { email, userType:"Judge" });
 
    } catch (err) {
    console.error("Registration error:", err);
    res.render("registerjudge", { error: "Something went wrong during registration" });;
  }
});

router.post("/verify-otp/judge", async (req, res) => {
  try {
    const{email,otp}=req.body;
    const result=await verifyemailjudge(email,otp); 

    if (result.success) {
    res.send("Email verified successfully! You can now login.");
  } else {
    res.render("verifyotp", {email,userType:"Judge",error: result.message });
  }
  }
   catch (err) {
    res.render("verifyotp", {email: req.body.email, error:"Internal server error",userType:"Judge"});
  }
});

//----------------------------------------------login teacher------------------------------------

router.get("/login/judge", (req, res) => {
  res.render("login", { error: null, userType:"Judge" });
});


router.post("/login/judge", async (req, res) => {
  try {
    const { email, password } = req.body;

    const judge = await Judge.findOne({ email });
    if (!judge) {
      return res.render("login", { error: "Email not registered", userType:"Judge"});
    }

    const isMatch = await bcrypt.compare(password, judge.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password", userType:"Judge"});
    }


      const token = jwt.sign(
      {
        id: judge._id,
        role: "Judge",
        name: judge.name,
        email: judge.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });
    
    res.redirect("/profile/judge");

  } catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong" });
  }
});


router.get("/profile/judge", authenticateToken, (req, res) => {
  if (req.user.role !== "Judge") return res.status(403).send("Access Denied");
  res.render("profile", { 
    name: req.user.name, 
    userType: "Judge" 
  });
});

//---------------------------------logout teacher------------------

router.get("/logout/judge", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/judge");
});


//------------------------------register admin------------------

router.get("/register/admin", (req, res) => {
  res.render("registeradmin");
});



router.post("/register/admin", async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;


const existingAdmin = await Admin.findOne({ email });
if (existingAdmin) {
  return res.status(400).send("Admin already registered with this email");
}


    console.log("Entered secret:", `"${secret}"`);
    console.log("Env secret:", `"${process.env.ADMIN_SECRET}"`);

    if (secret.trim() !== process.env.ADMIN_SECRET.trim()) {
      return res.status(403).send("Unauthorized: Invalid secret key");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.send("Admin registered successfully");
  } catch (err) {
    console.error("Error registering admin:", err);
    res.status(500).send("Error registering admin");
  }
});




//-------------------------------------------login admin-------------------------------



router.get("/login/admin", (req, res) => {
  res.render("login", { error: null, userType: "admin" });
});

router.post("/login/admin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.render("login", { error: "Email not registered", userType: "admin" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password", userType: "admin" });
    }

       const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
        name: admin.name,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.redirect("/profile/admin");
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong", userType: "admin" });
  }
});


router.get("/profile/admin", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Access Denied");
  res.render("profile", { 
    name: req.user.name, 
    userType: "admin" 
  });
});


//---------------------------------logout admin------------------

router.get("/logout/admin", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/admin");
});



//------------------------------------all admins------------------------------------------------




router.get("/all-admins", authenticateToken, isAdmin, async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).send("Error fetching admins");
  }
});




// -----------------------------------------------allclients -----------------------------------
router.get("/all-clients", async (req, res) => {
  try {
    const clients = await Client.find(); // populate institution if needed
    res.json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).send("Error fetching clients");
  }
});




//-------------------------------------------------alllawyer---------------------
//--------------------------------------------------------------------------------
router.get("/all-lawyers", async (req, res) => {
  try {
    const lawyers = await Lawyer.find(); 
   
    res.json(lawyers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching lawyers");
  }
});




// ------------------ Get all teachers ------------------
router.get("/all-judges", async (req, res) => {
  try {
    
    const judges = await Judge.find(); 
    res.json(judges);
  } catch (err) {
    console.error("Error fetching judges:", err);
    res.status(500).send("Error fetching judges");
  }
});






//---------------------------------------------empty-database----------------------------
router.get("/delete-all", async (req, res) => {
  try {
    await Client.deleteMany({});
    await Lawyer.deleteMany({});
    await Judge.deleteMany({});
    await Admin.deleteMany({});

    res.send("All users (clients, lawyers, judges, admins) deleted successfully.");
  } catch (err) {
    console.error("Error deleting all users:", err);
    res.status(500).send("Error deleting all users");
  }
});


module.exports = router;
