from datetime import datetime

from sqlalchemy import JSON, func
from sqlalchemy.orm import Mapped, mapped_column, registry, relationship

table_registry = registry()


@table_registry.mapped_as_dataclass
class User:
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    lists: Mapped[list['List']] = relationship(
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
    user_id: Mapped[int] = mapped_column(init=False, foreign_key='users.id')
    name: Mapped[str]
    products: Mapped[JSON] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )


@table_registry.mapped_as_dataclass
class List:
    __tablename__ = 'lists'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    user_id: Mapped[int] = mapped_column(init=False, foreign_key='users.id')
    template_id: Mapped[int] = mapped_column(
        init=False, foreign_key='templates.id', nullable=True
    )
    name: Mapped[str]
    total: Mapped[float]
    products: Mapped[list['Product']] = relationship(
        init=False, back_populates='list', cascade='all, delete-orphan'
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
    user_id: Mapped[int] = mapped_column(init=False, foreign_key='users.id')
    list_id: Mapped[int] = mapped_column(init=False, foreign_key='lists.id')
    name: Mapped[str]
    quantity: Mapped[float]
    bestPrice: Mapped[float]
    bestOffer: Mapped[float]
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
    user_id: Mapped[int] = mapped_column(init=False, foreign_key='users.id')
    list_id: Mapped[int] = mapped_column(init=False, foreign_key='lists.id')
    product_id: Mapped[int] = mapped_column(
        init=False, foreign_key='products.id'
    )
    name: Mapped[str]
    quantity: Mapped[float]
    price: Mapped[float]
    unityCost: Mapped[float]
    predictedCost: Mapped[float]
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )
