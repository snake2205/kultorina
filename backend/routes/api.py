from fastapi import APIRouter
from endpoints import admin, auth

router = APIRouter()
router.include_router(admin.router)
router.include_router(auth.router)