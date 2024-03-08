#!/bin/bash

# Check if running as 'postgres' user
if [ "$(whoami)" != "postgres" ]; then
    echo "Switching to 'postgres' user to run script"
    sudo -u postgres bash "$0"
    exit $?
fi

# Run the SQL script with psql command
psql -f init-db.sql