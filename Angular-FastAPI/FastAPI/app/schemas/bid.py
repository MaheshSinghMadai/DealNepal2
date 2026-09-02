from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class BidCreate(BaseModel):
    product_id: int
    bid_amount: float

class BidOut(BaseModel):
    bid_id: int
    product_id: int
    user_id: str
    user_name: Optional[str] = None
    bid_amount: float
    timestamp: datetime

    model_config = ConfigDict(from_attributes=True)

class BidWithProductDetails(BaseModel):
    bids: BidOut
    product_name: Optional[str] = None
    category: Optional[str] = None
    min_price: Optional[int] = None
    max_price: Optional[int] = None
    latest_bid: Optional[float] = None

    model_config = ConfigDict(from_attributes=True)
