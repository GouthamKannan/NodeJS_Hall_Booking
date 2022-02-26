const express = require("express");
require("dotenv").config({ path: ".env" });
const hallController = require("./controller/hall");

// Initialize the express server
const app = express();
app.use(express.json());

// API endpoint for testing
app.get("/", (req, res) => {
  return res.json("success");
});

// API End point for creating a new room
app.post("/create_room", async (req, res) => {
  console.log(req.body);
  const { room_name, num_seats, price_per_hr, amenties } = req.body;

  // Check if required input is found
  if (!room_name || !num_seats || !price_per_hr || !amenties) {
    return res.json({
      success: false,
      message: "Required data not found",
    });
  }
  try {
    // Create a new room
    await hallController.create_room(
      room_name,
      num_seats,
      price_per_hr,
      amenties
    );
    return res.status(200).json({
      success: true,
      message: "room created successfully",
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      message: `Error in creating the room :: ${error.message}`,
    });
  }
});

// API Endpoint to book a room
app.post("/book_room", async (req, res) => {
  const { room_name, start_time, end_time, date, customer_name } = req.body;

  // Check if required data is found
  if (!room_name || !start_time || !end_time || !date || !customer_name) {
    return res.json({
      success: false,
      message: "Required data not found",
    });
  }

  try {
    // Check if room is available in given date and time
    isFree = hallController.check_free(room_name, start_time, end_time, date);
    if (!isFree) {
      return res.status(500).json({
        success: false,
        message: "selected room not available in the given date and time",
      });
    }
    // Book a room
    await hallController.book_room(
      room_name,
      start_time,
      end_time,
      date,
      customer_name
    );
    return res.status(200).json({
      success: true,
      message: "room booked successfully",
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      message: `Error in booking room :: ${error.message}`,
    });
  }
});

// API End point to get booked details for each room
app.get("/booked_room_data", async (req, res) => {
  try {
    // Get the booking details
    data = await hallController.get_room_booked_data(true);
    return res.status(200).json({
      success: true,
      message: data,
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      message: `Error in retriving the data :: ${error.message}`,
    });
  }
});

// API End point to get booked details for each customer
app.get("/booked_customer_data", async (req, res) => {
  try {
    // Get the booking details
    data = await hallController.get_booked_customer_data(false);
    return res.status(200).json({
      success: true,
      message: data,
    });
  } catch (error) {
    // Error
    return res.status(500).json({
      success: false,
      message: `Error in retriving the data :: ${error.message}`,
    });
  }
});

// Set the port to listen
app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
