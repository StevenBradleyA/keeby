from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from .users import demo, spongebob, patrick, mr_krabs, sandy, squidward, larry, bubble_bass, man_ray


def seed_comments():
    comment_1 = Comment(
        owner_id = 1,
        listing_id = 1,
        content = "This is my all time favorite board. Let me know if I can answer any questions",
        liked=[spongebob],
    )
    comment_2 = Comment(
        owner_id = 3,
        listing_id = 1,
        content = "👀 this board is straight 🔥🔥🔥, could I use this underwater? 🌊🌊🌊🌊🌊 ", 
        liked=[spongebob, patrick, mr_krabs, sandy],
    )

    db.session.add(comment_1)
    db.session.add(comment_2)

    db.session.commit()



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
