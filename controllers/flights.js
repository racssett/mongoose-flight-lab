import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

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
    res.redirect(`/flights/${flight._id}`)
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
  .populate('menu')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Details',
        flight: flight,
        meals: meals,
      })
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

function edit (req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      flight,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update (req, res) {
  for (let key in req.body){
    if(req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createTicket (req, res) {
  console.log(req.params.id, 'Flight ID')
  console.log(req.body, 'req.body')
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToMenu(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.menu.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addToMenu
}