var express = require('express');
var router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {

  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
}




const { Client, Lawyer, Judge, Admin, Case, Judgement, } = require("./users");
const { sendverificationcode, verifyemailclient, verifyemaillawyer, verifyemailjudge } = require("./mailer");



router.get('/', function (req, res) {
  res.render('index', { title: "Debasish" });
});


function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}


//----------------------------------------register client--------------------------------------------------------

/*router.get("/register/client",async(req,res)=>{
  res.render("registerclient");
})
*/

router.post("/register/client", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save user
    const newClient = new Client({
      name,
      email,
      password: hashedPassword,
      points: 0,
      level: "Bronze",
      completed: 0,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000, // 5 min expiry
      isVerified: false
    });

    await newClient.save();

    // send email
    await sendverificationcode(email, otp);

    // send response to React
    return res.status(201).json({
      success: true,
      message: "OTP sent to email",
      email: email
    });

  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "Registration failed" });
  }
});


router.post("/verify-otp/client", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const client = await Client.findOne({ email });
    if (!client)
      return res.status(404).json({ error: "User not found" });

    if (client.isVerified)
      return res.status(400).json({ error: "Already verified" });

    if (client.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });

    if (client.otpExpiry < Date.now())
      return res.status(400).json({ error: "OTP expired" });

    client.isVerified = true;
    client.otp = null;
    client.otpExpiry = null;

    await client.save();

    res.json({ success: true, message: "Email verified successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Verification failed" });
  }
});




//-----------------------------------log in client----------------------------


router.get("/login/client", (req, res) => {
  res.render("login", { error: null, userType: "Client" });
});


router.post("/login/client", async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });
    if (!client) {
  return res.status(400).json({ error: "Email not registered" });
}


    const isMatch = await bcrypt.compare(password, client.password);
   if (!isMatch) {
  return res.status(400).json({ error: "Incorrect password" });
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

    res.json({
      success: true,
      token,
      name: client.name,
      role: "Client"
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });

  }
});


router.get("/profile/client", authenticateToken, (req, res) => {
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


router.get("/register/lawyer", async (req, res) => {
  res.render("registerlawyer");
})



router.post("/register/lawyer", async (req, res) => {
  try {
    const { name, email, password, registration } = req.body;

    let existingLawyer = await Lawyer.findOne({ email });
    if (existingLawyer) {
      return res.status(400).json({ error: "Lawyer already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const lawyer = new Lawyer({
      name,
      email,
      password: hashedPassword,
      barRegistrationNumber: registration,
    });

    await lawyer.save();

    res.status(201).json({
      message: "Lawyer registered successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

router.post("/verify-otp/lawyer", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const lawyer = await Lawyer.findOne({ email });
    if (!lawyer)
      return res.status(404).json({ error: "User not found" });

    if (lawyer.isVerified)
      return res.status(400).json({ error: "Already verified" });

    if (lawyer.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });

    if (lawyer.otpExpiry < Date.now())
      return res.status(400).json({ error: "OTP expired" });

    lawyer.isVerified = true;
    lawyer.otp = null;
    lawyer.otpExpiry = null;

    await lawyer.save();

    res.json({ success: true, message: "Email verified successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Verification failed" });
  }
});






//-------------------------------------------lawyer login--------------------------------------------

router.get("/login/lawyer", (req, res) => {
  res.render("login", { error: null, userType: "Lawyer" });
});

router.post("/login/lawyer", async (req, res) => {
  try {
    const { email, password } = req.body;

    const lawyer = await Lawyer.findOne({ email });
    if (!lawyer) {
      return res.render("login", { error: "Email not registered", userType: "Lawyer" });
    }

    const isMatch = await bcrypt.compare(password, lawyer.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password", userType: "Lawyer" });
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

    res.json({
  success: true,
  token,
  name: lawyer.name,
  role: "Lawyer"
});


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

 res.json({
  name: req.user.name,
  role: "Lawyer"
});

});


// LOGOUT
router.get("/logout/lawyer", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/lawyer");
});







//------------------------------------judge Registration-------------------------------------------

/*router.get("/register/judge", (req, res) => {
  res.render("registerjudge");
});
*/

router.post("/register/judge", async (req, res) => {
  try {
    const { name, email, password, courtName, barRegistrationNumber } = req.body;

    if (!name || !email || !password || !courtName || !barRegistrationNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingJudge = await Judge.findOne({ email });
    if (existingJudge) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

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

    res.status(201).json({
      message: "Judge registered successfully. OTP sent to email.",
      email
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//----------------------------------------------login teacher------------------------------------

/*router.get("/login/judge", (req, res) => {
  res.render("login", { error: null, userType: "Judge" });
});
*/

router.post("/login/judge", async (req, res) => {
  try {
    const { email, password } = req.body;

    const judge = await Judge.findOne({ email });
    if (!judge) {
      return res.status(404).json({ error: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, judge.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
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

    res.json({
      message: "Login successful",
      token,
      name: judge.name,
      role: "Judge"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



router.get("/profile/judge", authenticateToken, (req, res) => {
  if (req.user.role !== "Judge")
    return res.status(403).json({ error: "Access denied" });

  res.json({
    name: req.user.name,
    role: "Judge"
  });
});


//---------------------------------logout teacher------------------

router.get("/logout/judge", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/judge");
});


//------------------------------register admin------------------

/*router.get("/register/admin", (req, res) => {
  res.render("registeradmin");
});
*/


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



/*router.get("/login/admin", (req, res) => {
  res.render("login", { error: null, userType: "admin" });
});*/

router.post("/login/admin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
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

    // send JSON instead of redirect
    res.json({
      success: true,
      token,
      name: admin.name,
      role: "admin"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
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
