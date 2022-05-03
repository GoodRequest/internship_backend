import {Router} from 'express';

import {validate} from "../../../middleware/validation";
import {authorize} from "../../../middleware/authorization";
import * as GetPatient from "../patients/get.patient";
import {UserRole, UserRoles} from "../../../middleware/utilities/enums";
import * as GetPatientsList from "../patients/get.patientsList";
import * as DeletePatient from "../patients/delete.patient";
import * as PatchPatient from "../patients/patch.patient";
import * as PostPatient from "../patients/post.patient";


const router = Router();

export default () => {
    router.get('/:patientID', authorize([...UserRoles]), validate(GetPatient.reqSchema), GetPatient.workflow);
    router.get('/', authorize([UserRole.ADMIN, UserRole.SUPER_ADMIN]), validate(GetPatientsList.reqSchema), GetPatientsList.workflow);

    router.delete('/:patientID', authorize([UserRole.SUPER_ADMIN]), validate(DeletePatient.reqSchema), DeletePatient.workflow);
    router.patch('/:patientID', authorize([UserRole.SUPER_ADMIN]), validate(PatchPatient.reqSchema), PatchPatient.workflow);
    router.post('/', authorize([UserRole.SUPER_ADMIN]), validate(PostPatient.reqSchema), PostPatient.workflow);

    return router;
}