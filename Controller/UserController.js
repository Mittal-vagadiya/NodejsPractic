const asyncHnadler = require('express-async-handler');
const bycrypt = require('bcrypt')
const NewUser = require('../Model/userModel');
const jwt = require('jsonwebtoken');

const LoginUser = asyncHnadler(async (req, res) => {
    const { email, password } = req.body;
    const user = await NewUser.findOne({ email })
    if (!user) {
        res.status(400);
        throw new Error("User Not Exist");
    }
    if (user && (await bycrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    email: user.email,
                    id: user.id,
                    username: user.name

                }
            }, process.env.TOKEN_KEY, { expiresIn: "1m" }
        )
        res.status(200).send(accessToken)
    } else {
        res.status(401);
        throw new Error("Email or Password is Incorrect");
    }
})

const RegisterUser = asyncHnadler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All Fields Are Required")
    }
    const oldUser = await NewUser.findOne({ email });
    if (oldUser) {
        res.status(400);
        throw new Error('User Already Exist. Please Login')
    }
    const hashPassword = await bycrypt.hash(password, 10);
    const createUser = await NewUser.create({
        username,
        email,
        password: hashPassword
    })

    if (createUser) {
        res.status(201).json({ _id: createUser.id, email: createUser.email })
    } else {
        res.status(400);
        throw new Error("Register the user")
    }
})

const CurrentUser = asyncHnadler(async (req, res) => {
    const contact = await User.findById(req.params.id);
    if (!contact) {
        throw new Error("No Record Found")
    }
    const UpdateContact = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(UpdateContact)
})

const Checking = asyncHnadler(async (req, res) => {
    // const user = req.user;

    // Do something with the user data

    res.json({ message: 'Private Route Accessed Successfully' });
})

module.exports = { CurrentUser, RegisterUser, LoginUser, Checking }