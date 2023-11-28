# WAD-project

This website is a forum where a user can write some text and the admin user can delete it and it also has the ability to delete the user. 
The dashboard will contain a login page where the user can enter his username and password and if he’s not registered,he can register.
Then the user will see the forum page and if he's an admin from there he can delete users and messages and see all messages
written by all users. if he's not admin the user can see just his own messages.
There are two types of users: users and admins.
The database will contain the user_id, username, password, a Boolean value that checks if
the user is an admin and a string containing a token that every time you login
will be unique and this string will be used to associate the user that writes the
message.
The backend implements different endpoints that follow Rest API
patterns. Endpoints are split between three controllers: Auth, users and
messages controller. The controllers modify the data in the database using an
implementation of the object DbContext provided by EF Core (entity framework
core).
The front end is made using React and Axios.
The backend is made using ASP.NET
The database will use SQL Server and SSMS(Microsoft SQL Server
Management Studio)

