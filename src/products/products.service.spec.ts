import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

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
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: jest.fn(() => ({
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          })),
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a product on create', async () => {
    jest.spyOn(repository, 'create').mockImplementation(() => product);
    jest.spyOn(repository, 'save').mockImplementation(async () => product);
    expect(await service.create(createProductDto)).toEqual(product);
  });

  it('should return list of products on findAll', async () => {
    jest.spyOn(repository, 'find').mockImplementation(async () => [product]);
    expect(await service.findAll()).toEqual([product]);
  });

  it('should return the product on findOne', async () => {
    jest.spyOn(repository, 'findOneBy').mockImplementation(async () => product);
    expect(await service.findOne(1)).toEqual(product);
  });

  it('should return the updated product on update', async () => {
    const updateResult: UpdateResult = {
      raw: '',
      affected: 1,
      generatedMaps: [],
    };

    jest
      .spyOn(repository, 'update')
      .mockImplementation(async () => updateResult);
    jest
      .spyOn(repository, 'findOneBy')
      .mockImplementation(async () => updatedProduct);
    expect(await service.update(1, updateProductDto)).toEqual(updatedProduct);
  });

  it('should return the product on findOne', async () => {
    const deleteResult: DeleteResult = { raw: '', affected: 1 };
    jest
      .spyOn(repository, 'delete')
      .mockImplementation(async () => deleteResult);
    expect(await service.remove(1)).toEqual(deleteResult);
  });
});
