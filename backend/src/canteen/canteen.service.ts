import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CanteenService {
  constructor(private readonly prisma: PrismaService) {}

  async getMenu() {
    return this.prisma.foodItem.findMany({ orderBy: { category: 'asc' } });
  }

  async addFoodItem(data: { name: string; category: string; price: number; prepTime: string; calories: string }) {
    return this.prisma.foodItem.create({
      data: {
        name: data.name,
        category: data.category,
        price: Number(data.price),
        prepTime: data.prepTime,
        calories: data.calories,
        isAvailable: true,
      },
    });
  }

  async toggleAvailability(id: string) {
    const item = await this.prisma.foodItem.findUnique({ where: { id } });
    if (!item) return null;
    return this.prisma.foodItem.update({
      where: { id },
      data: { isAvailable: !item.isAvailable },
    });
  }

  async getOrders() {
    return this.prisma.canteenOrder.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async placeOrder(data: {
    studentName?: string;
    rollNumber?: string;
    items: any[];
    totalAmount: number;
    paymentMode?: string;
  }) {
    const rollNumber = data.rollNumber || '01';
    const student = await this.prisma.student.findFirst({ where: { rollNumber } });

    if (student && student.walletBalance < data.totalAmount) {
      throw new BadRequestException('Insufficient Canteen Wallet balance. Please top up.');
    }

    if (student) {
      await this.prisma.student.update({
        where: { id: student.id },
        data: { walletBalance: student.walletBalance - data.totalAmount },
      });
    }

    const token = `TOKEN-${Math.floor(10 + Math.random() * 90)}`;
    const order = await this.prisma.canteenOrder.create({
      data: {
        studentName: data.studentName || 'Rakesh Das',
        rollNumber,
        items: data.items,
        totalAmount: Number(data.totalAmount),
        status: 'Preparing',
        paymentMode: data.paymentMode || 'RFID Smart Card',
        orderedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        token,
      },
    });

    return {
      order,
      token,
      newBalance: student ? student.walletBalance - data.totalAmount : 1450 - data.totalAmount,
    };
  }

  async updateOrderStatus(id: string, status: string) {
    return this.prisma.canteenOrder.update({
      where: { id },
      data: { status },
    });
  }

  async topUpWallet(rollNumber = '01', amount: number) {
    const student = await this.prisma.student.findFirst({ where: { rollNumber } });
    if (!student) {
      return { balance: 1450 + Number(amount) };
    }

    const updated = await this.prisma.student.update({
      where: { id: student.id },
      data: { walletBalance: student.walletBalance + Number(amount) },
    });

    return { balance: updated.walletBalance };
  }
}
