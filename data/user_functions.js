const collections = require('../db/collections');
const userData = collections.user_reg_data;
const accessCodes = collections.registration_access_codes_data;
const mongodb = require("mongodb");
const bcrypt = require('bcryptjs');

let exportedMethods = {

    async createUser(eid, pass) {
        const hashP = bcrypt.hashSync(pass, 10);
        const d = new Date();
        const month = d.getMonth()+1;
        const curr_date = month+"/"+d.getDate()+"/"+d.getFullYear();
        const userCollection = await userData();
        eid = eid.toLowerCase();

        const newUser = {
            email_id: eid,
            hashed_pass: hashP,
            reg_date: curr_date
        };

        const newInsertInformation = await userCollection.insertOne(newUser);
        if (newInsertInformation.insertedCount === 0) return false;
        return newInsertInformation.insertedId;
    },

    async addAccessCode(code) {
        const accessCodeCollection = await accessCodes();

        const newCode = {
            access_codes: code,
        };

        const newInsertInformation = await accessCodeCollection.insertOne(newCode);
        if (newInsertInformation.insertedCount === 0) return false;
        return newInsertInformation.insertedId;
    },

    async userExistsCheck(email){
        email= email.toLowerCase();
        const userCollection = await userData();
        const userPresentInfo = await userCollection.findOne({ email_id: email });

        if (!userPresentInfo)
        {
           return false;
        }
        else 
        {
            return true;
        }   
    },

    async accessCodeCheck(code){
        const accessCodeCollection = await accessCodes();
        const codeMatchInfo = await accessCodeCollection.findOne({ access_codes: code });

        if (!codeMatchInfo)
        {
           return false;
        }
        else 
        {
            return true;
        }   
    },

    async getUserByID(id){   
        const userCollection = await userData();
        const userPresentInfo = await userCollection.findOne({ _id: mongodb.ObjectID(id) });
        return userPresentInfo;
    },

    async loginChecker(email, password){   
       email = email.toLowerCase();
        const userCollection = await userData();
        const userDataPresent = await userCollection.findOne({ email_id: email });
        if(!userDataPresent)
        {
            return -1;
        }
        else
        {
            if(userDataPresent.email_id===email)
            {
                let passCheck = await bcrypt.compareSync(password, userDataPresent.hashed_pass);
                    if(passCheck)
                    {
                        return userDataPresent._id;
                    }
                    else
                    {
                        return -1;
                    } 
            }
            else
            {
                return -1;
            }
        }
        
    },

};
module.exports = exportedMethods;