import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: String,
  airport: {
    type: String,
    default:"DEN",
  },
  flightNo: Number,
  departs: {
    type: Date,
  }, 
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