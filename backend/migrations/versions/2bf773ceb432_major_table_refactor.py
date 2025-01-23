"""major table refactor

Revision ID: 2bf773ceb432
Revises: 96642451e1cf
Create Date: 2025-01-23 03:45:29.519170

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '2bf773ceb432'
down_revision: Union[str, None] = '96642451e1cf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('shopping_lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('template_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('total', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['template_id'], ['templates.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_constraint('products_list_id_fkey', 'products', type_='foreignkey')
    op.drop_table('lists')
    op.add_column('brands', sa.Column('unity_cost', sa.Float(), nullable=False))
    op.add_column('brands', sa.Column('predicted_cost', sa.Float(), nullable=False))
    op.drop_column('brands', 'predictedCost')
    op.drop_column('brands', 'unityCost')
    op.add_column('products', sa.Column('best_price', sa.Float(), nullable=False))
    op.add_column('products', sa.Column('best_offer', sa.Float(), nullable=False))
    op.drop_column('products', 'bestOffer')
    op.drop_column('products', 'list_id')
    op.drop_column('products', 'bestPrice')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('bestPrice', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False))
    op.add_column('products', sa.Column('list_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('products', sa.Column('bestOffer', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False))
    op.create_foreign_key('products_list_id_fkey', 'products', 'lists', ['list_id'], ['id'])
    op.drop_column('products', 'best_offer')
    op.drop_column('products', 'best_price')
    op.add_column('brands', sa.Column('unityCost', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False))
    op.add_column('brands', sa.Column('predictedCost', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False))
    op.drop_column('brands', 'predicted_cost')
    op.drop_column('brands', 'unity_cost')
    op.create_table('lists',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('template_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('total', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=False),
    sa.Column('updated_at', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['template_id'], ['templates.id'], name='lists_template_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='lists_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='lists_pkey')
    )
    op.drop_table('shopping_lists')
    # ### end Alembic commands ###
