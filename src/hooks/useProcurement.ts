// src/hooks/useProcurement.ts
import { useProcurement as useProcurementContext } from '../contexts/ProcurementContext';
import { SimulationService } from '../services/simulationService';

export function useProcurement() {
    const context = useProcurementContext();

    const generateBOM = async () => {
        if (!context.state.currentProject) return;

        const bom = await SimulationService.generateBOM(context.state.currentProject.requirement);
        context.dispatch({ type: 'SET_BOM', payload: bom });
    };

    const findVendors = async () => {
        if (!context.state.currentProject?.bom.length) return;

        const vendors = await SimulationService.findVendors(context.state.currentProject.bom);
        context.dispatch({ type: 'SET_VENDORS', payload: vendors });
    };

    return {
        ...context,
        generateBOM,
        findVendors
    };
}