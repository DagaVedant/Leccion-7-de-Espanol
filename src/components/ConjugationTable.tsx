import React from 'react';
import { ConjugationTable as TableType } from '../types';

interface ConjugationTableProps {
  table: TableType;
}

export const ConjugationTable: React.FC<ConjugationTableProps> = ({ table }) => {

  const renderFormWithEndings = (form: string) => {
    // If Future Perfect (contains habr...)
    if (form.includes('habr')) {
      const parts = form.split(' ');
      const aux = parts[0]; 
      const participle = parts.slice(1).join(' '); 
      
      const root = 'habr';
      const ending = aux.substring(4);
      return (
        <>
          <span className="text-slate-400 font-bold">{root}</span>
          <span className="text-[#E76F51] font-bold">{ending}</span>
          <span className="text-slate-800"> {participle}</span>
        </>
      );
    }
    
    // Future Tense endings
    const futureEndings = ['emos', 'éis', 'é', 'ás', 'á', 'án'];
    for (const end of futureEndings) {
      if (form.endsWith(end) && !form.endsWith('ramos')) { 
        const root = form.slice(0, -end.length);
        return (
          <>
            <span className="text-slate-400 font-bold">{root}</span>
            <span className="text-[#E76F51] font-bold">{end}</span>
          </>
        );
      }
    }

    // Past Subjunctive endings
    const subjEndings = ['ramos', 'rais', 'ras', 'ran', 'ra'];
    for (const end of subjEndings) {
      if (form.endsWith(end)) {
        const root = form.slice(0, -end.length);
        return (
          <>
            <span className="text-slate-400 font-bold">{root}</span>
            <span className="text-[#E76F51] font-bold">{end}</span>
          </>
        );
      }
    }

    return <span className="text-slate-800">{form}</span>;
  };

  return (
    <div className="rounded-xl border border-[#4A90E2] shadow-sm flex flex-col overflow-hidden bg-white max-w-sm mx-auto w-full">
      {/* Table Header */}
      <div className="bg-[#4A90E2] text-white px-4 py-2.5 text-center font-bold flex items-center justify-between text-sm">
        <span>{table.title}</span>
        <span className="text-2xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">Regular</span>
      </div>
      
      <div className="px-3 py-1.5 border-b text-[11px] font-semibold text-slate-400 bg-blue-50/20">
        Verbo: <span className="text-xs font-bold text-[#4A90E2]">{table.verb}</span>
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase">
            <th className="px-3 py-1.5 text-left w-1/3 border-r border-slate-100">Pronombre</th>
            <th className="px-3 py-1.5 text-left w-2/3">Forma</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {table.conjugations.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/20' : ''}>
              <td className="px-3 py-2 font-bold text-slate-500 border-r border-slate-50">
                {row.pronoun}
              </td>
              <td className="px-3 py-2 font-semibold font-mono">
                {renderFormWithEndings(row.form)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
