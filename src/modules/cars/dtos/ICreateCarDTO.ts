interface ISpecification {
  specification_id: string;
  value: string;
}

export default interface ICreateCarDTO {
  name: string;
  brand: string;
  model: string;
  daily_rent_value: number;
  specifications: ISpecification[];
  fuel_id: string;
  transmission_id: string;
}
