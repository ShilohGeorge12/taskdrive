// import joi from 'joi';

// export function validateOtp(schema: unknown): otpValidationReturnType {
// 	const otpSchema = joi.object<otpValidation>({
// 		otp: joi.string().min(1).max(4).required(),
// 	});
// 	return otpSchema.validate(schema, { abortEarly: false });
// }
// export function validateNewUser(schema: unknown): userValidationReturnType {
// 	const otpSchema = joi.object<userValidation>({
// 		firstname: joi.string().min(2).required(),
// 		lastname: joi.string().min(2).required(),
// 		location: joi.string().min(2).required(),
// 		phonenumber: joi.string().min(2).required(),
// 		password: joi.string().min(6).required(),
// 		email: joi.string().email().required(),
// 	});
// 	return otpSchema.validate(schema, { abortEarly: false });
// }

// export function validateJobRequest(schema: unknown): jobReqeustValidationReturnType {
// 	const otpSchema = joi.object<jobReqeustValidation>({
// 		address: joi.string().min(2).required(),
// 		dateTime: joi.string().min(2).required(),
// 		description: joi.string().min(2).required(),
// 		landmark: joi.string().min(2).required(),
// 		service: joi.string().min(2).required(),
// 		urgent: joi.boolean().required(),
// 		images_0: joi.any(),
// 		images_1: joi.any(),
// 		images_2: joi.any(),
// 		price: joi.string().min(4).required(),
// 	});
// 	return otpSchema.validate(schema, { abortEarly: false });
// }
