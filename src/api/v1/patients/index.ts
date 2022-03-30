import {Router} from 'express';

import validatePatientID from '../../../middleware/validateParams';
import {validatePatient, validateList} from "../../../middleware/validateBody";

import * as GetPatients from './get.patients';
import * as DeletePatients from './delete.patients';
import * as PatchPatients from './patch.patients';
import * as PostPatients from './post.patients';

const router = Router();

export default () => {
    router.get('/:patientID', validatePatientID(), GetPatients.getPatientByID);
    router.get('/', validateList(), GetPatients.getPatientsList)

    router.delete('/:patientID', validatePatientID(), DeletePatients.deletePatientByID);
    router.patch('/:patientID', validatePatientID(), PatchPatients.patchPatientWithID);
    router.post('/', validatePatient(), PostPatients.postPatient);

    return router;
}