#!/bin/bash

set -e

cd /src

python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput
gunicorn internets_of_thing_project.wsgi:application -w 3 -b :8000