import React, { useState } from 'react';
import { X, Check, User } from 'lucide-react';
import { ApprenticeProfile, DocumentType } from '../types/induction';
import { SENA_REGIONALES, SENA_CENTROS, POPULAR_PROGRAMS } from '../data/senaData';
import { useLanguage } from '../context/LanguageContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  onSaveProfile: (profile: ApprenticeProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<ApprenticeProfile>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  const handleRegionalChange = (regional: string) => {
    const centers = SENA_CENTROS[regional] || ['Centro de Formación Integral'];
    setFormData((prev) => ({
      ...prev,
      regional,
      center: centers[0] || 'Centro de Formación',
    }));
  };

  const currentCenters = SENA_CENTROS[formData.regional] || [
    formData.center || 'Centro de Formación SENA',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-[#39A900] dark:text-emerald-400 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#00324D] dark:text-sky-300">
                {t.profileModalTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.profileModalSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.fullNameLabel}</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-850 text-slate-900 dark:text-white font-medium"
            />
          </div>

          {/* Document Type & Number */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.docTypeLabel}</label>
              <select
                value={formData.docType}
                onChange={(e) => setFormData({ ...formData, docType: e.target.value as DocumentType })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-850 text-slate-900 dark:text-white font-medium cursor-pointer"
              >
                <option value="CC">CC (Cédula)</option>
                <option value="TI">TI (Tarjeta Ident.)</option>
                <option value="CE">CE (Extranjería)</option>
                <option value="PPT">PPT (Permiso)</option>
              </select>
            </div>

            <div className="col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.docNumberLabel}</label>
              <input
                type="text"
                required
                value={formData.docNumber}
                onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-850 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          {/* Regional */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.regionalLabel}</label>
            <select
              value={formData.regional}
              onChange={(e) => handleRegionalChange(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-850 text-slate-900 dark:text-white font-medium cursor-pointer"
            >
              {SENA_REGIONALES.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* Centro de Formación */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.centerLabel}</label>
            <select
              value={formData.center}
              onChange={(e) => setFormData({ ...formData, center: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-850 text-slate-900 dark:text-white font-medium cursor-pointer"
            >
              {currentCenters.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Programa de Formación */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.programLabel}</label>
            <select
              value={formData.program}
              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-850 text-slate-900 dark:text-white font-medium cursor-pointer"
            >
              {POPULAR_PROGRAMS.map((prog) => (
                <option key={prog} value={prog}>
                  {prog}
                </option>
              ))}
            </select>
          </div>

          {/* Ficha & Jornada */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.fichaLabel}</label>
              <input
                type="text"
                required
                value={formData.ficha}
                onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-850 text-slate-900 dark:text-white font-mono font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.jornadaLabel}</label>
              <select
                value={formData.jornada}
                onChange={(e) => setFormData({ ...formData, jornada: e.target.value as any })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-850 text-slate-900 dark:text-white font-medium cursor-pointer"
              >
                <option value="Diurna">{t.diurna}</option>
                <option value="Nocturna">{t.nocturna}</option>
                <option value="Mixta">{t.mixta}</option>
                <option value="Madrugada">{t.madrugada}</option>
              </select>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
            >
              {language === 'en' ? 'Cancel' : 'Cancelar'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{t.btnSaveProfile}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
