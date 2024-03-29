import express from "express";
import {
  UserVald,
  adminVald,
  roleVald,
  updateProfVald,
} from "../../middlewares/autho";
import "../../middlewares/autho";
import { checkingAdmin, checkingUser } from "../../middlewares/checkUser";
import {
  UserRegistration,
  userLogin,
  register,
  signedIn,
  deleteUser,
  assignRole,
  getProfile,
  updateProfile,
  getReqAdminRole,
  requestAdminRole,
  rejectReqAdminRole,
} from "../../controller/regController";
import { UserExist } from "../../middlewares/UserExist";
import passport from "passport";
const router3 = express.Router();

// Swagger documentation

/**
 * @swagger
 * components:
 *  responses:
 *           200:
 *               description: Success
 *           400:
 *               description: Bad request
 *           401:
 *               description: Authorization
 *           404:
 *               description: Not found
 *           500:
 *               description: Unexpected error.
 *  schemas:
 *      Signup:
 *          type: object
 *          required:
 *              -name
 *              -email
 *              -password
 *          properties:
 *              name:
 *                  type: string
 *                  description: name of user
 *              email:
 *                  type: string
 *                  description: email of user
 *              password:
 *                  type: string
 *                  description: password of user
 *          example:
 *              name: admin
 *              email: admin@gmail.com
 *              password: admin3535
 *  parameters:
 *           userId:
 *              name : id
 *              in : path
 *              description: Id for specific blogId
 *              required: true
 *              schema:
 *                 type: string
 */

/**
 * @swagger
 * tags:
 *  name: Registration
 *  description: User registration and signup
 */

/**
 * @swagger
 * /user/signup:
 *  post:
 *      summary: user registration
 *      tags: [Registration]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Signup'
 *      responses:
 *          200:
 *              description: Successfull signup
 *          400:
 *              $ref: '#/components/responses/400'
 *
 */
//User registration
router3.post("/signup", UserVald, UserRegistration);
//user login

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: user and admin login
 *      tags: [Registration]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Signup'
 *                  example:
 *                      email: admin@gmail.com
 *                      password: admin13535
 *      responses:
 *          200:
 *            description: Provide Token
 *          400:
 *            $ref: '#/components/responses/400'
 *          401:
 *            description: Unauthorize
 *
 *
 */
router3.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userLogin
);

//Admin registration

/**
 * @swagger
 * /user/adminsignup:
 *  post:
 *      summary: admin registration
 *      tags: [Registration]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Signup'
 *      responses:
 *          200:
 *              description: Successfull signup
 *          400:
 *              $ref: '#/components/responses/400'
 *
 */

router3.post("/adminsignup", adminVald, register);

//Get all admin registered
/**
 * @swagger
 * /user:
 *  get:
 *    summary: getting all user registed
 *    tags: [Registration]
 *    security:
 *      - {}
 *      - bearerAuth: []
 *    responses:
 *          200:
 *            description: ok
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                items:
 *                  $ref: '#/components/schemas/Signup'
 *          401:
 *            description: Unauthorize
 */

router3.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkingAdmin,
  signedIn
);

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *   summary: Delete one user
 *   tags: [Registration]
 *   security:
 *      - {}
 *      - bearerAuth: []
 *   parameters:
 *          - $ref: '#/components/parameters/userId'
 *   responses:
 *      200:
 *        description: Complite deleted
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: not found
 */
//delete users
router3.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkingAdmin,
  UserExist,
  deleteUser
);
// assign role
router3.patch(
  "/:id/role",
  passport.authenticate("jwt", { session: false }),
  checkingAdmin,
  UserExist,
  roleVald,
  assignRole
);
// get profile
router3.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  UserExist,
  getProfile
);
// update profile
router3.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  UserExist,
  updateProfVald,
  updateProfile
);
// get all requested admin role
router3.get(
  "/requests",
  passport.authenticate("jwt", { session: false }),
  checkingAdmin,
  getReqAdminRole
);
// request admin role route
router3.patch(
  "/request/admin",
  passport.authenticate("jwt", { session: false }),
  UserExist,
  requestAdminRole
);
router3.patch(
  "/request/reject",
  passport.authenticate("jwt", { session: false }),
  UserExist,
  rejectReqAdminRole
);

export default router3;
