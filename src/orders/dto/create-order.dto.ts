import {
  IsArray,
  IsDateString,
  IsString,
  IsOptional,
  IsObject,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  readonly status: string;

  @IsString()
  readonly pickUpMethod: string;

  @IsDateString()
  readonly pickUpDateTime: Date;

  @IsObject()
  readonly address: Object;

  @IsDateString()
  @IsOptional()
  readonly wishLaundryDateTime: Date;

  @IsString()
  @IsOptional()
  readonly notice: string;

  @IsArray()
  readonly products: string[];
}
