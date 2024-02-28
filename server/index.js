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

const uri = process.env.MONGO_URI;
const dbName = '3350';
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const newsletterSender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '3316lab4@gmail.com',
        pass: 'tedo qnsn iwun lzqt'
    },
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
const newslettersCollection = client.db(dbName).collection('Newsletters');


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

const saltRounds = 10; // or another appropriate value for bcrypt

authRouter.route('/editprofile')
  .post(async (req, res) => {
    const { email, fullname, oldp, newp, isNews } = req.body;

    try {
      const user = await usersCollection.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      let updatedFields = {
        ...(fullname && { fullname }), // Update fullname if provided
        ...(typeof isNews !== 'undefined' && { isNews }), // Update isNews if provided
      };

      if (oldp && newp) {
        const match = await bcrypt.compare(oldp, user.password);
        if (!match) {
          return res.status(401).json({ message: 'Incorrect password' });
        }

        const newPasswordHash = await bcrypt.hash(newp, saltRounds);
        updatedFields.password = newPasswordHash;
      }

      // Perform the update operation
      const updatedUser = await usersCollection.updateOne({ email }, { $set: updatedFields });

      // Check if the operation was acknowledged, even if no documents were modified
      if (updatedUser.matchedCount === 0) {
        // If no documents matched the query, it's an error
        return res.status(404).json({ message: 'User not found' });
      } else {
        // Operation was acknowledged, return success message
        res.json({ message: 'Profile updated successfully' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Internal server error' });
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
        lowEmail = email.toLowerCase();
        console.log(lowEmail);

        const validationError = validateInputSignIn(lowEmail, password);
        if(validationError) {
            return res.status(400).send(validationError);
        }

        const user = await usersCollection.findOne({ email });
        if(user){
         
            matching = await bcrypt.compare(password, user.password);
            
        }
        
        if(!user || !matching){
            
            return res.status(401).send('incorrect email or password');
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
        lowEmail = email.toLowerCase();

        // Validate input
        const validationError = validateInputSignUp(fullname, password, lowEmail, role, isNews);
        if (validationError) {
            return res.status(400).send(validationError);
        }

        // Check for existing user
        const userExists = await usersCollection.findOne({ lowEmail });
        if (userExists) {
            return res.status(409).send('This email is already in use');
        }

        // Create verification token
        const token = jwt.sign({ lowEmail },process.env.JWT_SECRET_KEY , { expiresIn: '2h' });

        // Send verification email
        await sendVerificationEmail(lowEmail, token);

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({
            fullname,
            password: hashedPassword,
            email: lowEmail,
            isDeactivated: false,            
            role: role,
            isNews: isNews
        });

        res.status(200).send('User successfully registered');
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send('Internal error');
    }
});

authRouter.route('/verify')
    .get(async (req, res) => {
        try {
            const { token } = req.query;
            if (!token) {
                return res.status(400).send('Token mising');
            }

            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    return res.status(401).send('Invalid token');
                    
                }   
                console.log(decoded)
                const email = "hi"

                const result = await usersCollection.updateOne(
                    { email },
                    { $set: { isVerified: true } }
                );
                if (result.matchedCount === 1 && result.modifiedCount === 1) {
                    return res.status(200).send('Account successfully verified');
                }
                else {
                    return res.status(400).send('Invalid token or user already verified');
                }
            });
        } catch (error) {
            console.log(error)
            res.status(500).send('Internal error');
        }
    });

// Assuming authRouter is your express router for authentication related paths
authRouter.get('/newsletter-subscribers', async (req, res) => {
    try {
        const subscribers = await getNewsletterSubscribers();
        res.json(subscribers);
    } catch (error) {
        console.error('Error fetching newsletter subscribers:', error);
        res.status(500).send('Internal server error');
    }
});

async function getNewsletterSubscribers() {
    return await usersCollection.find({ isNews: true }, { projection: { fullname: 1, email: 1 } }).toArray();
}
//creating a newsletter
authRouter.post('/create-newsletter', async(req, res)=>{
    try {
        const { title, content} = req.body;
        //basic validation
        if(!title || !content){
            return res.status(400).send('Title and content both are required!');
        }
        //Insert the newsletter into cthe collection
        await newslettersCollection.insertOne({title, content, createdAt: new Date() });

        //send the newsletter to all subscribers
        await sendNewsletterToSubscribers(title, content);
        res.status(201).send('Newsletter created and sent to all subscribers successfully!');

    }catch (error){
        console.error('Error creating or sending newsletter: ', error);
        res.status(500).send('Internal server error');
    }
});

//fetching all newsletters
authRouter.get('/get-newsletters', async(req, res) => {
    try{
        const { title } = req.query;//retrieve the title from query parameters
        //if  a title is provided, fetch the specific newsletter including its content 
        //otheriwse fetch all the newsletters without their content to simplify the list
        if (title){
            const newsletter = await newslettersCollection.findOne({ title: title });
        if (!newsletter) {
            return res.status(404).send('Newsletter not found');
        }
        return res.status(200).json(newsletter);
    } else {
        // If no title is provided, fetch all newsletters without their content
        const newsletters = await newslettersCollection.find({}, { projection: { content: 0 } }).toArray();
        return res.status(200).json(newsletters);
    }
} catch (error) {
    console.error('Error fetching newsletters:', error);
    res.status(500).send('Internal server error');
}
});

async function sendNewsletterToSubscribers(title, content) {
    try{
//fetch subscribed users
        const subscribers = await getNewsletterSubscribers();

        //email sending promises
        const sendEmailPromises = subscribers.map(subscriber => {
            return newsletterSender.sendMail({
                from:  '3316lab4@gmail.com',
                to: subscriber.email,
                subject: title, 
                html: content,//assuming the content is HTML formatted
            });
        });
        //wait for all emails to be sent
        await Promise.all(sendEmailPromises);

        console.log('Newsletter sent to all subscribers sucessfully.');

    } catch (error) {
        console.error('Failed to send newsletter:', error);
    }
}

authRouter.patch('/toggle-newsletter-subscription', async (req, res) => {
    try {
        const { email, isNews } = req.body; // Expecting the user's email and the new isNews status

        if (!email || isNews === undefined) {
            return res.status(400).send('Email and isNews status are required');
        }

        const result = await usersCollection.updateOne(
            { email: email },
            { $set: { isNews: isNews } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(`Newsletter subscription status updated to ${isNews} for ${email}`);
    } catch (error) {
        console.error('Error updating newsletter subscription status:', error);
        res.status(500).send('Internal server error');
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
