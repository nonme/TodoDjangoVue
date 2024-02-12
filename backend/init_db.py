import time
import psycopg2
from psycopg2 import OperationalError
import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.core.management import call_command
from django.db.utils import ProgrammingError

def init_db():
    retries = 15
    while retries:
        try:
            conn = psycopg2.connect(
                dbname=os.getenv('POSTGRES_DB'),
                user=os.getenv('POSTGRES_USER'),
                password=os.getenv('POSTGRES_PASSWORD'),
                host='db'
            )
            conn.close()
            print("PostgreSQL is ready.")

            print("Applying migrations...")
            call_command('migrate', '--noinput')

            from tasks.models import Task

            try:
                if not Task.objects.exists():
                    print("Loading fixtures...")
                    call_command('loaddata', 'tasks/fixtures/create_user_tasks.json')
                else:
                    print("Data already exists. Skipping fixtures loading.")
            except ProgrammingError as e:
                print(f"Error checking Task data, might be running before migrations: {str(e)}")
            break
        except OperationalError as e:
            retries -= 1
            print(f"PostgreSQL is not ready, waiting... {str(e)}")
            time.sleep(5)
        except ImportError as e:
            print(f"ImportError: {str(e)}, make sure Django is setup correctly.")
            sys.exit(1)
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            sys.exit(1)

if __name__ == '__main__':
    init_db()
