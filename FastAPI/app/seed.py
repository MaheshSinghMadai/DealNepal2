import uuid
from datetime import datetime, timedelta
from app.database import SessionLocal, engine, Base
from app.models.user import User, Role
from app.models.product import Product
from app.models.bid import Bid
from app.models.activity import UserActivity
from app.auth import get_password_hash

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Seed Roles
        roles_to_create = ["Admin", "User", "Auctioneer"]
        role_objs = {}
        for role_name in roles_to_create:
            r = db.query(Role).filter(Role.name == role_name).first()
            if not r:
                r = Role(name=role_name)
                db.add(r)
                db.commit()
                db.refresh(r)
            role_objs[role_name] = r

        # 2. Seed Admin User
        admin_user = db.query(User).filter(User.username == "admin").first()
        if not admin_user:
            admin_user = User(
                id=str(uuid.uuid4()),
                email="admin@dealnepal.com",
                username="admin",
                hashed_password=get_password_hash("Admin@123"),
                first_name="System",
                last_name="Admin",
                is_active=True
            )
            admin_user.roles.append(role_objs["Admin"])
            admin_user.roles.append(role_objs["User"])
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)

        # 3. Seed Normal User
        test_user = db.query(User).filter(User.username == "john_doe").first()
        if not test_user:
            test_user = User(
                id=str(uuid.uuid4()),
                email="john@example.com",
                username="john_doe",
                hashed_password=get_password_hash("Password@123"),
                first_name="John",
                last_name="Doe",
                is_active=True
            )
            test_user.roles.append(role_objs["User"])
            db.add(test_user)
            db.commit()
            db.refresh(test_user)

        # 4. Seed Products
        if db.query(Product).count() == 0:
            p1 = Product(
                product_name="Ancient Nepalese Antique Coin",
                description="Rare copper coin from the Malla dynasty era.",
                category="Coins",
                min_price=1000,
                max_price=10000,
                start_time=datetime.utcnow() - timedelta(days=2),
                end_time=datetime.utcnow() + timedelta(days=5),
                latest_bid=2500.0,
                user_id=admin_user.id,
                user_name=admin_user.username
            )
            p2 = Product(
                product_name="Traditional Mithila Painting",
                description="Authentic hand-painted artwork depicting festival themes.",
                category="Art",
                min_price=5000,
                max_price=30000,
                start_time=datetime.utcnow() - timedelta(days=1),
                end_time=datetime.utcnow() + timedelta(days=7),
                latest_bid=7500.0,
                user_id=admin_user.id,
                user_name=admin_user.username
            )
            p3 = Product(
                product_name="Handcrafted Carved Wooden Window",
                description="Intricately carved Peacock window made of premium Teak.",
                category="Furniture",
                min_price=15000,
                max_price=75000,
                start_time=datetime.utcnow() - timedelta(days=3),
                end_time=datetime.utcnow() + timedelta(days=4),
                latest_bid=18000.0,
                user_id=test_user.id,
                user_name=test_user.username
            )
            p4 = Product(
                product_name="Antique Gold Plated Necklace",
                description="Traditional Nepalese wedding ornament with filigree design.",
                category="Jewellery",
                min_price=20000,
                max_price=100000,
                start_time=datetime.utcnow() - timedelta(days=5),
                end_time=datetime.utcnow() + timedelta(days=2),
                latest_bid=22000.0,
                user_id=admin_user.id,
                user_name=admin_user.username
            )
            db.add_all([p1, p2, p3, p4])
            db.commit()

            # Seed sample bids
            b1 = Bid(
                product_id=p1.product_id,
                user_id=test_user.id,
                user_name=test_user.username,
                bid_amount=2500.0,
                timestamp=datetime.utcnow() - timedelta(hours=3)
            )
            b2 = Bid(
                product_id=p2.product_id,
                user_id=test_user.id,
                user_name=test_user.username,
                bid_amount=7500.0,
                timestamp=datetime.utcnow() - timedelta(hours=1)
            )
            db.add_all([b1, b2])
            db.commit()

        # 5. Seed Activity Logs
        if db.query(UserActivity).count() == 0:
            act1 = UserActivity(
                url="/api/products",
                data="GET all products",
                user_name="admin",
                ip_address="127.0.0.1",
                activity_date=datetime.utcnow()
            )
            db.add(act1)
            db.commit()

        print("Database seeded successfully!")
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
