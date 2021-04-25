#!/bin/bash

set -e

docker exec mysql mysqldump -h127.0.0.1 -uroot -proot --databases mysql_alfred > sql/initial.sql