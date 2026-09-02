from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, Role
from app.schemas.auth import UserOut
from app.schemas.role import RoleCreate, RoleOut, ManageUserRolesItem, UserRoleUpdate
from app.auth import require_role

router = APIRouter(tags=["Roles & Users"], dependencies=[Depends(require_role("Admin"))])

@router.get("/roles", response_model=List[RoleOut])
def list_roles(db: Session = Depends(get_db)):
    return db.query(Role).all()

@router.post("/roles", response_model=RoleOut, status_code=status.HTTP_201_CREATED)
def create_role(role_in: RoleCreate, db: Session = Depends(get_db)):
    role_name = role_in.role_name.strip()
    if not role_name:
        raise HTTPException(status_code=400, detail="Role name cannot be empty")

    existing = db.query(Role).filter(Role.name.ilike(role_name)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Role already exists")

    new_role = Role(name=role_name)
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    return new_role

@router.get("/users", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/users/{user_id}/roles", response_model=List[ManageUserRolesItem])
def get_user_roles_management(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"User with Id = {user_id} cannot be found")

    user_role_ids = {r.id for r in user.roles}
    all_roles = db.query(Role).all()

    response = []
    for r in all_roles:
        response.append(ManageUserRolesItem(
            role_id=r.id,
            role_name=r.name,
            selected=(r.id in user_role_ids)
        ))
    return response

@router.post("/users/{user_id}/roles", response_model=UserOut)
@router.put("/users/{user_id}/roles", response_model=UserOut)
def update_user_roles(user_id: str, roles_in: UserRoleUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"User with Id = {user_id} cannot be found")

    # Clear current roles
    user.roles.clear()

    # Assign selected roles
    selected_role_ids = [item.role_id for item in roles_in.roles if item.selected]
    if selected_role_ids:
        roles_to_add = db.query(Role).filter(Role.id.in_(selected_role_ids)).all()
        user.roles.extend(roles_to_add)

    db.commit()
    db.refresh(user)
    return user
