from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import extract
from app.database import get_db
from app.models.product import Product
from app.models.bid import Bid
from app.models.user import User
from app.models.activity import UserActivity
from app.schemas.admin import DashboardViewModel, UserActivityOut
from app.schemas.product import ProductOut
from app.schemas.bid import BidWithProductDetails
from app.auth import require_role

router = APIRouter(prefix="/admin", tags=["Admin"], dependencies=[Depends(require_role("Admin"))])

@router.get("/dashboard", response_model=DashboardViewModel)
def get_dashboard(db: Session = Depends(get_db)):
    # Joined product-bid query for categorical bid count
    joined_bids = db.query(Product.category).join(Bid, Product.product_id == Bid.product_id).all()
    categories_bidded = [cat for (cat,) in joined_bids]

    art_bid_count = categories_bidded.count("Art")
    coins_bid_count = categories_bidded.count("Coins")
    furniture_bid_count = categories_bidded.count("Furniture")
    jewellery_bid_count = categories_bidded.count("Jewellery")

    products_count = db.query(Product).count()
    bids_count = db.query(Bid).count()
    users_count = db.query(User).count()
    user_activity_count = db.query(UserActivity).count()

    coins_count = db.query(Product).filter(Product.category == "Coins").count()
    art_count = db.query(Product).filter(Product.category == "Art").count()
    jewellery_count = db.query(Product).filter(Product.category == "Jewellery").count()
    furniture_count = db.query(Product).filter(Product.category == "Furniture").count()

    # Monthly user activity counts (Months 1-5)
    jan_act = db.query(UserActivity).filter(extract('month', UserActivity.activity_date) == 1).count()
    feb_act = db.query(UserActivity).filter(extract('month', UserActivity.activity_date) == 2).count()
    mar_act = db.query(UserActivity).filter(extract('month', UserActivity.activity_date) == 3).count()
    apr_act = db.query(UserActivity).filter(extract('month', UserActivity.activity_date) == 4).count()
    jun_act = db.query(UserActivity).filter(extract('month', UserActivity.activity_date) == 5).count()

    return DashboardViewModel(
        Art_BidCount=art_bid_count,
        Coins_BidCount=coins_bid_count,
        Furniture_BidCount=furniture_bid_count,
        Jewellery_BidCount=jewellery_bid_count,

        Products_count=products_count,
        Bids_count=bids_count,
        Users_count=users_count,
        UserActivity_count=user_activity_count,

        Coins_count=coins_count,
        Art_count=art_count,
        Jewellery_count=jewellery_count,
        Furniture_count=furniture_count,

        Jan_ActivityCount=jan_act,
        Feb_ActivityCount=feb_act,
        Mar_ActivityCount=mar_act,
        Apr_ActivityCount=apr_act,
        Jun_ActivityCount=jun_act,
    )

@router.get("/products", response_model=List[ProductOut])
def get_admin_products(db: Session = Depends(get_db)):
    return db.query(Product).order_by(Product.product_id.asc()).all()

@router.get("/bids", response_model=List[BidWithProductDetails])
def get_admin_bids(db: Session = Depends(get_db)):
    results = db.query(Bid, Product).join(
        Product, Bid.product_id == Product.product_id
    ).all()

    items = []
    for bid, product in results:
        items.append({
            "bids": bid,
            "product_name": product.product_name,
            "category": product.category,
            "min_price": product.min_price,
            "max_price": product.max_price,
            "latest_bid": product.latest_bid
        })
    return items

@router.get("/user-activities", response_model=List[UserActivityOut])
def get_user_activities(db: Session = Depends(get_db)):
    return db.query(UserActivity).order_by(UserActivity.id.asc()).all()

@router.get("/cr")
def admin_cr():
    return {"message": "Bid Success"}
