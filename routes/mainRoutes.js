const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.user_function;

router.get('/', async (req, res) => {
    try {
        if (req.session.userId) {
            return res.redirect('/home');
        } else {
            return res.render('display/index',{keywords: "Rolaren LLC: Welcome!"});
        }
    } catch (e) {
        res.status(404).render('display/error', { error: e.message, link: "" });
    }
})

router.get('/home', async (req, res) => {
    try {
        let session_ID = req.session.userId;
        return res.status(200).render("display/home", {keywords: "Rolaren"});
    } catch (e) {
        res.status(404).render('display/error', { error: e.message, link: "home" });
    }
})

router.get('/registration', async (req, res) => {
    return res.render('display/registration',{keywords: "Register"});
})

router.post('/registration', async (req, res) => {
    
    try { 
        let formData = req.body;

        let emailCheck = await userData.userExistsCheck(formData.email);

        let accessCodeCheck = await userData.accessCodeCheck(formData.code);
        
        if(emailCheck==true)
        {
            return res.status(401).render('display/error', { error: "User already exist with that email!", link: "registration" });
        }
        else if(!accessCodeCheck)
        {
            return res.status(401).render('display/error', { error: "Wrong access code provided!", link: "registration" });
        }
        else
        {
            let userCreated = await userData.createUser(formData.email, formData.password);
            if (userCreated) 
            {
                let isValidUser = await userData.loginChecker(formData.email, formData.password);
                req.session.userId = isValidUser;
                req.session.AuthCookie = req.sessionID;
                return res.status(200).redirect('../login');
            } else 
            {
                res.status(401).render('display/error', { error: "New User Creation Failed! Try Again", link: "registration" });
            }
        }

    } catch (e) {
        res.status(404).render('display/error', { error: e.message, link: "registration" });
    }   
    
})


router.get('/login', async (req, res) => {
    return res.render('display/login',{keywords: "Login"});
})

router.post('/login', async (req, res) => {
    try {
        let formData = req.body;
        let isValidUser = await userData.loginChecker(formData.email, formData.password);
        if (isValidUser!=-1) {
            
            req.session.userId = isValidUser;
            req.session.AuthCookie = req.sessionID;
            return res.status(200).redirect("../home");
        } else {
            res.status(401).render('display/error', { error: "Invalid Credentials!",link: "login" });   
        }
    } catch (e) {
        res.status(404).render('display/error', { error: e.message, link: "login" });
    }
})

router.get('/logout', async (req, res) => {
   
    req.session.destroy(function() {
        res.clearCookie('AuthCookie');
        return res.redirect("/");
      });
})

router.get('/error',async (req, res) => {
    return res.render("display/error", {keywords:"Error page!"})
})

router.get('/error2',async (req, res) => {
    return res.render("display/error2", {keywords:"Error page!"})
})

module.exports = router;