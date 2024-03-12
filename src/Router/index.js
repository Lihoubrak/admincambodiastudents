import { configRouter } from "../config/route";
import {
  DetailInfoPassport,
  DetailMajor,
  DetailPassport,
  DetailRoom,
  DetailStudent,
  DetailUniversity,
  DetailInfoVisa,
  Dormitory,
  ElectricityLookup,
  ElectricityWater,
  Healthcare,
  Inbox,
  Passport,
  Scholarships,
  StudentRoom,
  StudentTasks,
  University,
  WaterLookup,
  Program,
  DetailProgram,
  DataStudent,
  Login,
} from "../pages";
const publicRoute = [
  { path: configRouter.login, component: Login },
  { path: configRouter.home, component: University },
  { path: configRouter.detailUniversity, component: DetailUniversity },
  { path: configRouter.detailMajor, component: DetailMajor },
  { path: configRouter.detailStudent, component: DetailStudent },
  { path: configRouter.dormitory, component: Dormitory },
  { path: configRouter.studentRoom, component: StudentRoom },
  { path: configRouter.detailRoom, component: DetailRoom },
  { path: configRouter.studentTasks, component: StudentTasks },
  { path: configRouter.inbox, component: Inbox },
  { path: configRouter.scholarships, component: Scholarships },
  { path: configRouter.passport, component: Passport },
  { path: configRouter.detailPassport, component: DetailPassport },
  { path: configRouter.detailInfoVisa, component: DetailInfoVisa },
  { path: configRouter.detailInfoPassport, component: DetailInfoPassport },
  { path: configRouter.healthcare, component: Healthcare },
  { path: configRouter.electricityWater, component: ElectricityWater },
  { path: configRouter.electricityLookup, component: ElectricityLookup },
  { path: configRouter.waterLookup, component: WaterLookup },
  { path: configRouter.program, component: Program },
  { path: configRouter.detailProgram, component: DetailProgram },
  { path: configRouter.dataStudent, component: DataStudent },
];

export { publicRoute };