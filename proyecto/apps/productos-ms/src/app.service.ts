import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}
}
