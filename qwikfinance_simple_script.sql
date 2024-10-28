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

insert into users (username, name, password, email) values
	('testUsername', 'testName', 'testPassword', 'test@gmail.com');
    
insert into income (username, date, amount, comments) values
	('testUsername', '2024-10-27', 100.52, 'today transaction.'),
    ('testUsername', '2024-10-26', 100.52, '1 week transaction.'),
    ('testUsername', '2024-10-16', 100.52, '2 week transaction.'),
    ('testUsername', '2024-10-05', 100.52, '1 month transaction.'),
    ('testUsername', '2024-09-10', 50.32, '3 month transaction.');

select * from users;
select * from income;
select username from users;
select * from income WHERE username = 'testUsername' and date >= '2024-09-01';