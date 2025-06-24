import bcrypt from 'bcrypt';
import User from '../Schemas/user.schema.js';
import generateToken from '../Libraries/jwt.js';


export const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if(password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                message: 'User created successfully',
            });
        
    } else{
        res.status(400).json({ message: 'Invalid user data' });
    }

}  catch (error) {
        console.error('Error during register:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist. Please Register' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            token,
            fullName: user.fullName,
            email: user.email,
            message: 'Login successful',
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0});
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, email, profilePic } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, profilePic },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile updated',
      user: {
        name: updated.name,
        email: updated.email,
        profilePic: updated.profilePic,
      },
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
