import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDTO } from '../dto/customer.dto';
import { Customer } from '../interface/customer';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  public async listCustomer(): Promise<Customer[]> {
    return await this.customerModel.find({});
  }

  public async getCustomer(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  public async createCustomer(customer: CreateCustomerDTO): Promise<Customer> {
    const newCustomer = await this.customerModel.create(customer);
    return await newCustomer.save();
  }

  public async updateCustomer(
    id,
    customerDto: Partial<CreateCustomerDTO>,
  ): Promise<Customer> {
    const updateCustomer = await this.customerModel.findByIdAndUpdate(
      id,
      customerDto,
      { new: true },
    );
    return updateCustomer;
  }

  public async removeCustomer(id: string): Promise<Customer> {
    try {
      return await this.customerModel.findByIdAndRemove(id);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
