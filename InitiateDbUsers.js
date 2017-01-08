// connecting to the local database here
var conn = new Mongo('localhost:27017');
var db = conn.getDB('admin');

load('admin-users.js');

for (admin in adminusers)
{
    db.createUser(admin);
}

load('users.js');

// do for each database we want to fix add a readwrite user
var currentDb = "taskcat";
db = conn.getDB(currentDb);

for(i=0; i<users.length; i++)
{
    for(j=0; j<user[i].roles.length; j++)
    {
        user[i].roles[j].db = currentDb;
    }

    db.createUser(users[i]);
}