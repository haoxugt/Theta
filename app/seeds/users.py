from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    robert = User(
        username='RobertCrawley', email='roberty@downton.com', password='RobertCrawley', first_name='Robert', last_name='Crawley')
    matthew = User(
        username='MatthewCrawley', email='matthew@lawyer.org', password='MatthewCrawley', first_name='Matthew', last_name='Crawley')
    cora = User(
        username='CoraCrawley', email='cora@downton.com', password='CoraCrawley', first_name='Cora', last_name='Crawley')
    mary = User(
        username='MaryCrawley', email='mary@downton.com', password='MaryCrawley', first_name='Mary', last_name='Crawley')
    edith = User(
        username='EdithPelham', email='edith@brancaster.com', password='EdithPelham', first_name='Edith', last_name='Pelham')

    db.session.add(robert)
    db.session.add(matthew)
    db.session.add(cora)
    db.session.add(mary)
    db.session.add(edith)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
