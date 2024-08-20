const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const authController={
    login:async(req,res)=>{
        const { email, password } = req.body;
        console.log(email,password)
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, 'shivamdubey', { expiresIn: 3600 });
        res.cookie("token",token)
     
        res.status(200).json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
    }
    ,


    signup: async (req, res) => {
        const { email, password,name} = req.body;
        
        try {
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ msg: 'User already exists' });
    
            user = new User({ email, password,name });
    
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
    
            await user.save();
    
            const token = jwt.sign({ id: user.id }, 'shivamtest', { expiresIn: 3600 });
            res.status(200).json({ token, user: { id: user.id, email: user.email, name:user.name } });
        } catch (err) {
            res.status(500).json({ msg: 'Server error' });
        }
    }
}


module.exports = authController;
