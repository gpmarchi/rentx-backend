import Car from '../infra/typeorm/entities/Car';

export default interface IPaginatedCarResponseDTO {
  totalRecords: number;
  totalPages: number;
  data: Car[];
}
