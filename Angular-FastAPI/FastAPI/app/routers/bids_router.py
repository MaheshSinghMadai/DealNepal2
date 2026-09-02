from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.product import Product
from app.models.bid import Bid
from app.models.user import User
from app.schemas.bid import BidCreate, BidOut
from app.auth import get_current_user

router = APIRouter(tags=["Bids"])

@router.post("/products/{product_id}/bids", response_model=BidOut, status_code=status.HTTP_201_CREATED)
@router.post("/bids", response_model=BidOut, status_code=status.HTTP_201_CREATED)
def submit_bid(
    bid_in: BidCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.product_id == bid_in.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if datetime.utcnow() > product.end_time:
        raise HTTPException(status_code=400, detail="Auction for this product has ended")

    if bid_in.bid_amount <= 0:
        raise HTTPException(status_code=400, detail="Bid amount must be greater than 0")

    # Create new bid
    new_bid = Bid(
        product_id=product.product_id,
        user_id=current_user.id,
        user_name=current_user.username,
        bid_amount=bid_in.bid_amount,
        timestamp=datetime.utcnow()
    )
    db.add(new_bid)

    # Update product's latest bid if higher
    if bid_in.bid_amount > product.latest_bid:
        product.latest_bid = bid_in.bid_amount

    db.commit()
    db.refresh(new_bid)
    return new_bid

@router.get("/products/{product_id}/bids", response_model=List[BidOut])
def get_product_bids(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    bids = db.query(Bid).filter(
        Bid.product_id == product_id
    ).order_by(Bid.timestamp.desc()).all()

    return bids
