from typing import Optional, List
from pydantic import BaseModel, EmailStr, ConfigDict

class UserRegister(BaseModel):
    email: EmailStr
    username: str
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class RoleOut(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)

class UserOut(BaseModel):
    id: str
    email: str
    username: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    username_change_limit: int
    is_active: bool
    roles: List[RoleOut] = []

    model_config = ConfigDict(from_attributes=True)
