import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddTransmissionIdToCars1605295054872
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cars',
      new TableColumn({
        name: 'transmission_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'cars',
      new TableForeignKey({
        name: 'CarTransmission',
        columnNames: ['transmission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transmissions',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cars', 'CarTransmission');
    await queryRunner.dropColumn('cars', 'transmission_id');
  }
}
