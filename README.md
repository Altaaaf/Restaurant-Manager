<p align="center">
   <b>CSCI 455 - Restaurant Manager</b>
</p>

---
<b>College: </b>New York Institute of Technology<br>
<b>Course:</b> CSCI 455 - M01/ Spring 2021<br>
<b>Adviser:</b> <a>Maherukh Akhtar</a><br>
<b>Team Leads:</b> <a href="https://github.com/Altaaaf">Altaaf Ali</a>, <a href="https://github.com/chrisyu0818">Christopher Yu</a> <br>
<b>Team Member:</b> <a href="https://github.com/Altaaaf">Altaaf Ali</a>, <a href="https://github.com/mdove01">Martin Dove</a>, <a href="https://github.com/ksanket981">Fnu Sanket</a>, <a href="https://github.com/chrisyu0818">Christopher Yu</a>, and <a href="https://github.com/sophiaz03">Sophia Zuleta</a>

---

## Introduction
During this uncertain time, many restaurant businesses are looking for different means to have contactless business with their customers. The main motive of making this website was to help the restaurant owners because in a pandemic  time restaurants were closed for a while. Because of which the restaurant owner has to close the restaurant or they have to take the loan to run their restaurant. So, the reason behind this website is to provide some extra help to restaurants by providing some extra features which will help the restaurant to provide feedback about which dish is more popular and how they can increase their revenue.

## Technologies used
* Backend - Node Js, Express
* Frontend - React Js
* Database - Mongodb

## Get Started

Prerequisites:

* Install Node.js version 14.15.1
* Install Visual Studio Code
* Clone the GitHub Repository.(https://github.com/Altaaaf/Restaurant-Manager)

> Starting backend, open a new terminal in visual studio code
```
cd client
npm start
```

> Starting Front end, open a new terminal in visual studio code
```
cd server
nodemon server.js
```

## API

<br>

### Account Management

| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| /Api/Account/Access/Login | POST | Login without any authentication or validation, used for testing |
| /Api/Account/Access/v2/Login | POST | Login request which requires the account the be email verified before authenticating |
| /Api/Account/Access/Register | POST | Register an account and save account information in database  |
| /Api/Misc/Verify | POST | Used to send an email to the account that is trying to be email verified  |
| /Api/Misc/Verify/:code | GET | Validate a users email upon accessing the link that is sent to their email  |
| /Api/Misc/ForgotPassword | POST | Sends an email to the account with a randomized new password, along with updating database with the hashed version of new password.  |
| /Api/Misc/ChangePermissions/:Email | GET | Changes an accounts permissions from manager to customer, or vice versa  |

<br>

### Menu

| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| /Api/Menu/view | GET | View entire menu sorted by, main dishes, side dishes, and drinks |
| /Api/Menu/item | POST | Insert a new item to menu  |
| /Api/Menu/item | DELETE | Delete an item from menu  |

<br>

### Inventory

| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| /Api/Menu/view | GET | View entire inventory |
| /Api/Menu/item | POST | Insert a new item to inventory or append to a existing item to update quantity or name  |
| /Api/Menu/item | DELETE | Delete an item from inventory  |

<br>

### Orders

| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| /Api/Orders/View | GET | View all existing orders, sorted by most recent to oldest |
| /Api/Orders/Create | POST | Create a new order |
| /Api/Orders/setCancelled | PUT | Set an existing order to cancelled  |
| /Api/Orders/setDelivered | PUT | Set an existing order to delivered  |

<br>

### Bookings / Reservations

| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| /Api/booking/Customer/View | GET | Used by customers to view their reservations created in last 24 hours |
| /Api/booking/View | GET | View all reservations created in last 24 hours for all customers |
| /Api/booking/booking | POST | Create a new reservation  |
| /Api/booking/booking/get | POST | View all time slots reserved in the lsat 24 hours  |

<br>

### Reports

| Endpoint | Method(s) | Description |
| :--- | :--- | :--- |
| /Api/Reports/Orders | GET | Retrieve all Orders from database and columns/headers which will be used when displaying data on frontend using Ag-Grid |
| /Api/Reports/Inventory | GET | Retrieve all Inventory from database and columns/headers which will be used when displaying data on frontend using Ag-Grid |
| /Api/Reports/Managers | GET | Retrieve all Managers from database and columns/headers which will be used when displaying data on frontend using Ag-Grid  |
| /Api/Reports/Customers | GET | Retrieve all customers from database and columns/headers which will be used when displaying data on frontend using Ag-Grid  |
| /Api/Reports/Modify/Reservations | PUT | Update an existing reservation/booking record in database   |
| /Api/Reports/Modify/Customers | PUT | Update an existing Customer record in database   |
| /Api/Reports/Modify/Managers | PUT | Update an existing Manager record in database   |
| /Api/Reports/Modify/Orders | PUT | Update an existing Orders record in database   |

<br>



