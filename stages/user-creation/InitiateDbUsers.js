// connecting to the local database here
var conn = new Mongo('localhost:27017');
var db = conn.getDB('admin');

print('**DROPPING ALL USERS**');
db.dropAllUsers();

print('**ADDING ADMIN USERS**');
load('admin-users.js');

for (i=0; i<adminusers.length; i++)
{
    db.createUser(adminusers[i]);
}

print('**ADDING DATABASE USERS**');
load('users.js');

// adding read-write user
var currentDbName = "taskcat";
currentDbName = conn.getDB(currentDbName);
currentDbName.dropAllUsers();

for(i=0; i<users.length; i++)
{
    for(j=0; j<users[i].roles.length; j++)
    {
        users[i].roles[j].db = currentDbName;
    }
    currentDbName.createUser(users[i]);
    db.createUser(users[i]);
}
print('\n\n');
print('**USER ADDITION COMPLETED**');

