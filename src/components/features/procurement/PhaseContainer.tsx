// src/components/features/procurement/PhaseContainer.tsx
import React from "react";
import { QualificationForm } from "./QualificationForm";
import { QuantificationView } from "./QuantificationView";
import { VendorSearch } from "./VendorSearch";
import { useProcurement } from "../../../contexts/ProcurementContext";
import RequirementInput from "./RequirementInput";
import BOMGenerator from "./BOMGenerator";
import RFPGenerator from "./RFPGenerator";
import VendorOutreach from "./VendorOutreach";
import BidCollection from "./BidCollection";
import AuditTrail from "./AuditTrail";
import AnalysisReport from "./AnalysisReport";
// import { ProjectCompletion } from "./ProjectCompletion";

interface PhaseContainerProps {
  currentPhase: number;
}

export const PhaseContainer: React.FC<PhaseContainerProps> = ({
  currentPhase,
}) => {
  const { moveToNextPhase, moveToPreviousPhase } = useProcurement();

  const renderPhase = () => {
    const phaseProps = {
      onNext: moveToNextPhase,
      onPrevious: moveToPreviousPhase,
    };

    switch (currentPhase) {
      case 1:
        return <RequirementInput {...phaseProps} />;
      case 2:
        return <QualificationForm {...phaseProps} />;
      case 3:
        return <QuantificationView {...phaseProps} />;
      case 4:
        return <BOMGenerator {...phaseProps} />;
      case 5:
        return <VendorSearch {...phaseProps} />;
      case 6:
        return <RFPGenerator {...phaseProps} />;
      case 7:
        return <VendorOutreach {...phaseProps} />;
      case 8:
        return <BidCollection {...phaseProps} />;
      case 9:
        return <AnalysisReport {...phaseProps} />;
      // case 10:
      //   return <ProjectCompletion {...phaseProps} />;
      case 10:
        return <AuditTrail {...phaseProps} />;
      default:
        return <div>Invalid Phase</div>;
    }
  };

  return <div className="fade-in">{renderPhase()}</div>;
};
