const express = require("express");
const uuid = require("uuid");
//const { default: regex } = require("uuid/dist/regex");
const router = express.Router();
const members = require("../../Members");

// gets all members

/*app.get('/api/members', (req, res) => {
    res.json(members);
});*/
//router.get('/api/members', (req, res) => res.json(members));
router.get("/", (req, res) => res.json(members));

//get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
  //res.send(req.params.id);
});

// Create member
router.post("/", (req, res) => {
  //res.send(req.body); this is from the body we hard code
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);
  res.json(members); //getting json file on the page
  //res.redirect('/'); //getting back to the original page with files added
});

// update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
  //res.send(req.params.id);
});

// Delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: `Member with id: ${req.params.id} deleted`,
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
  //res.send(req.params.id);
});

module.exports = router;
