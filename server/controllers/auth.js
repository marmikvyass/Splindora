import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import transporter from '../config/nodemailer.js'

export const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({
            success: false,
            message: 'User details missing'
        })
    }
    try {
        //check if user exist
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'User already exist, please try login' })
        }
        //creates hashed bcrypt password for more privacy
        const hashedPassword = await bcrypt.hash(password, 10)
        //registers new user data
        const signInUser = new User({ email, name, password: hashedPassword })
        await signInUser.save()
        //creates token id for new registration created that token is valid for 7 days
        const token = jwt.sign({ id: signInUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        //sending welcome email to user
        // const sendEmail = {
        //     from: process.env.SENDER_EMAIL,
        //     to: email,
        //     subject: 'Welcome to Authify',
        //     text: `Welcome to Authify, Your account has been created with this email id: ${email}`
        // }

        return res.json({
            success: true,
            message: 'registration successfully'
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const userLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({
            success: false,
            message: 'Email and password are required to continue'
        })
    }
    try {
        const loginUser = await User.findOne({email})
        if(!loginUser){
            return res.json({
                success:false,
                message:'Invalid user data, user not found.'
            })
        }

        const isMatch = await bcrypt.compare(password, loginUser.password)
        if(!isMatch){
            return res.json({
                success:false,
                message:'Invalid password'
            })
        }
        const token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({
            success:true,
            message:'Login successful'
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const userLogout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            // maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true, message: 'You have been logged out' })
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const isAuthenticated = async (req,res)=>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.json({
                success:false,
                message:'Unauthorized'
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)


        return res.json({
            success:true,
            message:'You are already logged in'
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}