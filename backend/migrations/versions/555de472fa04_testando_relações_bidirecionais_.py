"""testando relações bidirecionais novamente, desativei a inicialização

Revision ID: 555de472fa04
Revises: bfdd97d519d4
Create Date: 2025-01-24 23:13:30.096659

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '555de472fa04'
down_revision: Union[str, None] = 'bfdd97d519d4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
