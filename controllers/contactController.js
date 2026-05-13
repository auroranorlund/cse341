const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const database = mongodb.getDatabase().db('project1');
  const contacts = database.collection('contacts');
  const result = await contacts.find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const database = mongodb.getDatabase().db('project1');
  const contacts = database.collection('contacts');
  const contactId = new ObjectId(req.params.id);
  const result = await contacts.find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const createContact = async (req, res) => {
  const database = mongodb.getDatabase().db('project1');
  const contacts = database.collection('contacts');
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const response = await contacts.insertOne(contact);
  if (response.acknowledged) {
    res.status(204).send();
    console.log(`The new contact was added under ID ${response.insertedId}`);
  } else {
    res.status(500).json(response.error || 'An error occured.')
  }
}

const updateContact = async (req, res) => {
  const database = mongodb.getDatabase().db('project1');
  const contacts = database.collection('contacts');
  const contactId = new ObjectId(req.params.id)
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const response = await contacts.replaceOne({ _id: contactId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
    console.log(`The contact was updated.`);
  } else {
    res.status(500).json(response.error || 'An error occured.')
  }
}

const deleteContact = async (req, res) => {
  const database = mongodb.getDatabase().db('project1');
  const contacts = database.collection('contacts');
  const contactId = new ObjectId(req.params.id)
  const response = await contacts.deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
    res.status(204).send();
    console.log(`The contact was deleted.`);
  } else {
    res.status(500).json(response.error || 'An error occured.')
  }
}

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
