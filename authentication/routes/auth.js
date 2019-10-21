const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check for existing email
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send('Email already exists');

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      id: req.body.id
    });

    try {
      const savedUser = await user.save();
      res.send({user: user});
    } catch (err) {
      res.status(400).send(err);
    }
});

router.post("/login", async (req, res) => {
   //Validate data
   const { error } = loginValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);
 
   // Check for existing email
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email is not found.');

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');
  
  // Create and assign a token
  let expiryTime = 3600
  const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET, {
    expiresIn: expiryTime,
    algorithm: "HS256"
  })
  res.status(200).json({
    idToken: token, 
    expiresIn: expiryTime
  });});

module.exports = router;