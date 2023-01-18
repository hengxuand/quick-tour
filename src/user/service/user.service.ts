import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(user: User): Observable<User> {
    return from(this.userRepository.save(user));
  }

  findOne(id: string): Observable<User> {
    return from(this.userRepository.findOne({ where: { id: id } }));
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  deleteOne(id: string): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: string, user: User): Observable<User> {
    user.id = id;
    return from(this.userRepository.save(user));
  }
}
