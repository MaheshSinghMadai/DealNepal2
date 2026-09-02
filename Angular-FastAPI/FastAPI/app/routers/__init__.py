from app.routers.auth_router import router as auth_router
from app.routers.products_router import router as products_router
from app.routers.bids_router import router as bids_router
from app.routers.user_data_router import router as user_data_router
from app.routers.admin_router import router as admin_router
from app.routers.roles_router import router as roles_router

__all__ = ["auth_router", "products_router", "bids_router", "user_data_router", "admin_router", "roles_router"]
