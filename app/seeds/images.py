from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


def seed_images():
    img_1 = Image(
        listing_id=1,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/d27b15ebff2a46b6a425d7544898188c.png",
        is_display_image=True,
    )
    img_2 = Image(
        listing_id=1,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/5d00c42c67474c6280fc24ff518f2078.png",
        is_display_image=False,
    )
    img_3 = Image(
        listing_id=1,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/6412f403b1e2446fbccda3af0e28ae00.png",
        is_display_image=False,
    )
    img_4 = Image(
        listing_id=1,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/b01a7812aada49d489d472f1193361e4.png",
        is_display_image=False,
    )
    img_5 = Image(
        listing_id=2,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/b9d5fd55010b498d9be8c90a0646302c.png",
        is_display_image=True,
    )
    img_6 = Image(
        listing_id=2,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/7b39469747e34409bbd3508f9c0da6bd.png",
        is_display_image=False,
    )
    img_7 = Image(
        listing_id=2,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/5062369606dc40c6856c6409aa6c5112.png",
        is_display_image=False,
    )
    img_8 = Image(
        listing_id=2,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/2128aae6d169442eaa3566fe92b91b97.png",
        is_display_image=False,
    )
    img_9 = Image(
        listing_id=3,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/b9dc161e4b8d4f0dbe7b94fd59ce6c55.png",
        is_display_image=True,
    )
    img_10 = Image(
        listing_id=3,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/4adb2bdd07fc4977b1a431662314c3fe.png",
        is_display_image=False,
    )
    img_11 = Image(
        listing_id=3,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/68a1bf77f84248488d69dd7e8e63bd88.png",
        is_display_image=False,
    )
    img_12 = Image(
        listing_id=3,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/282587ecd595483fb2604012b7202383.png",
        is_display_image=False,
    )
    img_13 = Image(
        listing_id=3,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/5ba0332ff64e453fbab05c5eff3ae0d3.png",
        is_display_image=False,
    )
    img_14 = Image(
        listing_id=4,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/92ea8052596b494795a53495de25ab58.png",
        is_display_image=True,
    )
    img_15 = Image(
        listing_id=4,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/f26e0dbc614f4b75a1e18aca34783180.png",
        is_display_image=False,
    )
    img_16 = Image(
        listing_id=4,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/f2307e97b11947eb90261049d5c4a275.png",
        is_display_image=False,
    )
    img_17 = Image(
        listing_id=4,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/11b39f0aa00041f99662da6db4a67012.png",
        is_display_image=False,
    )
    img_18 = Image(
        listing_id=5,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/631591892f07411b960c3e39b58f83f5.png",
        is_display_image=True,
    )
    img_19 = Image(
        listing_id=5,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/e4fb7f0bfd00439faabea685b6826740.png",
        is_display_image=False,
    )
    img_20 = Image(
        listing_id=5,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/6b41e574204e4fd89c345d86e4af1cfe.png",
        is_display_image=False,
    )
    img_21 = Image(
        listing_id=5,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/2b6ab0dfb0af408da6401c3af72dbd1e.png",
        is_display_image=False,
    )
    img_22 = Image(
        listing_id=6,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/d292d8c960814e898111d52731111396.png",
        is_display_image=True,
    )
    img_23 = Image(
        listing_id=6,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/d19926412d474018a5f0b3ac385b7336.png",
        is_display_image=False,
    )
    img_24 = Image(
        listing_id=6,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/2cee8d9f927c4b14ab16a34ce256cbdd.png",
        is_display_image=False,
    )
    img_25 = Image(
        listing_id=6,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/f71612909aa54d5db0d3860bbfc8c05d.png",
        is_display_image=False,
    )
    img_26 = Image(
        listing_id=7,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/e9a4666eaa124a3dbb316af6811e8a39.png",
        is_display_image=True,
    )
    img_27 = Image(
        listing_id=7,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/bb8136b41fb44a9abc2b5785918270d3.png",
        is_display_image=False,
    )
    img_28 = Image(
        listing_id=7,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/83df44157dbe42b8a2273d9c881180fe.png",
        is_display_image=False,
    )
    img_29 = Image(
        listing_id=7,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/f3f8c3e14f97449a8aff6e46cc6f4051.png",
        is_display_image=False,
    )
    img_30 = Image(
        listing_id=8,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/6bf14224940e4aef8a2b2ed05062114f.png",
        is_display_image=True,
    )
    img_31 = Image(
        listing_id=8,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/aa77f85aa735466e9dbb6f0307a03923.png",
        is_display_image=False,
    )
    img_32 = Image(
        listing_id=8,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/c976b237eaee488b82b434e4c68755f9.png",
        is_display_image=False,
    )
    img_33 = Image(
        listing_id=8,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/7421778084524ac68b7f72bdcc78cc9d.png",
        is_display_image=False,
    )
    img_34 = Image(
        listing_id=9,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/7424ba7428bb4e9e828ab0e6d82f5df5.png",
        is_display_image=True,
    )
    img_35 = Image(
        listing_id=9,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/6ae7f979191e41db98f01183f90f95a7.png",
        is_display_image=False,
    )
    img_36 = Image(
        listing_id=9,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/cda763224dfc4762b04afbbb92c1388b.png",
        is_display_image=False,
    )
    img_37 = Image(
        listing_id=9,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/3870f03cfd4e4ac5a3216d6bcf209b2e.png",
        is_display_image=False,
    )
    img_38 = Image(
        listing_id=10,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/51704a19338b426fbd257d653d276ed8.png",
        is_display_image=True,
    )
    img_39 = Image(
        listing_id=10,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/fbf534aad3a340e8a5293aa88f19fb62.png",
        is_display_image=False,
    )
    img_40 = Image(
        listing_id=10,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/93c0b07a17604f47988128772776b5f0.png",
        is_display_image=False,
    )
    img_41 = Image(
        listing_id=10,
        owner_id=1,
        image="https://keebyimagebucketforrender.s3.amazonaws.com/498467606c5f473b812322b6ce345685.png",
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
    db.session.add(img_11)
    db.session.add(img_12)
    db.session.add(img_13)
    db.session.add(img_14)
    db.session.add(img_15)
    db.session.add(img_16)
    db.session.add(img_17)
    db.session.add(img_18)
    db.session.add(img_19)
    db.session.add(img_20)
    db.session.add(img_21)
    db.session.add(img_22)
    db.session.add(img_23)
    db.session.add(img_24)
    db.session.add(img_25)
    db.session.add(img_26)
    db.session.add(img_27)
    db.session.add(img_28)
    db.session.add(img_29)
    db.session.add(img_30)
    db.session.add(img_31)
    db.session.add(img_32)
    db.session.add(img_33)
    db.session.add(img_34)
    db.session.add(img_35)
    db.session.add(img_36)
    db.session.add(img_37)
    db.session.add(img_38)
    db.session.add(img_39)
    db.session.add(img_40)
    db.session.add(img_41)
    
    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
