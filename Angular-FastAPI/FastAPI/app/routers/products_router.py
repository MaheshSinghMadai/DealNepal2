import os
import shutil
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.config import settings
from app.database import get_db
from app.models.product import Product
from app.models.bid import Bid
from app.models.user import User
from app.schemas.product import ProductOut, ProductDetailResponse
from app.schemas.bid import BidOut
from app.auth import get_current_user, get_current_user_optional

router = APIRouter(tags=["Products"])

@router.get("/products", response_model=List[ProductOut])
def get_products(
    limit: Optional[int] = Query(None, description="Limit output records (e.g. 6 for home screen)"),
    sort_by: Optional[str] = Query(None, description="Sort order: Name, Price, EndTime"),
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    
    if sort_by == "Name":
        query = query.order_by(Product.product_name.asc())
    elif sort_by == "Price":
        query = query.order_by(Product.min_price.asc())
    elif sort_by == "EndTime":
        query = query.order_by(Product.end_time.asc())
    else:
        query = query.order_by(Product.product_id.asc())

    if limit and limit > 0:
        query = query.limit(limit)

    return query.all()

@router.get("/products/search", response_model=List[ProductOut])
def search_products(
    search_string: Optional[str] = Query("", description="Search term for product name or category"),
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    if search_string and search_string.strip():
        term = f"%{search_string.strip()}%"
        query = query.filter(
            or_(
                Product.product_name.ilike(term),
                Product.category.ilike(search_string.strip())
            )
        )
    return query.all()

@router.get("/products/{product_id}", response_model=ProductDetailResponse)
def get_product_details(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Recommendations: other products in same category or name match, take 5
    recommendations = db.query(Product).filter(
        or_(
            Product.category == product.category,
            Product.product_name.ilike(f"%{product.category}%")
        ),
        Product.product_id != product.product_id
    ).limit(5).all()

    # Bid history sorted descending by timestamp
    bid_history = db.query(Bid).filter(
        Bid.product_id == product_id
    ).order_by(Bid.timestamp.desc()).all()

    return {
        "product": product,
        "recommendations": recommendations,
        "bid_history": bid_history
    }

@router.post("/products", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_name: str = Form(...),
    description: Optional[str] = Form(None),
    category: str = Form(...),
    min_price: int = Form(...),
    max_price: int = Form(...),
    end_time: datetime = Form(...),
    product_image: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    image_filename = None
    if product_image and product_image.filename:
        ext = os.path.splitext(product_image.filename)[1]
        raw_name = os.path.splitext(product_image.filename)[0]
        timestamp_str = datetime.now().strftime("%y%m%d%H%M%S")
        image_filename = f"{raw_name}_{timestamp_str}{ext}"
        filepath = os.path.join(settings.UPLOADS_DIR, image_filename)
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(product_image.file, buffer)

    new_product = Product(
        product_name=product_name,
        description=description,
        category=category,
        min_price=min_price,
        max_price=max_price,
        start_time=datetime.utcnow(),
        end_time=end_time,
        latest_bid=float(min_price),
        product_image_name=image_filename,
        user_id=current_user.id,
        user_name=current_user.username
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.put("/products/{product_id}", response_model=ProductOut)
async def update_product(
    product_id: int,
    product_name: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    min_price: Optional[int] = Form(None),
    max_price: Optional[int] = Form(None),
    end_time: Optional[datetime] = Form(None),
    product_image: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if product_name is not None:
        product.product_name = product_name
    if description is not None:
        product.description = description
    if category is not None:
        product.category = category
    if min_price is not None:
        product.min_price = min_price
    if max_price is not None:
        product.max_price = max_price
    if end_time is not None:
        product.end_time = end_time

    if product_image and product_image.filename:
        ext = os.path.splitext(product_image.filename)[1]
        raw_name = os.path.splitext(product_image.filename)[0]
        timestamp_str = datetime.now().strftime("%y%m%d%H%M%S")
        image_filename = f"{raw_name}_{timestamp_str}{ext}"
        filepath = os.path.join(settings.UPLOADS_DIR, image_filename)
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(product_image.file, buffer)
        product.product_image_name = image_filename

    db.commit()
    db.refresh(product)
    return product

@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()
    return None

@router.get("/categories/{category_name}/products", response_model=List[ProductOut])
def get_category_products(
    category_name: str,
    sort_by: Optional[str] = Query(None, description="Sort order: Name, Price, EndTime"),
    db: Session = Depends(get_db)
):
    query = db.query(Product).filter(Product.category.ilike(category_name))

    if sort_by == "Name":
        query = query.order_by(Product.product_name.asc())
    elif sort_by == "Price":
        query = query.order_by(Product.min_price.asc())
    elif sort_by == "EndTime":
        query = query.order_by(Product.end_time.asc())
    else:
        query = query.order_by(Product.product_id.asc())

    return query.all()
