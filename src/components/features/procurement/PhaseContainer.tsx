// src/components/features/procurement/PhaseContainer.tsx
import React from "react";
import { RequirementInput } from "./RequirementInput";
import { QualificationForm } from "./QualificationForm";
import { QuantificationView } from "./QuantificationView";
import { BOMGenerator } from "./BOMGenerator";
import { VendorSearch } from "./VendorSearch";
import { RFPGenerator } from "./RFPGenerator";
import { VendorOutreach } from "./VendorOutreach";
import { BidCollection } from "./BidCollection";
import { AnalysisReport } from "./AnalysisReport";
import { useProcurement } from "../../../contexts/ProcurementContext";

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
      default:
        return <div>Invalid Phase</div>;
    }
  };

  return <div className="mt-8 fade-in">{renderPhase()}</div>;
};
