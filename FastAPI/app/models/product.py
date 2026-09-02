from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_name = Column(String(100), nullable=False, index=True)
    product_image_name = Column(String(255), nullable=True)
    description = Column(String(1000), nullable=True)
    category = Column(String(50), nullable=False, index=True)
    min_price = Column(Integer, nullable=False, default=0)
    max_price = Column(Integer, nullable=False, default=0)
    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime, nullable=False)
    latest_bid = Column(Float, default=0.0)

    user_id = Column(String(50), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    user_name = Column(String(100), nullable=True)

    user = relationship("User", back_populates="products")
    bids = relationship("Bid", back_populates="product", cascade="all, delete-orphan")
