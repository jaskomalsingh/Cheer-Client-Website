const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const router = express.Router();
const powersRouter = express.Router();
const authRouter = express.Router();
const fs = require('fs');
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = 3001
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter);

const uri = 'mongodb+srv://3350group1:rohangobind@group1.mtclsmw.mongodb.net/?retryWrites=true&w=majority';

const dbName = '3350';
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log('error connecting to DB');
    }
}

run();
const usersCollection = client.db(dbName).collection('Users');


function validateInputSignUp(fullname, password, email, role, isNews) {

    const validRoles = ['Admin', 'User', 'Employee', 'VerifiedUser'];

    if (validRoles.includes(role)) {
        return 'Not Valid Role'
    }

    if (!fullname || !password || !email || !role || isNews == undefined) {
        return 'Please enter all required fields' + isNews;
    }
    if (typeof fullname !== 'string' || typeof password !== 'string' || typeof email !== 'string' ||
        !fullname.trim() || !password.trim() || !email.trim()) {
        return 'Invalid input';
    }
    if (fullname.length > 50 || password.length > 50 || email.length > 100) {
        return 'Input too long';
    }
    return null; // Indicating no error
}

function validateInputSignIn(email, password) {
    if(!email || !password){
        return 'Please enter all required fields';
    }
    if(typeof email !== 'string' || typeof password !== 'string'){
        return 'invalid input type';
    }
    if (email.length > 100 || password.length > 50) {
        return 'Input too long';
    }
    return null; // Indicating no error
}

async function sendVerificationEmail(email, token) {
    const link = `http://localhost:3001/api/auth/verify?token=${token}`;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '3316lab4@gmail.com',
            pass: 'tedo qnsn iwun lzqt'
        }
    });

    const mailOptions = {
        from: '3316lab4@gmail.com',
        to: email,
        subject: 'Verify your Account',
        text: `Click on this link to verify your account: ${link}`,
    };

    await transporter.sendMail(mailOptions);
}

authRouter.route('/getuser')
    .get(async (req, res) => {
        try {
            const {email} = req.body;
            const user = await usersCollection.findOne({email});
            res.json(user)
        } catch {
            console.error('Error getting user', error);
            res.status(500).send('Internal server error');
        }
        
});

authRouter.route('/getallusers')
    .get(async (req, res) => {
        try {
            // Fetch all users from the collection
            const users = await usersCollection.find({}).toArray(); // Convert the cursor to an array
            res.json(users); // Send the array of users as a response
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).send('Internal server error');
        }
});

authRouter.route('/updateuser')
    .post(async (req, res) => {
        try {
            const { email, isDeactivated, role, isNews} = req.body;  // Destructure the fields from the request body

            // Build the update object based on what's provided in the request
            const updateFields = {};
            if (isDeactivated !== undefined) updateFields.isDeactivated = isDeactivated;
            if (isNews !== undefined) updateFields.isNews
            if (role) updateFields.role = role;

            // Ensure we have at least one field to update
            if (Object.keys(updateFields).length === 0) {
                return res.status(400).send('No valid fields provided for update');
            }

            // Update the user in the database
            const result = await usersCollection.updateOne({ email }, { $set: updateFields });

            // Check if a user was found and updated
            if (result.matchedCount === 0) {
                return res.status(404).send('User not found');
            }

            res.status(200).send('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).send('Internal server error');
        }
});

authRouter.post('/signin', async (req, res) => {
    try{
        const {email, password} = req.body;

        const validationError = validateInputSignIn(email, password);
        if(validationError) {
            return res.status(400).send(validationError);
        }

        const user = await usersCollection.findOne({ email });
        if(user){
            matching = await bcrypt.compare(password, user.password);
        }
        
        if(!user || !matching){
            return res.status(401).send('incorrect email or password');
        } else if (!user.isVerified) {
            return res.status(402).send('account not verified');
        } else {
            return res.status(200).send(user);
        }

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send('Internal error');
    }
});

authRouter.post('/signup', async (req, res) => {
    try {
        const { fullname, password, email, role, isNews} = req.body;

        // Validate input
        const validationError = validateInputSignUp(fullname, password, email, role, isNews);
        if (validationError) {
            return res.status(400).send(validationError);
        }

        // Check for existing user
        const userExists = await usersCollection.findOne({ email });
        if (userExists) {
            return res.status(409).send('This email is already in use');
        }

        // Create verification token
        const token = jwt.sign({ email }, 'TESTSECRETKEY', { expiresIn: '2h' });

        // Send verification email
        await sendVerificationEmail(email, token);

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({
            fullname,
            password: hashedPassword,
            email,
            isDeactivated: false,
            isVerified: false,
            verificationToken: token,
            role: role,
            isNews: isNews
        });

        res.status(200).send('User successfully registered');
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send('Internal error');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
