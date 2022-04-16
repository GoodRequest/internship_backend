import {Router} from 'express';

import {validatePatientID, validatePatient, validatePatientsList} from "../../../middleware/validatePatients";

import * as GetPatient from './get.patient';
import * as GetPatientsList from './get.patientsList';
import * as DeletePatient from './delete.patients';
import * as PatchPatient from './patch.patients';
import * as PostPatient from './post.patients';

const router = Router();

export default () => {
    router.get('/:patientID', validatePatientID(), GetPatient.workflow);
    router.get('/', validatePatientsList(), GetPatientsList.workflow)

    router.delete('/:patientID', validatePatientID(), DeletePatient.workflow);
    router.patch('/:patientID', validatePatientID(), validatePatient(), PatchPatient.workflow);
    router.post('/', validatePatient(), PostPatient.workflow);

    return router;
}