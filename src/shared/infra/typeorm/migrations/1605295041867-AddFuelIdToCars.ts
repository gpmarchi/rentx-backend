import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddFuelIdToCars1605295041867
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cars',
      new TableColumn({
        name: 'fuel_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'cars',
      new TableForeignKey({
        name: 'CarFuel',
        columnNames: ['fuel_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'fuels',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cars', 'CarFuel');
    await queryRunner.dropColumn('cars', 'fuel_id');
  }
}
