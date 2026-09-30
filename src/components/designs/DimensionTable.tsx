import React from 'react';
import { HomeDesign } from '@/types';
import { formatSquares, formatSqm } from '@/lib/utils';
import { Ruler, Maximize } from 'lucide-react';

interface Props {
  design: HomeDesign;
}

export default function DimensionTable({ design }: Props) {
  const groundPlan = design.floorplans.find((p) => p.level.toLowerCase().includes('ground')) || design.floorplans[0];
  const firstPlan = design.floorplans.find((p) => p.level.toLowerCase().includes('first'));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Ruler className="w-5 h-5 text-brand-orange" />
        <h3 className="text-xl font-bold text-brand-navy">Dimension Breakdown</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="pb-3">Living Zone / Area</th>
              <th className="pb-3 text-right">Square Metres (m²)</th>
              <th className="pb-3 text-right">Squares (sq)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            <tr>
              <td className="py-3">Ground Floor Living Area</td>
              <td className="py-3 text-right">{formatSqm(groundPlan.dimensions.livingAreaSqm)}</td>
              <td className="py-3 text-right">{(groundPlan.dimensions.livingAreaSqm / 9.2903).toFixed(1)} sq</td>
            </tr>
            {firstPlan && (
              <tr>
                <td className="py-3">First Floor Living Area</td>
                <td className="py-3 text-right">{formatSqm(firstPlan.dimensions.livingAreaSqm)}</td>
                <td className="py-3 text-right">{(firstPlan.dimensions.livingAreaSqm / 9.2903).toFixed(1)} sq</td>
              </tr>
            )}
            <tr>
              <td className="py-3">Garage &amp; Workshop</td>
              <td className="py-3 text-right">{formatSqm(groundPlan.dimensions.garageSqm)}</td>
              <td className="py-3 text-right">{(groundPlan.dimensions.garageSqm / 9.2903).toFixed(1)} sq</td>
            </tr>
            {groundPlan.dimensions.alfrescoSqm && (
              <tr>
                <td className="py-3">Covered Alfresco</td>
                <td className="py-3 text-right">{formatSqm(groundPlan.dimensions.alfrescoSqm)}</td>
                <td className="py-3 text-right">{(groundPlan.dimensions.alfrescoSqm / 9.2903).toFixed(1)} sq</td>
              </tr>
            )}
            {groundPlan.dimensions.porchSqm && (
              <tr>
                <td className="py-3">Front Entry Porch</td>
                <td className="py-3 text-right">{formatSqm(groundPlan.dimensions.porchSqm)}</td>
                <td className="py-3 text-right">{(groundPlan.dimensions.porchSqm / 9.2903).toFixed(1)} sq</td>
              </tr>
            )}
            <tr className="bg-slate-50 font-bold text-brand-navy">
              <td className="py-3.5 pl-3">Total Built House Size</td>
              <td className="py-3.5 text-right text-brand-navy font-black">{formatSqm(design.houseSizeSqm)}</td>
              <td className="py-3.5 pr-3 text-right text-brand-orange font-black">{formatSquares(design.houseSizeSquares)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Lot Requirements Strip */}
      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs font-semibold">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Minimum Lot Width</span>
          <span className="text-base font-bold text-brand-navy mt-0.5 block">{design.minLotWidth} Metres</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Zero Lot Line Potential</span>
          <span className="text-base font-bold text-emerald-600 mt-0.5 block">CDC / DA Eligible</span>
        </div>
      </div>
    </div>
  );
}
