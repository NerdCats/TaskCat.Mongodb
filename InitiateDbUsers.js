// connecting to the local database here
var conn = new Mongo('localhost:27017');
var db = conn.getDB('admin');

console.log('**DROPPING ALL USERS**');
db.dropAllUsers();

load('admin-users.js');

for (i=0; i<adminusers.length; i++)
{
    db.createUser(adminusers[i]);
}

load('users.js');

// adding read-write user
var currentDb = "taskcat";
db = conn.getDB(currentDb);

for(i=0; i<users.length; i++)
{
    for(j=0; j<users[i].roles.length; j++)
    {
        users[i].roles[j].db = currentDb;
    }

    db.createUser(users[i]);
}