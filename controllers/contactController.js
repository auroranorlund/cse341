const { MongoClient, ServerApiVersion } = require('mongodb');
const env = require("dotenv").config()
const uri = process.env.URI
const client = new MongoClient(uri);
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const database = client.db('project1');
    const contacts = database.collection('contacts')
    const result = await contacts.find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
}

const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const database = client.db('project1');
    const contacts = database.collection('contacts')
    const result = await contacts.find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
}

module.exports = {getAll, getSingle}