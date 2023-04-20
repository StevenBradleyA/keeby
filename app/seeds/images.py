from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    img_1 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://preview.redd.it/keychron-q8-with-badseed-tactiles-and-pbtfans-twist-keycaps-v0-gx7s2s86qsz91.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=e054a930325c17c4e1db1d40b44e0de4fab603f8",
        is_display_image=True, 
    )
    img_2 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://preview.redd.it/keychron-q8-with-badseed-tactiles-and-pbtfans-twist-keycaps-v0-6m5wwr86qsz91.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=b751e29d986974680538284d47d124de8f07f6a8",
        is_display_image=False, 
    )
    img_3 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://preview.redd.it/keychron-q8-with-badseed-tactiles-and-pbtfans-twist-keycaps-v0-4loucs86qsz91.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=b8073b8e8fca7f4264fb58505c2d7c2b8a4e6adb",
        is_display_image=False, 
    )
    img_4 = Image(
        listing_id = 1,
        owner_id = 1,
        image="https://preview.redd.it/keychron-q8-with-badseed-tactiles-and-pbtfans-twist-keycaps-v0-ztp1xr86qsz91.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=5a3e8540517f627a9b8c9e487041f9c152c7cad3",
        is_display_image=False, 
    )
    img_5 = Image(
        listing_id = 2,
        owner_id = 1,
        image="https://i.redd.it/25q1dmigyiaa1.jpg",
        is_display_image=True, 
    )


    db.session.add(img_1)
    db.session.add(img_2)
    db.session.add(img_3)
    db.session.add(img_4)
    db.session.add(img_5)

    db.session.commit()



def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
