from sqlalchemy import Column, String, Integer, Boolean, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

user_roles = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", String(50), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("role_id", Integer, ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True)
)

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(50), unique=True, index=True, nullable=False)

    users = relationship("User", secondary=user_roles, back_populates="roles")


class User(Base):
    __tablename__ = "users"

    id = Column(String(50), primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=True)
    username_change_limit = Column(Integer, default=10)
    is_active = Column(Boolean, default=True)

    roles = relationship("Role", secondary=user_roles, back_populates="users", lazy="joined")
    products = relationship("Product", back_populates="user", cascade="all, delete-orphan")
    bids = relationship("Bid", back_populates="user", cascade="all, delete-orphan")
