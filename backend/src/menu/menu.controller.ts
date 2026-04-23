import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getActiveMenu() {
    return this.menuService.getActiveMenuItems();
  }

  @Get('all')
  async getAllMenu() {
    return this.menuService.getAllMenuItems();
  }

  @Post()
  async create(@Body() data: any) {
    return this.menuService.createMenuItem(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.menuService.updateMenuItem(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.menuService.deleteMenuItem(id);
  }
}
