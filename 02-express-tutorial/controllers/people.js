const { people } = require("../data");

const addPerson = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  people.push({ id: people.length + 1, name: req.body.name });
  res.status(201).json({ success: true, name: req.body.name });
};

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const getPersonById = (req, res) => {
  const personId = parseInt(req.params.id);
  const person = people.find((p) => p.id === personId);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ message: "Person not found" });
  }
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
};

const deletePerson = (req, res) => {
  const personId = parseInt(req.params.id);
  const personIndex = people.findIndex((p) => p.id === personId);

  if (personIndex === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Person not found" });
  }

  people.splice(personIndex, 1);
  res.status(200).json({ success: true, message: "Person deleted" });
};

module.exports = {
  addPerson,
  getPeople,
  getPersonById,
  updatePerson,
  deletePerson,
};
