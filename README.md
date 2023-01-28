# Smart-Contracts-API

Clone the repository, then cd into the root folder and run npm install. 
You can run the server locally by using npm start, or mpn run dev(uses nodemon to monitor changes live).

Not all the routes are accessible through the browser.
The routes that are accessible through the browser are: 
GET http://localhost:3333/ => simple welcome message
GET http://localhost:3333/contracts => fetches all the items from the database
GET http://localhost:3333/contracts/:id => fetches only the contract that matches the id
                                       (contract is fetched using the uuid format id 03600f1e-d201-4804-a4a5-0f4269252876 
                                       and not the auto generated unique nedb id "_id":"igVs4mZePuAkyvOE")
The rest of the routes can be accessed using talend or bash or postman or thunderclient...

POST http://localhost:3333/contracts => include in the post request the item you desire to insert in the database
DELETE http://localhost:3333/contracts/:id => after the last / include the item id you want to remove from database
PATCH http://localhost:3333/contracts/:id => after the last / include the item id you want to update, and in the request body include the props that you want to update
