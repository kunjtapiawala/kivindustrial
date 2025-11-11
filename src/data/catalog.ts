import type { CatalogCategory } from "./catalog/types";

import { circuitBreakersCategory } from "./catalog/circuit-breakers";
import { controlsIndicatorsCategory } from "./catalog/controls-indicators";
import { drivesCategory } from "./catalog/drives";
import { electronicComponentsCategory } from "./catalog/electronic-components";
import { heavyMachineryCategory } from "./catalog/heavy-machinery";
import { hvacPlumbingCategory } from "./catalog/hvac-plumbing";
import { hydraulicsCategory } from "./catalog/hydraulics";
import { industrialSuppliesCategory } from "./catalog/industrial-supplies";
import { lightingCategory } from "./catalog/lighting";
import { mechanicalComponentsCategory } from "./catalog/mechanical-components";
import { motorsCategory } from "./catalog/motors";
import { networkingCategory } from "./catalog/networking";
import { pilotDevicesCategory } from "./catalog/pilot-devices";
import { plcsHmisCategory } from "./catalog/plcs-hmis";
import { pneumaticsCategory } from "./catalog/pneumatics";
import { roboticsCategory } from "./catalog/robotics";
import { safetyEquipmentCategory } from "./catalog/safety-equipment";
import { sensorsCategory } from "./catalog/sensors";
import { servoProductsCategory } from "./catalog/servo-products";
import { switchesCategory } from "./catalog/switches";
import { testMeasurementCategory } from "./catalog/test-measurement";
import { toolsAccessoriesCategory } from "./catalog/tools-accessories";
import { enclosuresPanelsCategory } from "./catalog/enclosures-panels";
import { bearingsSealsCategory } from "./catalog/bearings-seals";
import { materialHandlingCategory } from "./catalog/material-handling";
import { weldingEquipmentCategory } from "./catalog/welding-equipment";
import { circuitBoardsCategory } from "./catalog/circuit-boards";
import { aiPartsCategory } from "./catalog/ai-parts";
import { manufacturingMachineryCategory } from "./catalog/manufacturing-machinery";
import { packagingEquipmentCategory } from "./catalog/packaging-equipment";

export type { CatalogCategory } from "./catalog/types";

export const catalogCategories: CatalogCategory[] = [
  circuitBreakersCategory,
  controlsIndicatorsCategory,
  drivesCategory,
  electronicComponentsCategory,
  hvacPlumbingCategory,
  hydraulicsCategory,
  industrialSuppliesCategory,
  lightingCategory,
  mechanicalComponentsCategory,
  motorsCategory,
  networkingCategory,
  pilotDevicesCategory,
  plcsHmisCategory,
  pneumaticsCategory,
  roboticsCategory,
  safetyEquipmentCategory,
  sensorsCategory,
  servoProductsCategory,
  switchesCategory,
  testMeasurementCategory,
  toolsAccessoriesCategory,
  heavyMachineryCategory,
  enclosuresPanelsCategory,
  bearingsSealsCategory,
  materialHandlingCategory,
  weldingEquipmentCategory,
  circuitBoardsCategory,
  aiPartsCategory,
  manufacturingMachineryCategory,
  packagingEquipmentCategory,
];

