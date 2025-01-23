from datetime import datetime

from sqlalchemy import JSON, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, registry, relationship

table_registry = registry()


@table_registry.mapped_as_dataclass
class User:
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    shopping_lists: Mapped[list['ShoppingList']] = relationship(
        init=False, back_populates='user', cascade='all, delete-orphan'
    )
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )


@table_registry.mapped_as_dataclass
class Template:
    __tablename__ = 'templates'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), init=False)
    name: Mapped[str]
    products: Mapped[JSON] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )


@table_registry.mapped_as_dataclass
class ShoppingList:
    __tablename__ = 'shopping_lists'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), init=False)
    user: Mapped['User'] = relationship(
        init=False, back_populates='shopping_lists'
    )
    template_id: Mapped[int] = mapped_column(
        ForeignKey('templates.id'), init=False, nullable=True
    )
    name: Mapped[str]
    total: Mapped[float]
    products: Mapped[list['Product']] = relationship(
        init=False,
        back_populates='shopping_list',
        cascade='all, delete-orphan',
    )
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )


@table_registry.mapped_as_dataclass
class Product:
    __tablename__ = 'products'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    shopping_list_id: Mapped[int] = mapped_column(
        ForeignKey('shopping_lists.id'), init=False
    )
    shopping_list: Mapped['ShoppingList'] = relationship(
        init=False, back_populates='products'
    )
    name: Mapped[str]
    quantity: Mapped[float]
    best_price: Mapped[float]
    best_offer: Mapped[float]
    brands: Mapped[list['Brand']] = relationship(
        init=False, back_populates='product', cascade='all, delete-orphan'
    )
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )


@table_registry.mapped_as_dataclass
class Brand:
    __tablename__ = 'brands'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    product_id: Mapped[int] = mapped_column(
        ForeignKey('products.id'), init=False
    )
    product: Mapped['Product'] = relationship(
        init=False, back_populates='brands'
    )
    name: Mapped[str]
    quantity: Mapped[float]
    price: Mapped[float]
    unity_cost: Mapped[float]
    predicted_cost: Mapped[float]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )
