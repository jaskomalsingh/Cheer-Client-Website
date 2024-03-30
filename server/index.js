const express = require('express');
const app = express();

const cors = require('cors');

const authRouter = express.Router();
const fs = require('fs');
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = 3001
const corsOptions = {
    origin:  ["http://localhost:3000", "http://34.130.147.130"], // Allow only the React app to connect
    credentials: true, // Allow cookies and authentication headers
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/auth', authRouter);
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME;
const { ObjectId } = require('mongodb');
const imageBucketName = process.env.IMAGES_BUCKET_NAME;
const imageBucket = storage.bucket(imageBucketName);
const chatBucketName = process.env.CHAT_BUCKET_NAME;



// Chatroom Stuff
const http = require('http');
const socketIo = require('socket.io');
// Create an HTTP server from the Express app
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // Allow only the React app to connect
        methods: ["GET", "POST"], // Allowed request methods
        credentials: true, // Allow cookies and authentication headers
    }
});

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('getChatrooms', async ({ role }) => { // Now expecting an object with the role
        try {
            let query = {};
            
            // Example filter: if the user's role is 'user', only fetch chatrooms that include 'user' in their allowedRoles
            
            query = { allowedRoles: role };
            
            
            const chatrooms = await chatroomsCollection.find(query).toArray();
            socket.emit('chatrooms', chatrooms);
        } catch (error) {
            console.error('Error fetching chatrooms:', error);
        }
    });

    socket.on('sendMessage', async (chatroomId, message) => {
        try {
            const id = new ObjectId(chatroomId);
            // Assign a server-side timestamp to ensure consistency
            const timestamp = new Date();
            const messageWithTimestamp = { ...message, timestamp };
    
            const result = await chatroomsCollection.updateOne(
                { _id: id },
                { $push: { messages: messageWithTimestamp } }
            );


            if (result.modifiedCount === 1) {
                io.to(chatroomId).emit('newMessage', message); // Emit the new message to all users in the chatroom
            } else {
                console.log("Message update failed for chatroom:", chatroomId);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('joinRoom', (chatroomId) => {
        const id = new ObjectId(chatroomId);
        socket.join(chatroomId);
        console.log(`User joined chatroom: ${chatroomId}`);
    });

    socket.on('leaveRoom', (chatroomId) => {
        const id = new ObjectId(chatroomId);
        socket.leave(id);
        console.log(`User left chatroom: ${chatroomId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('connect_error', (error) => {
        console.error('Connection Error:', error);
    });

    socket.on('connect_timeout', (timeout) => {
        console.error('Connection Timeout:', timeout);
    });
});


const bucket = storage.bucket(bucketName);
//const imageCollection = 'photos';
//console.log(imageBucketName);

const chatbucket = storage.bucket(chatBucketName); // Ensure your environment variable is set

// Multer is used to parse multipart/form-data requests. This is required for file uploads.
const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb
  },
});

// This function uploads a file to GCS and returns the public URL of the file.
const uploadImageToGCS = async (file) => {
  const blob = chatbucket.file(Date.now() + file.originalname); // Using the current timestamp as part of the file name
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  await new Promise((resolve, reject) => {
    blobStream.on('finish', resolve);
    blobStream.on('error', reject);
    blobStream.end(file.buffer);
  });

  // Make the image publicly readable (adjust according to your security requirements)
  await blob.makePublic();

  // Return the public URL
  return `https://storage.googleapis.com/${chatbucket.name}/${blob.name}`;
};

const upload = multer({
    limits: { fileSize: 50 * 1024 * 1024 },//50 mb files
    dest: 'uploads/', fileFilter: (req, file, cb) => {
        //Accept Pdfs only
        if (!file.originalname.match(/\.(pdf)$/)) {
            return cb(new Error('Only PDF Files are allowed!'), false);
        }
        cb(null, true);

    }
});

const imageUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // For example, 5MB limit.
    fileFilter: (req, file, cb) => {

        cb(null, true);
    },
});


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

const timesheetsCollection = client.db(dbName).collection('Timesheets');

async function run() {
    try {
        // Connect to the MongoDB client
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        const db = client.db(dbName);

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

run().catch(console.dir);

const usersCollection = client.db(dbName).collection('Users');
const newslettersCollection = client.db(dbName).collection('Newsletters');
const photosCollection = client.db(dbName).collection('Photos'); 
const chatroomsCollection = client.db(dbName).collection('Chatrooms');
const eventCollection = client.db(dbName).collection('Events');

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
    if (!email || !password) {
        return 'Please enter all required fields';
    }
    if (typeof email !== 'string' || typeof password !== 'string') {
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
            const { email } = req.body;
            const user = await usersCollection.findOne({ email });
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

app.post('/api/events', async (req, res) => {
    try {
        const { title, description, date, googleFormLink } = req.body;
        const newEvent = { title, description, date, googleFormLink };

        // Insert the new event into the eventCollection
        const result = await eventCollection.insertOne(newEvent);
        console.log('Event created:', result.insertedId);
        // Respond with success message and the inserted event details
        res.status(201).json({ message: "Event created successfully", eventId: result.insertedId, event: newEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: "Error creating event", error: error.message });
    }
});


app.get('/api/events', async (req, res) => {
    try {
        // Fetch all events from the eventCollection
        const events = await eventCollection.find({}).toArray();
        console.log('Fetched events:', events);
        // Respond with the fetched events
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: "Error fetching events", error: error.message });
    }
});


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
            const { fullname, email, isDeactivated, role, isNews } = req.body;  // Destructure the fields from the request body

            // Build the update object based on what's provided in the request
            const updateFields = {};
            if (fullname) updateFields.fullname = fullname;
            if (isDeactivated !== undefined) updateFields.isDeactivated = isDeactivated;
            if (isNews !== undefined) updateFields.isNews = isNews;
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
    try {
        const { email, password } = req.body;
        lowEmail = email.toLowerCase();
        console.log(lowEmail);

        const validationError = validateInputSignIn(lowEmail, password);

        if (validationError) {

            return res.status(400).send(validationError);
        }

        const user = await usersCollection.findOne({ email: lowEmail });
        if (user) {
            matching = await bcrypt.compare(password, user.password);

        }
        if (!user || !matching) {
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
        const { fullname, password, email, role, isNews } = req.body;
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
        const token = jwt.sign({ lowEmail }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });

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

// Add this route to your authRouter to handle sending newsletters
authRouter.post('/send-newsletter', async (req, res) => {
    // Extract necessary information from the request body
    const { emailSubject, newsletterId } = req.body;

    if (!emailSubject || !newsletterId) {
        return res.status(400).send('Email subject and newsletter ID are required.');
    }

    // Convert the string ID to MongoDB ObjectId
    const _id = new ObjectId(newsletterId);

    // Retrieve the newsletter document from the collection
    const newsletter = await newslettersCollection.findOne({ _id });

    if (!newsletter) {
        return res.status(404).send('Newsletter not found.');
    }

    // Extract the PDF URL from the newsletter document
    const pdfPathOrUrl = newsletter.pdfUrl;

    // Fetch the list of subscribers' emails
    const subscribersEmails = await getNewsletterSubscribers();



    // Check if there are subscribers
    if (subscribersEmails.length === 0) {
        return res.status(404).send('No subscribers found.');
    }

    try {
        // Send the newsletter using the sendNewsletter function
        await sendNewsletter(emailSubject, pdfPathOrUrl, subscribersEmails.map(sub => sub.email));


        // Respond with a success message
        res.status(200).send('Newsletter sent successfully to all subscribers.');
    } catch (error) {
        console.error('Failed to send newsletter:', error);
        res.status(500).send('Internal server error occurred while sending the newsletter.');
    }
});




// Endpoint to create a newsletter
authRouter.post('/create-newsletter', upload.single('newsletter'), async (req, res) => {
    const { title, makePublic } = req.body;
    const file = req.file;

    if (!title || !file) {
        return res.status(400).send('Title and PDF file are required!');
    }

    // Generate file name for GCS
    const gcsFileName = `${Date.now()}-${title.replace(/ /g, '_')}.pdf`;
    const gcsFile = bucket.file(gcsFileName);

    // Set options for file upload
    const options = {
        destination: gcsFileName,
        metadata: {
            contentType: 'application/pdf',
        },
        // Convert string to boolean for public attribute
        public: makePublic === 'true',
    };

    try {
        await bucket.upload(file.path, options);
        const visibility = makePublic === 'true' ? 'public' : 'private';
        const url = makePublic === 'true' ? `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${gcsFileName}` : 'Private - Access controlled by GCS bucket settings';

        // Insert metadata into MongoDB, including GCS file name
        const newsletterData = {
            title,
            pdfUrl: url,
            visibility,
            createdAt: new Date(),
            gcsFileName, // Store the GCS file name for future reference
        };
        await newslettersCollection.insertOne(newsletterData);

        // Send the newsletter to all subscribers if makePublic is true
        if (makePublic === 'true') {
            const subscribers = await getNewsletterSubscribers();
            //await sendNewsletter(title, file.path, subscribers.map(sub => sub.email));
        }

        res.status(200).send({ message: 'Newsletter uploaded successfully', url, visibility });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).send('Failed to upload PDF');
    }
});

// Endpoint to change newsletter visibility
authRouter.patch('/change-newsletter-visibility', async (req, res) => {
    const { newsletterId, makePublic } = req.body;

    try {
        // Convert string ID to MongoDB ObjectId
        const _id = new ObjectId(newsletterId);
        const newsletter = await newslettersCollection.findOne({ _id });

        if (!newsletter) {
            return res.status(404).send('Newsletter not found.');
        }

        // Update visibility in GCS
        const gcsFile = bucket.file(newsletter.gcsFileName);
        let updatedUrl;

        if (makePublic) {
            await gcsFile.makePublic();
            updatedUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${newsletter.gcsFileName}`;
        } else {
            await gcsFile.makePrivate({ strict: true });
            updatedUrl = 'Private - Access controlled by GCS bucket settings'; // Or maintain the old private URL if you have one.
        }

        // Update visibility and URL in MongoDB
        await newslettersCollection.updateOne(
            { _id },
            { $set: { visibility: makePublic ? 'public' : 'private', pdfUrl: updatedUrl } }
        );

        // If the newsletter is made public, send it to all subscribed users
        if (makePublic && updatedUrl) {
            const subscribers = await getNewsletterSubscribers();
            await sendNewsletter(newsletter.title, updatedUrl, subscribers.map(sub => sub.email));
        }

        res.status(200).send({ message: 'Newsletter visibility updated successfully.', url: updatedUrl });
    } catch (error) {
        console.error('Error updating newsletter visibility:', error);
        res.status(500).send('Failed to update newsletter visibility');
    }
});








authRouter.get('/list-newsletters', async (req, res) => {
    // Assuming role is determined by your auth system
    const { role } = req.query; // This could be replaced with your actual authentication logic

    try {
        // Fetch all newsletters for an admin, only public ones for others
        const query = role === 'admin' ? {} : { visibility: 'public' };
        const newsletters = await newslettersCollection.find(query).toArray();

        res.status(200).json(newsletters);
    } catch (error) {
        console.error('Error fetching newsletters:', error);
        res.status(500).send('Failed to fetch newsletters');
    }
});


async function sendNewsletter(emailSubject, pdfPathOrUrl, subscribers) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '3316lab4@gmail.com',
            pass: 'tedo qnsn iwun lzqt',
        },
    });

    // Decide if the newsletter is a local file or a hosted URL
    let attachment = fs.existsSync(pdfPathOrUrl)
        ? {   // Local file
            filename: 'newsletter.pdf',
            path: pdfPathOrUrl
        }
        : {   // URL
            filename: 'newsletter.pdf',
            path: pdfPathOrUrl // Assuming this is a direct link to the file
        };

    let mailOptions = {
        from: '3316lab4@gmail.com',
        to: subscribers.join(','),
        subject: emailSubject,
        text: 'Please find the attached newsletter.',
        attachments: [attachment]
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message Sent: %s', info.messageId);
    } catch (error) {
        console.error('Failed to send newsletter:', error);
    }
}






//utility function to ger subscribers emails .implement according to the database

async function getSubscribersEmails() {
    const subscribers = await usersCollection.find({ isNews: true }).toArray();
    console.log(subscribers); // Add this line to check the subscriber list
    return subscribers.map(subscriber => subscriber.email);
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



// This function calculates the start date of the current biweekly period based on the provided date.
const getBiweeklyStartDate = (inputDate) => {
    const current = new Date(inputDate);
    current.setHours(0, 0, 0, 0); // Normalize time to start of the day

    // Assuming the biweekly period starts every other Monday (0 in getDay() is Sunday)
    let day = current.getDay();
    let diffToMonday = day === 0 ? -6 : 1 - day; // Calculate difference to last Monday
    let lastMonday = new Date(current);
    lastMonday.setDate(current.getDate() + diffToMonday); // Go back to the last Monday

    // Calculate the week number since a fixed date (e.g., start of the year or another fixed date)
    // Here, we use the start of the current year for simplicity; you might adjust based on your requirements.
    let startOfYear = new Date(Date.UTC(current.getFullYear(), 0, 1)); // Start of the year
    let weeksSinceStartOfYear = Math.ceil(((lastMonday - startOfYear) / (24 * 60 * 60 * 1000) + startOfYear.getDay() + 1) / 7);

    // Adjust lastMonday back one more week if we are currently in an "odd" biweekly period
    if (weeksSinceStartOfYear % 2 === 0) {
        lastMonday.setDate(lastMonday.getDate() - 7);
    }

    return lastMonday;
};
const getBiweeklyEndDate = (inputDate) => {
    const startDate = getBiweeklyStartDate(inputDate);
    let endDate = new Date(startDate); // Create a new Date instance to avoid mutating startDate
    endDate.setDate(startDate.getDate() + 13); // Set to the last day of the biweekly period (14 days total, including the start date)
    return endDate;
};



authRouter.post('/timesheet', async (req, res) => {
    const { email, selectedDate, fullname, startTime, endTime } = req.body;
    const startDate = new Date(`${selectedDate}T${startTime}`);
    const endDate = new Date(`${selectedDate}T${endTime}`);
    const hoursWorked = (endDate - startDate) / (1000 * 60 * 60); // Convert to hours
    const biweeklyStart = getBiweeklyStartDate(selectedDate).toISOString().split('T')[0];
    const biweeklyEnd = getBiweeklyEndDate(selectedDate).toISOString().split('T')[0]; // Implement this function based on your biweekly logic

    try {
        // Find the user's timesheet document
        const timesheet = await timesheetsCollection.findOne({ email: email });

        if (timesheet) {
            // Check if there's already an entry for this biweekly period
            let periodIndex = timesheet.biweeklyPeriods.findIndex(period =>
                period.intervalStart === biweeklyStart && period.intervalEnd === biweeklyEnd);

            if (periodIndex !== -1) {
                // Update the existing biweekly period
                let period = timesheet.biweeklyPeriods[periodIndex];
                period.totalHours += hoursWorked;
                period.logs.push({ date: selectedDate, startTime, endTime, hoursWorked });
                await timesheetsCollection.updateOne({ _id: timesheet._id }, { $set: { [`biweeklyPeriods.${periodIndex}`]: period } });
            } else {
                // Add a new biweekly period
                const newPeriod = {
                    intervalStart: biweeklyStart,
                    intervalEnd: biweeklyEnd,
                    totalHours: hoursWorked,
                    logs: [{ date: selectedDate, startTime, endTime, hoursWorked }]
                };
                await timesheetsCollection.updateOne({ _id: timesheet._id }, { $push: { biweeklyPeriods: newPeriod } });
            }
        } else {
            // Create a new timesheet document for the user
            const newTimesheet = {
                email,
                fullname,
                biweeklyPeriods: [{
                    intervalStart: biweeklyStart,
                    intervalEnd: biweeklyEnd,
                    totalHours: hoursWorked,
                    logs: [{ date: selectedDate, startTime, endTime, hoursWorked }]
                }]
            };
            await timesheetsCollection.insertOne(newTimesheet);
        }

        res.status(200).json({ message: 'Timesheet updated successfully' });
    } catch (error) {
        console.error('Error updating timesheet:', error);
        res.status(500).send('Internal server error');
    }
});

authRouter.get('/employee-hours/:email', async (req, res) => {
    const { email } = req.params; // Extract the email from the request parameters
    console.log(`Received request for employee hours with email: ${email}`); // Log the received email

    const currentDate = new Date(); // Or use req.query.date if you want to fetch for a specific date
    console.log(`Current date for querying biweekly period: ${currentDate.toISOString()}`);

    try {
        // Retrieve the employee's timesheet
        const timesheet = await timesheetsCollection.findOne({ email: email.toLowerCase() }); // Convert email to lowercase for case-insensitive comparison
        console.log(`Timesheet found for ${email}:`, timesheet); // Log the retrieved timesheet

        if (!timesheet) {
            return res.status(404).json({ message: 'Timesheet not found for the given email.' });
        }

        // Compute start and end date for the current bi-weekly period
        const biweeklyStart = getBiweeklyStartDate(currentDate).toISOString().split('T')[0];
        const biweeklyEnd = getBiweeklyEndDate(currentDate).toISOString().split('T')[0];
        console.log(`Biweekly period start: ${biweeklyStart}, end: ${biweeklyEnd}`); // Log the biweekly period dates

        // Find the bi-weekly period that matches the current dates
        const currentPeriod = timesheet.biweeklyPeriods.find(period => 
            period.intervalStart === biweeklyStart && period.intervalEnd === biweeklyEnd);
        console.log(`Current biweekly period found:`, currentPeriod); // Log the found biweekly period

        if (!currentPeriod) {
            return res.status(404).json({ message: 'No work data found for the current bi-weekly period.' });
        }

        res.json({ totalHours: currentPeriod.totalHours });
    } catch (error) {
        console.error('Error fetching employee hours:', error); // Log any errors encountered during the operation
        res.status(500).send('Internal server error');
    }
});

authRouter.get('/getemployees', async (req, res) => {
    try {
        const employees = await usersCollection.find({ role: 'employee' }).toArray(); // Assuming 'employee' is the role identifier for employees
        res.json(employees);
    } catch (error) {
        console.error('Failed to fetch employees:', error);
        res.status(500).send('Internal server error');
    }
});



authRouter.post('/upload', imageUpload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No image uploaded.');
    }

    // Create a unique file name for the image to avoid naming conflicts
    const timestamp = Date.now();
    const blob = imageBucket.file(`${timestamp}_${req.file.originalname}`);

    // Create a stream to upload the image to Google Cloud Storage
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    blobStream.on('error', (err) => {
        console.error('Blob stream error:', err);
        res.status(500).send('Error uploading to cloud storage.');
    });

    blobStream.on('finish', async () => {
        // The image is uploaded, now we save the metadata in MongoDB
        const publicUrl = `https://storage.cloud.google.com/${imageBucketName}/${blob.name}`;
        try {
            const photoDoc = {
                url: publicUrl,
                description: req.body.description || 'No description',
                uploaded: new Date(),
            };
            await photosCollection.insertOne(photoDoc);
            res.status(200).send({ message: 'Image uploaded successfully', url: publicUrl });
        } catch (error) {
            console.error('MongoDB insertion error:', error);
            res.status(500).send('Error saving image information.');
        }
    });

    // Pipe the 'file' data to the blobStream
    blobStream.end(req.file.buffer);
});



//fetch list of images
authRouter.get('/photos', async (req, res) => {
    try {
        const photos = await photosCollection.find({}).toArray();
        res.status(200).json(photos);
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).send('Error fetching photos from database.');
    }
});
authRouter.get('/getchatrooms', async (req, res) => {
    try {
        const chatroomList = await chatroomsCollection.find({}).toArray(); // Find all documents in the collection
        res.status(200).json(chatroomList); // Send the list of chatrooms back to the client
    } catch (error) {
        console.error('Failed to fetch chatrooms:', error);
        res.status(500).send('Internal Server Error');
    }
});

authRouter.post('/createChatroom', multerMiddleware.single('image'), async (req, res) => {
    try {
      const { name, allowedRoles } = req.body; // Extract name and allowedRoles from the request body
      const image = req.file; // Extract the image file from the request
  
      if (!name || !allowedRoles || !image) {
        return res.status(400).send('Missing required chatroom details');
      }
  
      // Upload image to GCS and get the URL
      const imageUrl = await uploadImageToGCS(image);
  
      // Insert the chatroom details into the MongoDB collection
      const result = await chatroomsCollection.insertOne({
        name,
        allowedRoles: JSON.parse(allowedRoles), // Assuming allowedRoles is sent as a JSON string
        image: imageUrl,
        messages: [] // Initialize messages as an empty array
      });
  
      if (!result.acknowledged) {
        throw new Error('Chatroom creation failed');
      }
  
      res.status(201).send('Chatroom created successfully');
    } catch (error) {
      console.error('Failed to create chatroom:', error);
      res.status(500).send('Internal Server Error');
    }
  });

authRouter.post('/chatrooms/:chatroomId/send', async (req, res) => {
    try {
        const { chatroomId } = req.params;
        const { content, senderEmail, name } = req.body;

        // TODO: Authentication and validation logic here

        // Retrieve the chatroom and find the highest messageId
        const chatId = new ObjectId(chatroomId);
        const chatroom = await chatroomsCollection.findOne({ _id: chatId });
        if (!chatroom) {
        
            return res.status(404).json({ message: 'Chatroom not found' });
            
        }

        
        const lastMessageId = chatroom.messages.length > 0
            ? chatroom.messages[chatroom.messages.length - 1].messageId
            : 0;
        const newMessageId = lastMessageId + 1;

        const newMessage = {
            messageId: newMessageId, // Use the newly calculated messageId
            content,
            senderEmail,
            name,
            timestamp: new Date(),
        };

        console.log(newMessage)
        const result = await chatroomsCollection.updateOne(
            { _id: chatId },
            { $push: { messages: newMessage } }
            
        );

        if (result.modifiedCount === 1) {
            console.log("yay")
            res.status(200).json({ message: 'Message sent successfully', data: newMessage });
        } else {
            console.log("nay")
            res.status(500).json({ message: 'Error updating chatroom with new message' });
        }
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Internal Server Error');
    }
});

//-------------reviews endpoints-------------

// Assuming `authRouter` is being used to group related routes,
// you can add this route to handle POST requests to "/api/auth/reviews"
authRouter.post('/reviews', async (req, res) => {
    try {
        // Destructure the relevant information from the request body
        const { rating, title, text, reviewerName } = req.body;

        // Create the review document
        const review = {
            rating,
            title,
            text,
            reviewerName,
            dateSubmitted: new Date() // Automatically set the date when the review is submitted
        };

        // Insert the review document into the "reviews" collection
        await client.db(dbName).collection('reviews').insertOne(review);

        // Send a response back to the client
        res.status(201).json({ message: 'Review submitted successfully', review });
    } catch (error) {
        console.error('Failed to submit review:', error);
        res.status(500).send('Error submitting review');
    }
});

// Assuming you are adding this inside your existing setup where 'authRouter' is used

authRouter.get('/reviews', async (req, res) => {
    try {
        const reviewsCollection = client.db(dbName).collection('reviews');
        const reviews = await reviewsCollection.find({}).toArray(); // Fetch all reviews
        res.json(reviews); // Send the reviews back to the client
    } catch (error) {
        console.error('Failed to fetch reviews:', error);
        res.status(500).send('Error fetching reviews');
    }
});






server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
