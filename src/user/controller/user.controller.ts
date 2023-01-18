import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalExceptionFilter } from 'src/config/GlobalExceptionFilter';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User> {
    return this.userService.create(user);
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<User> {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<User> {
    return this.userService.deleteOne(id);
  }

  @Patch(':id')
  @UseFilters(GlobalExceptionFilter)
  updateOne(@Param('id') id: string, @Body() user: User): Observable<User> {
    try {
      return this.userService.updateOne(id, user);
    } catch (exception) {
      console.log(exception);
    }
  }
}
