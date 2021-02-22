#!/usr/bin/env bash

sudo mysql --verbose -u root <<EOF

drop user 'tester'@'localhost';
drop database testdb;

create user 'tester'@'localhost' identified by '';
create database testdb;
grant all privileges on testdb.* to 'tester'@'localhost';

EOF
