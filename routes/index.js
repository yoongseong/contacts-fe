const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
require('dotenv').config();
const CONTACTS_API_URL = process.env.CONTACTS_API_URL || 'http://contacts-api:8080/contacts';

router.get('/', async function (req,res) {

  try {
    let data = await fetch(CONTACTS_API_URL);
    let contacts = await data.json();
    console.log(contacts);
    if (Array.isArray(contacts) && contacts.length)
      res.render('index', {contacts: contacts, error: null, title: 'NTT AP Innovation CoE Contact List'});
    else
      res.render('index', {contacts: null, error: null, title: 'NTT AP Innovation CoE Contact List'});
  }
  catch (err) {
    console.log(err);
    res.render('index', {contacts: null, title: 'NTT AP Innovation CoE Contact List', error: 'Error: Unable to fetch data from contacts-api!'});
  }

});

module.exports = router;
