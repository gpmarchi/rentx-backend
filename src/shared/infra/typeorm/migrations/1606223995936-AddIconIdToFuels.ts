import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddIconIdToFuels1606223995936
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'fuels',
      new TableColumn({
        name: 'icon_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'fuels',
      new TableForeignKey({
        name: 'FuelFile',
        columnNames: ['icon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('fuels', 'FuelFile');
    await queryRunner.dropColumn('fuels', 'icon_id');
  }
}
