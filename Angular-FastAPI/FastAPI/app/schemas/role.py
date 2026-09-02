from typing import List, Optional
from pydantic import BaseModel, ConfigDict

class RoleCreate(BaseModel):
    role_name: str

class RoleOut(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)

class ManageUserRolesItem(BaseModel):
    role_id: int
    role_name: str
    selected: bool

class UserRoleUpdate(BaseModel):
    roles: List[ManageUserRolesItem]
