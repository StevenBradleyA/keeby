from app.models import db, Listing, environment, SCHEMA
from sqlalchemy.sql import text
# from .users import demo, alec, brad, spongebob, patrick, mr_krabs, sandy, squidward, larry, bubble_bass, man_ray


def seed_listings():
    keychron = Listing(
        owner_id=1, name='Keychron Q8 The Pefect Curves', price=200, description= "The Keychron Q8 is a compact, wireless mechanical keyboard designed for both Mac and Windows users. It features a tenkeyless layout, meaning that it doesn't have a numeric keypad, allowing for a more compact design that saves desk space. The keyboard has a sleek, minimalist design with a black aluminum frame and white LED backlighting that enhances the readability of the keys. The Q8 features high-quality Gateron mechanical switches that offer a satisfying tactile feedback and a reliable lifespan of up to 50 million keystrokes. It also comes with a choice of different switch options, including Blue, Red, Brown, and White switches, allowing users to customize their typing experience to their preferences. The keyboard is compatible with Bluetooth 5.1 and can connect up to three devices simultaneously, making it easy to switch between multiple devices with just a press of a button. It also features a USB-C port for charging, which provides up to 240 hours of battery life on a single charge, depending on usage. The Q8 also comes with various additional features, including a built-in keycap puller for easy maintenance and a variety of media and function keys that make it easy to control media playback, adjust volume, and access other useful functions quickly. Overall, the Keychron Q8 is a versatile, high-quality mechanical keyboard that combines a compact design, wireless connectivity, and customizable features to provide a comfortable and efficient typing experience.")
        
    vortex = Listing(
        owner_id=1, name='Vortex PC66 Retro-Futurism', price=140, description='The Vortex PC 66 is a compact, 66-key mechanical keyboard that is designed to provide a high-quality typing experience in a small form factor. The keyboard has a sleek, modern design with a black aluminum frame and white LED backlighting that enhances the readability of the keys. The PC 66 features high-quality Cherry MX mechanical switches that offer a satisfying tactile feedback and a reliable lifespan of up to 50 million keystrokes. It also comes with a choice of different switch options, including Red, Blue, Brown, and Clear switches, allowing users to customize their typing experience to their preferences.The keyboard is fully programmable with onboard memory, which allows users to customize the key layout and programming without the need for external software. It also features a dual-layer PCB for added durability and a detachable USB cable for easy transport. Overall, the Vortex PC 66 is a versatile, high-quality mechanical keyboard that combines a compact design, customizable features, and durable construction to provide a comfortable and efficient typing experience.')


    db.session.add(keychron)
    db.session.add(vortex)
    db.session.commit()


def undo_listings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.listings RESTART IDENTITY CASCADE;")

    else:
        db.session.execute(text("DELETE FROM listings"))


    db.session.commit()
