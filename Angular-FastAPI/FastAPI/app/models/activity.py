from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base

class UserActivity(Base):
    __tablename__ = "user_activities"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    url = Column(String(255), nullable=True)
    data = Column(String(500), nullable=True)
    user_name = Column(String(100), nullable=True)
    ip_address = Column(String(50), nullable=True)
    activity_date = Column(DateTime, default=datetime.utcnow)


class AuctioneerRequest(Base):
    __tablename__ = "auctioneer_requests"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String(50), nullable=False)
    user_name = Column(String(100), nullable=True)
    data = Column(String(500), nullable=True)
    activity_date = Column(DateTime, default=datetime.utcnow)
