import {Router} from 'express';
import * as GetPatients from './get.patients';
import * as DeletePatients from './delete.patients';
import * as PatchPatients from './patch.patients';
import * as PostPatients from './post.patients';

const router = Router();

export default () => {
    //TODO pridať middleware všade
    router.get('/:patientID', GetPatients.getPatientByID);
    router.get('/', GetPatients.getPatientsList)

    router.delete('/:patientID', DeletePatients.deletePatientByID);
    router.patch('/:patientID', PatchPatients.patchPatientWithID);
    router.post('/', PostPatients.postPatient);

    return router;
}