from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.product import Product
from app.models.bid import Bid
from app.models.user import User
from app.models.activity import AuctioneerRequest
from app.schemas.product import ProductOut
from app.schemas.bid import BidWithProductDetails
from app.schemas.admin import AuctioneerRequestCreate, AuctioneerRequestOut
from app.auth import get_current_user

router = APIRouter(prefix="/user-data", tags=["User Data"])

@router.get("/my-auctions", response_model=List[ProductOut])
def get_my_auctions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    products = db.query(Product).filter(
        Product.user_id == current_user.id
    ).order_by(Product.product_id.asc()).all()
    return products

@router.get("/my-bids", response_model=List[BidWithProductDetails])
def get_my_bids(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    results = db.query(Bid, Product).join(
        Product, Bid.product_id == Product.product_id
    ).filter(
        Bid.user_id == current_user.id
    ).order_by(Bid.bid_id.asc()).all()

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

@router.get("/bids-won", response_model=List[BidWithProductDetails])
def get_bids_won(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    now = datetime.utcnow()
    results = db.query(Bid, Product).join(
        Product, Bid.product_id == Product.product_id
    ).filter(
        Product.end_time <= now,
        Bid.bid_amount == Product.latest_bid,
        Bid.user_name == current_user.username
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

@router.post("/auctioneer-request", response_model=AuctioneerRequestOut, status_code=status.HTTP_201_CREATED)
def submit_auctioneer_request(
    request_in: AuctioneerRequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    req = AuctioneerRequest(
        user_id=current_user.id,
        user_name=current_user.username,
        data=request_in.data,
        activity_date=datetime.utcnow()
    )
    db.add(req)
    db.commit()
    db.refresh(req)
    return req
