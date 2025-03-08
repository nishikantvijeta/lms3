import { Router } from 'express';
import {
  addLectureToCourseById,
  createCourse,
  deleteCourseById,
  getAllCourses,
  getLecturesByCourseId,
  removeLectureFromCourse,
  updateCourseById,
} from '../controllers/course.controller.js';
import {
  authorizeRoles,
  authorizeSubscribers,
  isLoggedIn,
} from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

// , isLoggedIn, authorizeRoles("ADMIN", "USER") - middlewares

// OLD Code
// router.get("/", getAllCourses);
// router.post("/", isLoggedIn, authorizeRoles("ADMIN"), createCourse);
// router.delete(
//   "/",
//   isLoggedIn,
//   authorizeRoles("ADMIN"),
//   removeLectureFromCourse
// );
// router.get("/:id", isLoggedIn, getLecturesByCourseId);
// router.post(
//   "/:id",
//   isLoggedIn,
//   authorizeRoles("ADMIN"),
//   upload.single("lecture"),
//   addLectureToCourseById
// );
// router.delete("/:id", isLoggedIn, authorizeRoles("ADMIN"), deleteCourseById);

// Refactored code
router
  .route('/')
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    upload.single('thumbnail'),
    createCourse
  )
  .delete(isLoggedIn, authorizeRoles('ADMIN'), removeLectureFromCourse);

router
  .route('/:id')
  .get(isLoggedIn, authorizeSubscribers, getLecturesByCourseId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    upload.single('lecture'),
    addLectureToCourseById
  )
  .put(isLoggedIn, authorizeRoles('ADMIN'), updateCourseById);

export default router;
