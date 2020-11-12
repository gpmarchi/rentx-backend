import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCarsSpecifications1605189216372
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_specifications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'car_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'specification_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'CarsSpecifications_Cars',
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'CarsSpecifications_Specifications',
            referencedTableName: 'specifications',
            referencedColumnNames: ['id'],
            columnNames: ['specification_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_specifications');
  }
}
