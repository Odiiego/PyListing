from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, EmailStr


class Message(BaseModel):
    message: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class BrandSchema(BaseModel):
    name: str
    quantity: float
    price: float

class UpdateBrandSchema(BaseModel):
    name: str | None = None
    quantity: float | None = None
    price: float | None = None

class BrandPublic(BaseModel):
    id: int
    product_id: int
    name: str
    quantity: float
    price: Decimal
    unity_cost: Decimal
    predicted_cost: Decimal
    created_at: datetime
    updated_at: datetime


class BrandList(BaseModel):
    brands: list[BrandPublic]


class UserSchema(BaseModel):
    username: str
    email: EmailStr
    password: str

class UpdateUserSchema(BaseModel):
    username: str | None = None
    email: EmailStr | None = None
    password: str | None = None

class UserPublic(BaseModel):
    id: int
    username: str
    email: EmailStr
    model_config = ConfigDict(from_attributes=True)


class UserList(BaseModel):
    users: list[UserPublic]


class ProductSchema(BaseModel):
    name: str
    quantity: int

class UpdateProductSchema(BaseModel):
    name: str | None = None
    quantity: int | None = None

class ProductPublic(BaseModel):
    id: int
    list_id: int
    name: str
    quantity: int
    brands: list[BrandPublic]
    best_price: Decimal | None = None
    best_offer: Decimal | None = None
    created_at: datetime
    updated_at: datetime


class ProductList(BaseModel):
    products: list[ProductPublic]


class ShoppingListSchema(BaseModel):
    name: str

class UpdateShoppingListSchema(BaseModel):
    name: str | None = None

class ShoppingListPublic(BaseModel):
    id: int
    user_id: int
    name: str
    products: list[ProductPublic]
    created_at: datetime
    updated_at: datetime


class ShoppingListList(BaseModel):
    shopping_lists: list[ShoppingListPublic]


class ShoppingListThumbnail(BaseModel):
    id: int
    user_id: int
    name: str
    created_at: datetime
    updated_at: datetime


class ShoppingListThumbnailList(BaseModel):
    shopping_lists: list[ShoppingListThumbnail]
