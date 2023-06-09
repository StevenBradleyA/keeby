from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
demo = User(
    username='Demo', password='password', email='demo@aa.io', first_name="Demo", last_name="Lition", profile_picture="https://cdn.costumewall.com/wp-content/uploads/2017/08/hackerman.jpg", daily_driver="Keychron Q8", keycaps="Enjoy-PBT Japan", switches="Neopolitan Ice Creams" )
spongebob = User(
    username='spongebob',  password='password', email='spongebob@aa.io', first_name="Spongebob", last_name="Squarepants", profile_picture="https://www.freepnglogos.com/uploads/spongebob-png/ish-twitter-quot-redrew-favorite-scene-spongebob-9.png", daily_driver="", keycaps="", switches="") 
patrick = User(
    username='patrick',  password='password', email='patrick@aa.io', first_name="Patrick", last_name="Star", profile_picture="https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png", daily_driver="", keycaps="", switches="") 
mr_krabs = User(
    username='MrKrabs',  password='password', email='MrKrabs@aa.io', first_name="Mr", last_name="Krabs", profile_picture="https://www.pngkey.com/png/full/435-4350208_mr-krabs-png-spongebob-mr-krabs-png.png", daily_driver="", keycaps="", switches="") 
squidward = User(
    username='squidward',  password='password', email='squidward@aa.io', first_name="Squidward", last_name="Tentacles", profile_picture="https://is4-ssl.mzstatic.com/image/thumb/Video118/v4/4c/36/79/4c3679e8-4b33-ccea-ce28-c205652f845a/Jobbda093ff-fcef-4128-87fc-2b501bac952c-97368840-PreviewImage_Chocolate-Time1498404492754.png/1200x675.jpg", daily_driver="", keycaps="", switches="") 
sandy = User(
    username='sandy',  password='password', email='sandy@aa.io', first_name="Sandy", last_name="Cheeks", profile_picture="https://comicvine.gamespot.com/a/uploads/scale_small/11132/111325030/5880115-spongebob%20squarepants%20sandy%20cheeks.jpg", daily_driver="", keycaps="", switches="") 
larry = User(
    username='larry',  password='password', email='larry@aa.io', first_name="Larry", last_name="Lobster", profile_picture="https://i.pinimg.com/550x/e4/73/4e/e4734efaed57f5d9a800586dd85e43a5.jpg", daily_driver="", keycaps="", switches="") 
bubble_bass = User(
    username='bubblebass',  password='password', email='bubblebass@aa.io', first_name="Bubble", last_name="Bass", profile_picture="https://i.kym-cdn.com/entries/icons/mobile/000/026/636/Screen_Shot_2018-08-20_at_7.12.25_PM.jpg", daily_driver="", keycaps="", switches="") 
man_ray = User(
    username='manray',  password='password', email='manray@aa.io', first_name="Man", last_name="Ray", profile_picture="https://www.vhv.rs/dpng/d/482-4827175_man-ray-is-the-second-major-archenemy-of.png", daily_driver="", keycaps="", switches="") 
reggie = User(
    username='reggie',  password='password', email='reggie@aa.io', first_name="Reggie", last_name="Fish", profile_picture="https://i.ytimg.com/vi/vySI1ld25bs/hqdefault.jpg", daily_driver="", keycaps="", switches="") 


def seed_users():
    db.session.add(demo)
    db.session.add(spongebob)
    db.session.add(patrick)
    db.session.add(mr_krabs)
    db.session.add(squidward)
    db.session.add(sandy)
    db.session.add(larry)
    db.session.add(bubble_bass)
    db.session.add(man_ray)
    db.session.add(reggie)
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
