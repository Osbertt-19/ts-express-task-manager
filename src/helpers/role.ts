import { Role } from '../database/model/User';
import { RoleRequest } from '../types/app-request';
import { Response, NextFunction } from 'express';

export default (...roleCodes: Role[]) =>
  (req: RoleRequest, res: Response, next: NextFunction) => {
    req.currentRoleCodes = roleCodes;
    next();
  };
