import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/user.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const email = 'admin@example.com';
        const password = 'admin123'; // choose a strong password
        const name = 'Admin User';

        // Check if admin already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            console.log('Admin already exists');
            process.exit(0);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: 'admin',
        });

        await admin.save();
        console.log('Admin created successfully');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();