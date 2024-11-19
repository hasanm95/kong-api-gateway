#!/bin/bash

BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup PostgreSQL database
docker-compose exec -T kong-database \
    pg_dump -U kong kong > "$BACKUP_DIR/kong_db_$TIMESTAMP.sql"

# Export Kong configuration through Admin API
curl -s http://localhost:8001/services > "$BACKUP_DIR/services_$TIMESTAMP.json"
curl -s http://localhost:8001/routes > "$BACKUP_DIR/routes_$TIMESTAMP.json"
curl -s http://localhost:8001/plugins > "$BACKUP_DIR/plugins_$TIMESTAMP.json"

echo "Backup completed: $TIMESTAMP"