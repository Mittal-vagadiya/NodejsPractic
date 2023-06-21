const express = require('express');
const { getAllContact, updateContact, createContact, deleteContact,getContact } = require('../Controller/contactController')
const router = express.Router();

router.route('/').get(getAllContact).post(createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;