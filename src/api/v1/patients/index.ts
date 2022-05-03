import {Router} from 'express';

import {validate} from "../../../middleware/validation";

import * as GetPatient from './get.patient';
import * as GetPatientsList from './get.patientsList';
import * as DeletePatient from './delete.patient';
import * as PatchPatient from './patch.patient';
import * as PostPatient from './post.patient';

const router = Router();

export default () => {
    router.get('/:patientID', validate(GetPatient.reqSchema), GetPatient.workflow);
    router.get('/', validate(GetPatientsList.reqSchema), GetPatientsList.workflow);

    router.delete('/:patientID', validate(DeletePatient.reqSchema), DeletePatient.workflow);
    router.patch('/:patientID', validate(PatchPatient.reqSchema), PatchPatient.workflow);
    router.post('/', validate(PostPatient.reqSchema), PostPatient.workflow);

    return router;
}