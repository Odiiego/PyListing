from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class Message(BaseModel):
    message: str


class UserSchema(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    id: int
    username: str
    email: EmailStr
    model_config = ConfigDict(from_attributes=True)


class UserList(BaseModel):
    users: list[UserPublic]


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class ShoppingListSchema(BaseModel):
    name: str


class ShoppingListPublic(BaseModel):
    id: int
    user_id: int
    name: str
    created_at: datetime
    updated_at: datetime


class ShoppingListList(BaseModel):
    shopping_lists: list[ShoppingListPublic]
