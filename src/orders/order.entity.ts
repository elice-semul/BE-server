import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CommonEntity } from '../entities/common.entity';
import { User } from '../entities/users.entity';
import { Laundry } from '../entities/laundry.entity';
import { Review } from '../entities/review.entity';

@Entity()
export class Order extends CommonEntity {
  @Column()
  status: string;

  @Column()
  pickUpMethod: string;

  @Column()
  pickUpDateTime: Date;

  @Column('simple-json')
  address: { roadAddr: string; detailAddr: string; jibun: string };

  @Column({ nullable: true })
  wishLaundryDateTime: Date;

  @Column({ nullable: true })
  notice: string;

  @Column({ nullable: true })
  deniedReason: string;

  @Column({ nullable: true })
  completedDateTime: Date;

  @Column()
  orderNum: number;

  @ManyToOne(() => User, (user) => user.order, { eager: true })
  user: User;

  @ManyToOne(() => Laundry, (laundry) => laundry.order)
  laundry: Laundry;

  @OneToOne(() => Review, (review) => review.order)
  review: Review;
}
