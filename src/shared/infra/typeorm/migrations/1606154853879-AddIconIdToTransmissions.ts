import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddIconIdToTransmissions1606154853879
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transmissions',
      new TableColumn({
        name: 'icon_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'transmissions',
      new TableForeignKey({
        name: 'TransmissionFile',
        columnNames: ['icon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transmissions', 'TransmissionFile');
    await queryRunner.dropColumn('transmissions', 'icon_id');
  }
}
