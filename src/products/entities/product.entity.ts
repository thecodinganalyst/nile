import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  pictureUrl: string;

  @Column()
  category: string;

  @Column('decimal', { scale: 2 })
  price: number;
}
