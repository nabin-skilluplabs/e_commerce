import * as yup from 'yup';

const profileSchema = yup
    .object({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        mobile: yup.string().optional(),
        email: yup.string().email('Invlid email address').required('Email is rquired')
    }).required();

export default profileSchema;

