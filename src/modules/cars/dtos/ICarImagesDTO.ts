type CarImage = Omit<Express.Multer.File, 'stream' | 'buffer'>;

export default interface ICarImagesDTO {
  car_id: string;
  images: CarImage[];
}
