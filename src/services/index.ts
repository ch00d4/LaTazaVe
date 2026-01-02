import { ApiBCVSigmaService } from './providers/ApiBCVSigma.service';
import { DolarApiService } from './providers/DolarApi.service';
import { DolarVzlaService } from './providers/DolarVzla.service';

export const services = [
  new DolarApiService(),
  new DolarVzlaService(),
  new ApiBCVSigmaService(),
];
