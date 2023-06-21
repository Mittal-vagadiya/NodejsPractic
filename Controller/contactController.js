const asyncHnadler = require('express-async-handler')
const User = require('../Model/contactModel');

const getAllContact = asyncHnadler(async (req, res) => {
    const user = await User.find();
    res.status(200).json(user)
})
const createContact = asyncHnadler(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        res.status(400)
        throw new Error("All Fields Are Required")
    }
    const user = await User.create({ name, email })
    res.status(200).json({ message: "User Created Successfully", data: user })
})

const getContact = asyncHnadler(async (req, res) => {
    const contact = await User.findById(req.params.id)
    if (!contact) {
        throw new Error("No User Found")
    }
    res.status(200).json(contact)
})

const updateContact = asyncHnadler(async (req, res) => {
    const contact = await User.findById(req.params.id);
    if (!contact) {
        res.status(400)
        throw new Error("No REcord Found")
    }

    if (contact.user_id.toString() !== req.user_id) {
        res.status(403)
        throw new Error("User don't have permission to update data of other user")
    }
    const UpdateContact = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(UpdateContact)
})

const deleteContact = asyncHnadler(async (req, res) => {
    const deleteUser = await User.findById(req.params.id)

    if (!deleteUser) {
        res.status(404)
        throw new Error("Contact not FOund")
    }

    if (deleteUser.user_id.toString() !== req.user_id) {
        res.status(403)
        throw new Error("User don't have permission to update data of other user")
    }
    await deleteUser.deleteOne({ _id: req.params.id })
    res.status(200).json(deleteUser)
})

module.exports = { getAllContact, createContact, updateContact, deleteContact, getContact }