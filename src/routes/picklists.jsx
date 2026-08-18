import { Route } from "react-router-dom";
import Protected from "src/components/Protected";
import AssetCategories from "src/features/picklists/features/AssetCategories";
import AssetStatus from "src/features/picklists/features/AssetStatus";
import AssetSubCategories from "src/features/picklists/features/AssetSubCategories";
import Banks from "src/features/picklists/features/Banks";
import ClientHealth from "src/features/picklists/features/ClientHealth";
import ClientStatus from "src/features/picklists/features/ClientStatus";
import Departments from "src/features/picklists/features/Departments";
import EmployeeAllowanceTypes from "src/features/picklists/features/EmployeeAllowanceTypes";
import EmployeeCommuteModes from "src/features/picklists/features/EmployeeCommuteModes";
import EmployeeCommuteTypes from "src/features/picklists/features/EmployeeCommuteTypes";
import EmployeeConfirmationTypes from "src/features/picklists/features/EmployeeConfirmationTypes";
import EmployeeDesignations from "src/features/picklists/features/EmployeeDesignations";
import EmployeeExitReasons from "src/features/picklists/features/EmployeeExitReasons";
import EmployeeGenders from "src/features/picklists/features/EmployeeGenders";
import EmployeeIncrementTypes from "src/features/picklists/features/EmployeeIncrementTypes";
import EmployeeMaritalStatus from "src/features/picklists/features/EmployeeMaritalStatus";
import EmployeeQualificationDegrees from "src/features/picklists/features/EmployeeQualificationDegrees";
import EmployeeQualificationMajors from "src/features/picklists/features/EmployeeQualificationMajors";
import EmployeeSeparationTypes from "src/features/picklists/features/EmployeeSeparationTypes";
import EmployeeShiftTypes from "src/features/picklists/features/EmployeeShiftTypes";
import EmployeeStatus from "src/features/picklists/features/EmployeeStatus";
import EmployeeTypes from "src/features/picklists/features/EmployeeTypes";
import InsuranceProviders from "src/features/picklists/features/InsuranceProviders";
import LeadSources from "src/features/picklists/features/LeadSources";
import Locations from "src/features/picklists/features/Locations";
import MaintenanceStatus from "src/features/picklists/features/MaintenanceStatus";
import MarketingPlatforms from "src/features/picklists/features/MarketingPlatforms";
import ProcurementBanks from "src/features/picklists/features/ProcurementBanks";
import ProcurementBillingStatus from "src/features/picklists/features/ProcurementBillingStatus";
import ProcurementCategories from "src/features/picklists/features/ProcurementCategories";
import ProcurementDelayReasons from "src/features/picklists/features/ProcurementDelayReasons";
import ProcurementPaymentModes from "src/features/picklists/features/ProcurementPaymentModes";
import ProcurementPaymentStatus from "src/features/picklists/features/ProcurementPaymentStatus";
import ProcurementPriorities from "src/features/picklists/features/ProcurementPriorities";
import ProcurementStatus from "src/features/picklists/features/ProcurementStatus";
import ProcurementTaxChallanStatus from "src/features/picklists/features/ProcurementTaxChallanStatus";
import ProjectServices from "src/features/picklists/features/ProjectServices";
import ProjectStatus from "src/features/picklists/features/ProjectStatus";
import ProjectType from "src/features/picklists/features/ProjectType";
import SittingCostHeads from "src/features/picklists/features/SittingCostHeads";
import SubscriptionServiceProviders from "src/features/picklists/features/SubscriptionServiceProviders";
import SubscriptionServices from "src/features/picklists/features/SubscriptionServices";
import SubscriptionServiceTypes from "src/features/picklists/features/SubscriptionServiceTypes";
import SubscriptionStatus from "src/features/picklists/features/SubscriptionStatus";
import TaskPriorities from "src/features/picklists/features/TaskPriorities";
import TaskStatus from "src/features/picklists/features/TaskStatus";
import TaxStatus from "src/features/picklists/features/TaxStatus";
import VehicleMakes from "src/features/picklists/features/VehicleMakes";
import VehicleModels from "src/features/picklists/features/VehicleModels";
import VehicleStatus from "src/features/picklists/features/VehicleStatus";
import Picklists from "src/pages/Picklists";

