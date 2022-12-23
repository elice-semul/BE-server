import { Injectable } from '@nestjs/common';
import { OrderProduct } from 'src/order_products/order_product.entity';
import { User } from 'src/users/users.entity';
import { DataSource, Repository, EntityManager } from 'typeorm';
import { Order } from '../order.entity';
import { CreateOrderDto } from './../dto/create-order.dto';

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async saveByTransaction(
    manager: EntityManager,
    orderData: CreateOrderDto,
    user: User,
  ) {
    return await manager
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values({ ...orderData, user })
      .execute();
  }

  async findByJoin(): Promise<Order[]> {
    const result = await this.createQueryBuilder('order')
      .leftJoinAndSelect(
        OrderProduct,
        'order_product',
        'order.id = order_product.id',
      )
      .getMany();
    return result;
  }

  async findByStatus(status: string): Promise<Order[]> {
    const result = await this.createQueryBuilder('order')
      .where('order.status = :status', { status: status })
      .getMany();
    return result;
  }
}
