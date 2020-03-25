IF (db_id(N'LibraryDB') IS NULL) BEGIN
  CREATE LOGIN RootUser WITH PASSWORD = 'Root2019';
  EXEC sp_addsrvrolemember 
    @loginame = N'RootUser', 
    @rolename = N'sysadmin'
  CREATE USER RootUser FOR LOGIN RootUser;
  CREATE DATABASE LibraryDB;
END;