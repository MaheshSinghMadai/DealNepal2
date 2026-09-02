import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.database import engine, Base
from app.seed import seed_db
from app.routers import (
    auth_router,
    products_router,
    bids_router,
    user_data_router,
    admin_router,
    roles_router
)

# Initialize Database tables and Seed default data
Base.metadata.create_all(bind=engine)
try:
    seed_db()
except Exception as e:
    print(f"Database seed log: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="FastAPI Backend for DealNepal online auction platform",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploaded media directory
os.makedirs(settings.UPLOADS_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOADS_DIR), name="uploads")

# Include Routers under API prefix
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(products_router, prefix=settings.API_V1_STR)
app.include_router(bids_router, prefix=settings.API_V1_STR)
app.include_router(user_data_router, prefix=settings.API_V1_STR)
app.include_router(admin_router, prefix=settings.API_V1_STR)
app.include_router(roles_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "title": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs",
        "status": "Online"
    }

@app.get("/api/about")
def about():
    return {
        "message": "Your application description page.",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION
    }