export const picklistRoutes = (
  <Route
    path="picklists"
    element={
      <Protected resource="picklist" action="read">
        <Picklists />
      </Protected>
    }
  >
    <Route index element={<AssetStatus />} />
    <Route path="asset-status" element={<AssetStatus />} />
    <Route path="asset-categories" element={<AssetCategories />} />
    <Route path="asset-sub-categories" element={<AssetSubCategories />} />
    <Route path="banks" element={<Banks />} />
    <Route path="client-health" element={<ClientHealth />} />
    <Route path="client-status" element={<ClientStatus />} />
    <Route path="departments" element={<Departments />} />
    <Route path="employee-allowance-types" element={<EmployeeAllowanceTypes />} />
    <Route path="employee-commute-modes" element={<EmployeeCommuteModes />} />
    <Route path="employee-commute-types" element={<EmployeeCommuteTypes />} />
    <Route path="employee-confirmation-types" element={<EmployeeConfirmationTypes />} />
    <Route path="employee-designations" element={<EmployeeDesignations />} />
    <Route path="employee-exit-reasons" element={<EmployeeExitReasons />} />
    <Route path="employee-genders" element={<EmployeeGenders />} />
    <Route path="employee-increment-types" element={<EmployeeIncrementTypes />} />
    <Route path="employee-marital-status" element={<EmployeeMaritalStatus />} />
    <Route path="employee-qualification-degrees" element={<EmployeeQualificationDegrees />} />
    <Route path="employee-qualification-majors" element={<EmployeeQualificationMajors />} />
    <Route path="employee-separation-types" element={<EmployeeSeparationTypes />} />
    <Route path="employee-shift-types" element={<EmployeeShiftTypes />} />
    <Route path="employee-status" element={<EmployeeStatus />} />
    <Route path="employee-types" element={<EmployeeTypes />} />
    <Route path="insurance-providers" element={<InsuranceProviders />} />
    <Route path="lead-sources" element={<LeadSources />} />
    <Route path="locations" element={<Locations />} />
    <Route path="maintenance-status" element={<MaintenanceStatus />} />
    <Route path="marketing-platforms" element={<MarketingPlatforms />} />
    <Route path="project-services" element={<ProjectServices />} />
    <Route path="project-status" element={<ProjectStatus />} />
    <Route path="project-type" element={<ProjectType />} />
    <Route path="procurement-banks" element={<ProcurementBanks />} />
    <Route path="procurement-billing-status" element={<ProcurementBillingStatus />} />
    <Route path="procurement-categories" element={<ProcurementCategories />} />
    <Route path="procurement-delay-reasons" element={<ProcurementDelayReasons />} />
    <Route path="procurement-payment-modes" element={<ProcurementPaymentModes />} />
    <Route path="procurement-payment-status" element={<ProcurementPaymentStatus />} />
    <Route path="procurement-priorities" element={<ProcurementPriorities />} />
    <Route path="procurement-status" element={<ProcurementStatus />} />
    <Route path="procurement-tax-challan-status" element={<ProcurementTaxChallanStatus />} />
    <Route path="sitting-cost-heads" element={<SittingCostHeads />} />
    <Route path="subscription-service-providers" element={<SubscriptionServiceProviders />} />
    <Route path="subscription-services" element={<SubscriptionServices />} />
    <Route path="subscription-service-types" element={<SubscriptionServiceTypes />} />
    <Route path="subscription-status" element={<SubscriptionStatus />} />
    <Route path="task-priorities" element={<TaskPriorities />} />
    <Route path="task-status" element={<TaskStatus />} />
    <Route path="tax-status" element={<TaxStatus />} />
    <Route path="vehicle-makes" element={<VehicleMakes />} />
    <Route path="vehicle-models" element={<VehicleModels />} />
    <Route path="vehicle-status" element={<VehicleStatus />} />
  </Route>
);
