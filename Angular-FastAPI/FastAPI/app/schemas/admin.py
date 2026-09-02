from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from app.schemas.product import ProductOut
from app.schemas.bid import BidOut

class DashboardViewModel(BaseModel):
    # Categorical bid Count
    Art_BidCount: int = 0
    Coins_BidCount: int = 0
    Furniture_BidCount: int = 0
    Jewellery_BidCount: int = 0

    # Entity Count
    Products_count: int = 0
    Bids_count: int = 0
    Users_count: int = 0
    UserActivity_count: int = 0

    # Category counts
    Coins_count: int = 0
    Art_count: int = 0
    Jewellery_count: int = 0
    Furniture_count: int = 0

    # Monthly Activity Count
    Jan_ActivityCount: int = 0
    Feb_ActivityCount: int = 0
    Mar_ActivityCount: int = 0
    Apr_ActivityCount: int = 0
    Jun_ActivityCount: int = 0

class UserActivityOut(BaseModel):
    id: int
    url: Optional[str] = None
    data: Optional[str] = None
    user_name: Optional[str] = None
    ip_address: Optional[str] = None
    activity_date: datetime

    model_config = ConfigDict(from_attributes=True)

class AuctioneerRequestCreate(BaseModel):
    data: Optional[str] = None

class AuctioneerRequestOut(BaseModel):
    id: int
    user_id: str
    user_name: Optional[str] = None
    data: Optional[str] = None
    activity_date: datetime

    model_config = ConfigDict(from_attributes=True)
