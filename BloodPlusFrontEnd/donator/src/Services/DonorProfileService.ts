import axios from 'axios';
import { IDonorGet } from '../Models/IDonorGet';
import Cookies from 'universal-cookie';
import { Session } from 'inspector';
export class DonorProfileService{
    private static rootDonor: string = 'http://localhost:50272/donor/profile';
}