"""corrected monetary format

Revision ID: 239b27fda31e
Revises: f8b5f3ee342c
Create Date: 2025-01-27 03:32:41.496810

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '239b27fda31e'
down_revision: Union[str, None] = 'f8b5f3ee342c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('best_price', sa.Numeric(precision=10, scale=2), nullable=True))
    op.add_column('products', sa.Column('best_offer', sa.Numeric(precision=10, scale=2), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('products', 'best_offer')
    op.drop_column('products', 'best_price')
    # ### end Alembic commands ###
