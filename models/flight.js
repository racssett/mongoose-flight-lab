import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 0,
  }
})

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['Southwest', 'American', 'United', 'Delta']
  },
  airport: {
    type: String,
    default:"DEN",
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
  }, 
  tickets: [ticketSchema]
},
  {
    timestamps: true
})



// function oneYearFromNow(){
//   const today = new Date()
//   console.log("Today", today.getFullYear()+1)
//   today.setFullYear(today.getFullYear()+1)
//   console.log(today);
//   return today
// }
// oneYearFromNow()

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}