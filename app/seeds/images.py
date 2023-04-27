from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    img_1 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/9800fb01ee3a487db615f3f1ef7ae5c1.jpg",
        is_display_image=True, 
    )
    img_2 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/091ff2665a8b4fb594e79b2a5c459be0.jpg",
        is_display_image=False, 
    )
    img_3 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/10ecae8ba5aa40c89a653007382c8fbf.jpg",
        is_display_image=False, 
    )
    img_4 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/fb5edf0c73e44e11b1d4867158dfae65.jpg",
        is_display_image=False, 
    )
    img_5 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/1e05091bab764e1f8d817f4a80af5519.jpg",
        is_display_image=False, 
    )
    img_6 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/df3380e4746a490081fd7c99905f0329.jpg",
        is_display_image=False, 
    )
    img_7 = Image(
        listing_id = 2,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/4591b9e30e184af181a4677353a6a238.jpg",
        is_display_image=True, 
    )
    img_8 = Image(
        listing_id = 2,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/a8cffff6a4984391968c2abb7c69a04f.jpg",
        is_display_image=False, 
    )
    img_9 = Image(
        listing_id = 2,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/22d40edd7b92420ebd47f0d1ba6ed609.jpg",
        is_display_image=False, 
    )
    img_10 = Image(
        listing_id = 2,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/d5b35f7be7ca4b60991526a46898a800.jpg",
        is_display_image=False, 
    )

    db.session.add(img_1)
    db.session.add(img_2)
    db.session.add(img_3)
    db.session.add(img_4)
    db.session.add(img_5)
    db.session.add(img_6)
    db.session.add(img_7)
    db.session.add(img_8)
    db.session.add(img_9)
    db.session.add(img_10)


    db.session.commit()



def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
