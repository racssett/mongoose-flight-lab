import { Flight } from "../models/flight.js"

function newFlight (req, res) {
  res.render("flights/new", {
    title: "Add Flight",
  })
}

function create (req, res) {
  console.log("THIS IS REQ BODY", req.body);
  Flight.create(req.body)
  .then(flight => {
    console.log("THIS IS THE FLIGHT", flight);
    res.redirect(`/flights`)
  })
  .catch(err => {
    res.redirect('/flights/new')
  })
}

function index (req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/', {
      flights: flights,
      title: "All Flights",
  })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function show (req, res) {
  console.log("THIS IS THE REQUEST PARAMETER ID", req.params.id);
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      title: 'Flight Details',
      flight: flight
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function deleteFlight (req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
}