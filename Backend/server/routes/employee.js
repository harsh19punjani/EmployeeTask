var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var employee = mongoose.model('employeedetails');
const datetime = getDateNTime();
var ObjectId = require('mongoose').Types.ObjectId;
// get date and time
function getDateNTime() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(now.getTime() - offsetMs);
  const str = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
  return str;
}

router.post('/addemp', (req, res) => {
  console.log('addemp reached...data', req.body);
  try {
    var empData = new employee();
    empData.name = req.body.name;
    empData.notes = req.body.notes;
    empData.skills = req.body.skills;
    empData.rating = req.body.rating
    empData.createdAt = datetime;

    empData.save((err, doc) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        // generate auth token once register sucessfully
        res.status(200).json({ message: 'Saved successfully', empdetails: doc });
      }
    });
  } catch {
    return res.status(500).json({ message: "Server Error." });
  }

});

router.get('/getallEmp', (req, res) => {
  console.log('getall');
  try {
    employee.find((err, data) => {
      console.log('all data', data);
      if (!err)
       
      res.send(data);
      else
      console.log('Error while fetching data from Employee', JSON.stringify(err, undefined, 2));
    })

  } catch {
    return res.status(500).json({ message: "Server Error." });
  }
});

module.exports = router;
