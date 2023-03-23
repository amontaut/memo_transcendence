import { Request } from 'express';      
import { PrismaService } from '../prisma/prisma.service';



interface RequestWithUser extends Request {
  user: PrismaService;
}

export default RequestWithUser;