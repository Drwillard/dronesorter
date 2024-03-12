import {getDestinations, getDrones} from './utils/data.js'
import {default as doSanityCheck} from './utils/sanityCheck.js'
import {default as assignShipments} from './assignShipments.js'
import {default as display_results} from './utils/formatter.js'

// retrieve drone list and destinations from persistance layer
const drones = await getDrones()
const destinations = await getDestinations();

try {
    // ensure no item is too large
    doSanityCheck(drones, destinations)
} catch (e) {
    console.log(e)
    process.exit()
}

// run packing algorithms
let assignments = assignShipments(drones, destinations)

const trips = display_results(assignments)
console.log("Total trips: ", trips)