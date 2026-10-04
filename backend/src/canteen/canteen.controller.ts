import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CanteenService } from './canteen.service';

@ApiTags('Smart Canteen & Mess')
@Controller('canteen')
export class CanteenController {
  constructor(private readonly canteenService: CanteenService) {}

  @Get('menu')
  @ApiOperation({ summary: 'Get canteen menu food items and live stock availability' })
  async getMenu() {
    const data = await this.canteenService.getMenu();
    return { success: true, count: data.length, data };
  }

  @Post('menu')
  @ApiOperation({ summary: 'Add new food item to smart canteen' })
  async addFoodItem(@Body() body: any) {
    const item = await this.canteenService.addFoodItem(body);
    return { success: true, message: `Added ${item.name} (₹${item.price}) to Smart Canteen menu!`, data: item };
  }

  @Patch('menu/:id/toggle')
  @ApiOperation({ summary: 'Toggle food item availability (In-stock / Out-of-stock)' })
  async toggleAvailability(@Param('id') id: string) {
    const item = await this.canteenService.toggleAvailability(id);
    return {
      success: true,
      message: `${item?.name} marked as ${item?.isAvailable ? 'Available' : 'Out of Stock'}.`,
      data: item,
    };
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get live kitchen orders queue' })
  async getOrders() {
    const data = await this.canteenService.getOrders();
    return { success: true, count: data.length, data };
  }

  @Post('order')
  @ApiOperation({ summary: 'Place food order and deduct from RFID wallet' })
  async placeOrder(@Body() body: any) {
    const result = await this.canteenService.placeOrder(body);
    return {
      success: true,
      message: `Order placed! Token #${result.token} issued.`,
      data: result,
    };
  }

  @Patch('orders/:id/status')
  @ApiOperation({ summary: 'Update kitchen order status (Pending, Preparing, Ready, Completed)' })
  async updateOrderStatus(@Param('id') id: string, @Body() body: { status: string }) {
    const updated = await this.canteenService.updateOrderStatus(id, body.status);
    return { success: true, message: `Order ${id} is now marked as "${body.status}"!`, data: updated };
  }

  @Post('wallet/topup')
  @ApiOperation({ summary: 'Top up student RFID smart card balance' })
  async topUpWallet(@Body() body: { rollNumber?: string; amount: number }) {
    const res = await this.canteenService.topUpWallet(body.rollNumber || '01', body.amount);
    return { success: true, message: `Wallet topped up by ₹${body.amount}!`, data: res };
  }
}
