SELECT 'CREATE DATABASE network'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'network')\gexec