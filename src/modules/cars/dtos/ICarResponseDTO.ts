import ICarSpecificationResponseDTO from './ICarSpecificationResponseDTO';

export default interface ICarResponseDTO {
  id: string;
  name: string;
  brand: string;
  model: string;
  daily_rent_value: number;
  fuel: ICarSpecificationResponseDTO | undefined;
  specifications?: ICarSpecificationResponseDTO[];
}
