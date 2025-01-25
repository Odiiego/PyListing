from datetime import datetime

from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, registry, relationship

table_registry = registry()


@table_registry.mapped_as_dataclass
class User:
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )
    shopping_lists: Mapped[list['ShoppingList']] = relationship(
        'ShoppingList',
        back_populates='user',
        cascade='all, delete-orphan',
        init=False,
    )


@table_registry.mapped_as_dataclass
class ShoppingList:
    __tablename__ = 'shopping_lists'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    name: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )
    user: Mapped['User'] = relationship(
        'User', back_populates='shopping_lists', init=False
    )
    products: Mapped[list['Product']] = relationship(
        'Product',
        back_populates='shopping_list',
        cascade='all, delete-orphan',
        init=False,
    )


@table_registry.mapped_as_dataclass
class Product:
    __tablename__ = 'products'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    list_id: Mapped[int] = mapped_column(ForeignKey('shopping_lists.id'))
    name: Mapped[str]
    quantity: Mapped[float]
    best_price: Mapped[float] = 0.0
    best_offer: Mapped[float] = 0.0
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )
    shopping_list: Mapped['ShoppingList'] = relationship(
        'ShoppingList', back_populates='products', init=False
    )
    brands: Mapped[list['Brand']] = relationship(
        'Brand',
        back_populates='product',
        cascade='all, delete-orphan',
        init=False,
    )


@table_registry.mapped_as_dataclass
class Brand:
    __tablename__ = 'brands'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey('products.id'))
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
    product: Mapped['Product'] = relationship(
        'Product', back_populates='brands', init=False
    )
