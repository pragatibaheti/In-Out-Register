# In-Out-Register
Innovaccer SDE Internship Assignment
# Quick Start
## Install dependencies
npm install for both frontend and backend

## Create Database
Create a MongoDb datbase by the name of inout

## Run the Express server
npm start

## Run the React client
npm run start

## Server runs on http://localhost:3000 and client on http://localhost:3001

Create a .env file in the root folder for the apikey, apisecret for nexmo and username, password, key for sgMail


apisecret = Nexmo_Secretkey
apikey=Nexmo_Apikey
username=EmailId_FOR_sgMail
pass=Password_for_sgMail
sgkey = sgMail_key


## Technology Used
NodeJS
ReactJS
Mongoose
ExpressJS
Sgmail (for mailing)
Nexmo (for sending SMS)
node-cron (for a time-based job scheduler to send updates)
## Approach
-When a visitor visits, the visitor is required to fill up the necessary details like mail id,phone-no and expected check-out time for future updates.
-The checkin time is automatically noted and entered into the database.
-The host corresponding to the visitor is notified of the visitor details to notify him/her of a upcoming visitor
-The API used for notifying the host is Sgmail for sending mail and Nexmo for sending SMS.
-Unique id is creted corresponding to every entry of the register.
-Cronjob functions continuously every 2 minutes to send a reminder mail to the list of visitor whose expected check out ime is crossed. 
-The mail gives the visitor their corresponding unique id and gives them two options- either to update the check out time in case of more time required to finish up work Or enter the id and check out.
-The identity of the visitor as the unique id only goes through mail to that particular person and hence fake entries are prohibited.
-In case updation is made and new expected time is set, the visitor will be notified later at that time each time remind is found TRUE.
-If the visitor check out by entering the unique id, the record of in-out related to that entry is complemted and remind is set to FALSE.

## APIs
POST /api/in
To check-in a visitor

POST /api/out
To check-out a visitor

POST /api/update
To update the expected check-out time
