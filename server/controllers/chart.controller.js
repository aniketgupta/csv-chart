import Chart from '../models/chart';
var chart = new Chart();
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
var _ = require('lodash');

export function saveChartData (req, res) {

  if(!req.body.chartData) {
    res.json({
      status: false, 
      error : "Invalid request"
    });
  } else {
    const data = {
      chartData: req.body.chartData
    }
    const newChart = new Chart(data);
    newChart.save((err, saved) => {
      if (saved) {
        res.json({
          status: true,
          message: 'Data saved successfully. Click on View Chart'
        });
      } else {
        console.log(err)
        res.json({
          status: false,
          error: 'Error while saving data'
        });
      }
    });
  }
}

export function getChartData (req, res) {

  Chart.find({}).exec((err, doc) => {
    if (err) {
      res.json({ 
        status: false,
        error: err.message
       });
    } else {
      res.json({ 
        status: true,
        data: doc
      });
    }
  });
}
