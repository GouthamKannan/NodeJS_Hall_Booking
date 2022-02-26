# API Endpoints

https://guvi-nodejs-hall-booking.herokuapp.com/create_room - To create hall
<br>
Sample data:
<br>
{
    "room_name" : "room1",
    "num_seats" : 100,
    "price_per_hr" : 1000,
    "amenties" : [
        "AC"
    ]
}
<br>
https://guvi-nodejs-hall-booking.herokuapp.com/book_room - To book a hall
<br>
Sample data:
<br>
{
    "room_name" : "room1",
    "date" : "03-03-2022",
    "start_time" : "10",
    "end_time" : "17",
    "customer_name" : "customer1"
}
<br>
https://guvi-nodejs-hall-booking.herokuapp.com/booked_room_data - to get the list of rooms with booked data
<br>
https://guvi-nodejs-hall-booking.herokuapp.com/booked_customer_data - to get the list of customers will booked data
