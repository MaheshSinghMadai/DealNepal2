import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from urllib.parse import quote_plus

class Settings(BaseSettings):
    PROJECT_NAME: str = "DealNepal API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = "dealnepal_super_secret_jwt_key_2026_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    UPLOADS_DIR: str = os.path.join(BASE_DIR, "uploads")
    
    # SQL Server in Docker default connection details
    DB_SERVER: str = "localhost"
    DB_PORT: int = 1433
    DB_USER: str = "sa"
    DB_PASSWORD: str = "Zsoxfsq977#@"
    DB_NAME: str = "DealNepal"

    # Dynamic DATABASE_URL property or fallback
    DATABASE_URL: str = ""

    model_config = SettingsConfigDict(case_sensitive=True)

    def __init__(self, **values):
        super().__init__(**values)
        if not self.DATABASE_URL:
            encoded_pwd = quote_plus(self.DB_PASSWORD)
            self.DATABASE_URL = f"mssql+pymssql://{self.DB_USER}:{encoded_pwd}@{self.DB_SERVER}:{self.DB_PORT}/{self.DB_NAME}"

settings = Settings()
os.makedirs(settings.UPLOADS_DIR, exist_ok=True)
