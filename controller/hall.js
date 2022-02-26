const { client: mongoClient } = require("../model/mongodb");

// Connect to MongoDB database
const dbConnection = mongoClient.db("hall_booking");

// Initialize the collections for the database
const hallCollection = dbConnection.collection("hall_details");
const bookedDetailsCollection = dbConnection.collection("booked_details");

/**
 * Add a new room to the Database
 * @param {String} room_name    Name of the new room
 * @param {Number} num_seats    Number of seats available in the new room
 * @param {Number} price_per_hr Price per hour for the new room
 * @param {Array} amneties      Amneties available in the new room
 * @returns                     The _id of the added data
 */
const create_room = async (room_name, num_seats, price_per_hr, amneties) => {
  const response = await hallCollection.insertOne({
    room_name,
    num_seats,
    price_per_hr,
    amneties,
  });
  return response;
};

/**
 * Check if a particular room is availble in the given date and time
 * @param {String} room_name  Name of the room to check
 * @param {Number} start_time Start hour to check
 * @param {Number} end_time   End hour to check
 * @param {String} date       Date to check
 * @returns                   true if room is available
 */
const check_free = async (room_name, start_time, end_time, date) => {
  // Get the booking details for room name and date
  const response = await bookedDetailsCollection.find({
    room_name: room_name,
    date: date,
  });
  if (response.length > 0) {
    // Check if room is availble in the given time range
    response.foreach((res) => {
      if (
        res.start_time < start_time < res.end_time ||
        res.start_time < end_time < res.end_time
      )
        return false;
    });
  }
  return true;
};

/**
 * Book a particular room in given date and time
 * @param {String} room_name     Name of the room to book
 * @param {Number} start_time    Start hour to book room
 * @param {Number} end_time      End hour to book room
 * @param {String} date          Date to book room
 * @param {String} customer_name Customer name to book room
 * @returns
 */
const book_room = async (
  room_name,
  start_time,
  end_time,
  date,
  customer_name
) => {
  const response = await bookedDetailsCollection.insertOne({
    room_name,
    start_time,
    end_time,
    date,
    customer_name,
    booked_status: "booked",
  });
  return response;
};

/**
 * Get booked details for each room from the database
 * @returns The booking details for each room
 */
const get_room_booked_data = async () => {
  // Get the booking details from the DB collection
  const response = await bookedDetailsCollection.find().toArray();
  let rooms = {};

  // Rearrange the data for each room
  response.forEach((res) => {
    let key = res.room_name;
    if (key in rooms) {
      rooms[key].push(res);
    } else {
      rooms[key] = [];
      rooms[key].push(res);
    }
  });
  return rooms;
};

/**
 * Get the booking details for each customer from database
 * @returns Booking details for each customer
 */
const get_booked_customer_data = async () => {
  // Get the booking details from DB collection
  const response = await bookedDetailsCollection.find().toArray();
  let customers = {};

  // Rearrange the data for each customer
  response.forEach((res) => {
    let key = res.customer_name;
    if (key in customers) {
      customers[key].push(res);
    } else {
      customers[key] = [];
      customers[key].push(res);
    }
  });
  return customers;
};

module.exports = {
  create_room,
  book_room,
  check_free,
  get_room_booked_data,
  get_booked_customer_data,
};
