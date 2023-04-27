from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    img_1 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/5.JPG",
        is_display_image=True, 
    )
    img_2 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/1.JPG",
        is_display_image=False, 
    )
    img_3 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/10.JPG",
        is_display_image=False, 
    )
    img_4 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/11.JPG",
        is_display_image=False, 
    )
    img_5 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/12.JPG",
        is_display_image=False, 
    )
    img_6 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/13.JPG",
        is_display_image=False, 
    )
    img_7 = Image(
        listing_id = 2,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/C0236T01.JPG",
        is_display_image=True, 
    )
    img_8 = Image(
        listing_id = 2,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/C0227T01.JPG",
        is_display_image=False, 
    )
    img_9 = Image(
        listing_id = 2,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/C0230T01.JPG",
        is_display_image=False, 
    )
    img_10 = Image(
        listing_id = 2,
        owner_id = 1,
        image="https://keebyimagebucketforrender.s3.us-west-2.amazonaws.com/C0237T01.JPG",
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
