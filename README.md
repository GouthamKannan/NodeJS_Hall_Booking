# API Endpoints

https://guvi-nodejs-hall-booking.herokuapp.com/create_room - To create hall (POST)
<br>
Sample request body:
<br>
{<br>
    "room_name" : "room1",<br>
    "num_seats" : 100,<br>
    "price_per_hr" : 1000,<br>
    "amenties" : [<br>
        "AC"<br>
    ]<br>
}
<br>
https://guvi-nodejs-hall-booking.herokuapp.com/book_room - To book a hall (POST)
<br>
Sample request body:
<br>
{<br>
    "room_name" : "room1",<br>
    "date" : "03-03-2022",<br>
    "start_time" : "10",<br>
    "end_time" : "17",<br>
    "customer_name" : "customer1"<br>
}
<br>
https://guvi-nodejs-hall-booking.herokuapp.com/booked_room_data - to get the list of rooms with booked data (GET)
<br>
https://guvi-nodejs-hall-booking.herokuapp.com/booked_customer_data - to get the list of customers will booked data (GET)
