use qwik_finance;

drop table users;
create table users (
	username varchar(20),
    name varchar(20),
    password varchar(20),
    email varchar(20)
);

drop table income;
create table income (
	username varchar(20),
	date Date,
    amount double,
    comments varchar(100)
);

drop table payment;
create table payment (
	username varchar(20),
	date Date,
    amount double,
    comments varchar(100)
);

drop table budget;
create table budget (
	username varchar(20),
    label varchar(15),
    amount double
);

drop table savings;
create table savings (
	username varchar(20),
    dateID double,
    title varchar(20),
    amount int,
    progress double,
    percentage double,
    state varchar(12)
);

drop table totals;
create table totals (
	username varchar(20),
    income double,
    payment double
);

insert into users (username, name, password, email) values
	('testUsername', 'testName', 'testPassword', 'test@gmail.com');
    
insert into income (username, date, amount, comments) values
	('testUsername', '2024-11-21', 100.52, 'today transaction.'),
    ('testUsername', '2024-11-20', 100.52, '1 week transaction.'),
    ('testUsername', '2024-11-10', 100.52, '2 week transaction.'),
    ('testUsername', '2024-10-25', 100.52, '1 month transaction.'),
	('diffUser', '2024-11-21', 100.52, 'today transaction.'),
    ('diffUser', '2024-10-25', 100.52, '1 month transaction.'),
    ('testUsername', '2024-09-10', 50.32, '3 month transaction.');
    
insert into payment (username, date, amount, comments) values
	('testUsername', '2024-11-21', 0.99, 'today transaction.'),
    ('testUsername', '2024-11-20', 154.52, '1 week transaction.'),
    ('testUsername', '2024-11-10', 91.45, '2 week transaction.'),
    ('testUsername', '2024-10-25', 11000.45, '1 month transaction.'),
    ('testUsername', '2024-09-10', 53.3, '3 month transaction.'),
	('otherUsername', '2024-11-21', 0.99, 'other today transaction.'),
    ('otherUsername', '2024-10-26', 154.52, 'other 1 week transaction.'),
    ('otherUsername', '2024-10-16', 91.45, 'other 2 week transaction.'),
    ('otherUsername', '2024-10-05', 11000.45, 'other 1 month transaction.');
    
insert into budget (username, label, amount) values
	('testUsername', 'Housing', 30),
    ('testUsername', 'Food', 17),
    ('testUsername', 'Utilites', 9),
    ('testUsername', 'Savings', 18),
    ('testUsername', 'Transportation', 8),
	('testUsername', 'new stuff', 10),
	('testUsername', 'Recreation', 18);
    
insert into savings (username, dateID, title, amount, progress, percentage, state) values
	('testUsername', 2394875349872, 'New Bike', 300, 0, 0, 'in progress'),
    ('testUsername', 2348576345852, 'Computer', 1200, 0, 0, 'in progress'),
    ('testUsername', 2348576293483, 'Bag', 120, 0, 0, 'in progress'),
    ('diffUsername', 2348576293405, 'diffGoal', 120, 0, 0, 'in progress'),
	('testUsername', 2348576293484, 'Bag', 120, 120, 100, 'completed');
    
insert into totals (username, income, payment) values
	('testUsername', 3000, 1750),
	('diffUser', 1000, 750),
	('jaron', 5, 75);

select * from users;
select * from income;
select * from payment;
select * from budget;
select * from savings;
select * from totals;
select username from users;
select * from income WHERE username = 'testUsername' and date >= '2024-09-01';