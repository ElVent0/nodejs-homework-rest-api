const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const requiredPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(requiredPath);
    const result = JSON.parse(data);
    return result;
  } catch (e) {
    console.log(e);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);

    if (!result) {
      return null;
    }

    return result;
  } catch (e) {
    console.log(e);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);

    if (index === -1) {
      return null;
    }

    const result = contacts.splice(index, 1);
    await fs.writeFile(requiredPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (e) {
    console.log(e);
  }
};

const addContact = async (body) => {
  try {
    const id = uuidv4();
    const contacts = await listContacts();
    const result = { id, ...body };

    contacts.push(result);
    await fs.writeFile(requiredPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (e) {
    console.log(e);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const result = await listContacts();
    const contactIndex = result.findIndex((item) => item.id === contactId);

    if (contactIndex === -1) {
      return null;
    }

    result[contactIndex] = { id: contactId, ...body };
    await fs.writeFile(requiredPath, JSON.stringify(result, null, 2));
    return result[contactIndex];
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
