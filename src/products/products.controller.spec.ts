import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository, DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const product: Product = {
    id: 1,
    name: 'Product 1',
    description: 'Description of product 1',
    category: 'Category A',
    pictureUrl: '',
    price: 100.0,
  };

  const createProductDto: CreateProductDto = {
    name: 'Product 1',
    description: 'Description of product 1',
    category: 'Category A',
    pictureUrl: '',
    price: 100.0,
  };

  const updatedProduct: Product = {
    id: 1,
    name: 'Product 1',
    description: 'Description of product 1',
    category: 'Category A',
    pictureUrl: '',
    price: 120.0,
  };

  const updateProductDto: UpdateProductDto = {
    name: 'Product 1',
    description: 'Description of product 1',
    category: 'Category A',
    pictureUrl: '',
    price: 120.0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a product upon creation', async () => {
    jest.spyOn(service, 'create').mockImplementation(async () => product);

    expect(await controller.create(createProductDto)).toBe(product);
  });

  it('should return the list of products when get', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(async () => [product]);
    expect(await controller.findAll()).toEqual([product]);
  });

  it('should return the a product when findOne', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(async () => product);
    expect(await controller.findOne('1')).toEqual(product);
  });

  it('should return the updated product when patch', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => updatedProduct);
    expect(await controller.update('1', updateProductDto)).toEqual(
      updatedProduct,
    );
  });

  it('should return the number of affected results when delete', async () => {
    const deleteResult: DeleteResult = { raw: '', affected: 1 };
    jest.spyOn(service, 'remove').mockImplementation(async () => deleteResult);
    expect(await controller.remove('1')).toEqual(deleteResult);
  });
});
