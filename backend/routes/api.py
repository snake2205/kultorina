from fastapi import APIRouter
from endpoints import admin, auth, quiz

router = APIRouter()
router.include_router(admin.router)
router.include_router(auth.router)
router.include_router(quiz.router)

