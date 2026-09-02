from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from app.schemas.bid import BidOut

class ProductCreate(BaseModel):
    product_name: str
    description: Optional[str] = None
    category: str
    min_price: int
    max_price: int
    end_time: datetime

class ProductUpdate(BaseModel):
    product_name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    min_price: Optional[int] = None
    max_price: Optional[int] = None
    end_time: Optional[datetime] = None

class ProductOut(BaseModel):
    product_id: int
    product_name: str
    product_image_name: Optional[str] = None
    description: Optional[str] = None
    category: str
    min_price: int
    max_price: int
    start_time: datetime
    end_time: datetime
    latest_bid: float
    user_id: str
    user_name: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class ProductDetailResponse(BaseModel):
    product: ProductOut
    recommendations: List[ProductOut] = []
    bid_history: List[BidOut] = []

    model_config = ConfigDict(from_attributes=True)
