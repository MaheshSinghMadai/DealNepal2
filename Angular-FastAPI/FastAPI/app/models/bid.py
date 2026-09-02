from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Bid(Base):
    __tablename__ = "bids"

    bid_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String(50), ForeignKey("users.id", ondelete="NO ACTION"), nullable=False)
    user_name = Column(String(100), nullable=True)
    bid_amount = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    product = relationship("Product", back_populates="bids")
    user = relationship("User", back_populates="bids")
