interface ISpecification {
  id: string;
  value: string;
}

export default interface ICreateCarDTO {
  name: string;
  brand: string;
  model: string;
  daily_rent_value: number;
  specifications: ISpecification[];
}
