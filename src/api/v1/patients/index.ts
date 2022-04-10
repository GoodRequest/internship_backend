import {Router} from 'express';

import {validatePatientID, validatePatient, validatePatientsList} from "../../../middleware/validatePatients";

import * as GetPatients from './get.patients';
import * as DeletePatients from './delete.patients';
import * as PatchPatients from './patch.patients';
import * as PostPatients from './post.patients';

const router = Router();

export default () => {
    router.get('/:patientID', validatePatientID(), GetPatients.getPatientByID);
    router.get('/', validatePatientsList(), GetPatients.getPatientsList)

    router.delete('/:patientID', validatePatientID(), DeletePatients.deletePatientByID);
    router.patch('/:patientID', validatePatientID(), validatePatient(), PatchPatients.patchPatientWithID);
    router.post('/', validatePatient(), PostPatients.postPatient);

    return router;
}