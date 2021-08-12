import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Res,
  Put,
  Req,
  Query,
  Post,
  Body,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { Response } from 'express';
import { CreateCustomerDTO, CustomerParamDTO } from '../dto/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAllCustomer(@Res() res: Response) {
    const data = await this.customerService.listCustomer();
    res.status(HttpStatus.OK).json(data);
  }

  @Get('/:customerid')
  async getCustomerById(@Param() param: CustomerParamDTO) {
    return await this.customerService.getCustomer(param.customerId);
  }

  @Post()
  async createCustomer(
    @Res() res: Response,
    @Body() customerParam: CreateCustomerDTO,
  ) {
    try {
      const data = await this.customerService.createCustomer(customerParam);
      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  @Delete('/')
  async deleteCustomerById(@Query('customerid') id: string) {
    return await this.customerService.getCustomer(id);
  }

  @Put('/')
  async updateCustomerById(
    @Res() res: Response,
    @Body() customerParam: Partial<CreateCustomerDTO>,
    @Query('customerid') id: string,
  ) {
    const data = await this.customerService.updateCustomer(id, customerParam);
    res.status(HttpStatus.OK).json(data);
  }
}
