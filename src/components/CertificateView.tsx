import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck, 
  QrCode, 
  Award,
  Edit3,
  FileSpreadsheet
} from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';
import { SENA_LOGO_DATA_URI } from '../assets/senaLogoDataUri';
import { useLanguage } from '../context/LanguageContext';

interface CertificateViewProps {
  profile: ApprenticeProfile;
  score: number;
  verificationCode: string;
  issueDate: string;
  onEditProfile: () => void;
  onOpenGoogleDrive?: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  score,
  verificationCode,
  issueDate,
  onEditProfile,
  onOpenGoogleDrive,
}) => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const locale = language === 'en' ? 'en-US' : 'es-CO';
  const formattedDate = new Date(issueDate).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Action Bar (hidden on print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-emerald-400 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#00324D] dark:text-white">
              {language === 'en' ? 'SENA Institutional Induction Certificate' : 'Certificado Institucional de Inducción SENA'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {t.certVerificationCodeLabel} <span className="font-bold text-slate-800 dark:text-slate-100">{verificationCode}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {onOpenGoogleDrive && (
            <button
              onClick={onOpenGoogleDrive}
              className="px-3 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700/60 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              title={language === 'en' ? 'Save apprentice record and certificate to Google Sheets' : 'Guardar registro del aprendiz y certificado en Google Sheets'}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900]" />
              <span>{t.dashBtnSyncDrive}</span>
            </button>
          )}

          <button
            onClick={onEditProfile}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{t.btnEditApprenticeProfile}</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 text-xs font-semibold text-[#00324D] dark:text-sky-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t.btnCodeCopied : t.btnCopyVerificationCode}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.btnPrintCertificate}</span>
          </button>
        </div>
      </div>

      {/* The Printable Official Certificate Container */}
      <div
        id="sena-official-certificate"
        className="bg-white border-8 border-double border-[#00324D] p-8 sm:p-14 rounded-2xl shadow-lg relative overflow-hidden text-slate-900 max-w-4xl mx-auto"
      >
        {/* Subtle Watermark Seal */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <img
            src="/src/assets/images/sena_institutional_seal_1792526742258.jpg"
            alt="SENA Seal Watermark"
            className="w-96 h-96 object-contain"
          />
        </div>

        {/* Outer Guilloche Border Frame */}
        <div className="border border-[#39A900]/40 p-6 sm:p-8 rounded-lg relative space-y-8">
          
          {/* Certificate Header */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex items-center justify-center gap-4">
              {/* SENA Green Logo Stamp */}
              <div className="w-14 h-14 flex items-center justify-center">
                <img
                  src={SENA_LOGO_DATA_URI}
                  alt="Logo Oficial SENA"
                  className="w-full h-full object-contain"
                />
              </div>
              <img
                src="/src/assets/images/sena_institutional_seal_1792526742258.jpg"
                alt="Sello Institucional"
                className="w-14 h-14 object-contain rounded-full border border-amber-300 shadow-xs"
              />
            </div>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#00324D] block">
                {t.republicOfColombia}
              </span>
              <span className="text-sm uppercase tracking-wider font-extrabold text-[#39A900] block">
                {t.certSenaHeader}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block">
                {profile.regional} · {profile.center}
              </span>
            </div>

            <div className="pt-3">
              <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-[#00324D] uppercase border-y-2 border-[#00324D]/30 py-1.5 px-4">
                {language === 'en' ? 'Certificate of Induction Approval' : 'Constancia de Aprobación de Inducción'}
              </h2>
              <span className="text-xs font-semibold text-slate-600 block mt-1">
                {language === 'en' 
                  ? 'Mastery of SENA Apprentice Regulations (Agreement 0009 of 2024 & Agreement 002 of 2026)' 
                  : 'Apropiación del Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024 & Acuerdo 002 de 2026)'
                }
              </span>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="text-center space-y-6">
            <p className="text-sm text-slate-600 font-medium">
              {t.certConfersTo}
            </p>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight underline decoration-[#39A900] decoration-2 underline-offset-8">
                {profile.fullName.toUpperCase()}
              </h1>
              <p className="text-xs font-mono text-slate-600 pt-2">
                {t.certDocumentLabel} {profile.docType} No. <strong className="text-slate-900">{profile.docNumber}</strong>
              </p>
            </div>

            <p className="text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
              {language === 'en' 
                ? (
                  <>
                    Has successfully completed the <strong className="font-bold text-[#00324D]">40-Hour Institutional Induction Stage</strong>, 
                    demonstrating commitment and regulatory mastery of the <strong className="font-bold text-slate-900">Rights, Duties, Prohibitions, and Procedures</strong> set 
                    forth in the SENA Apprentice Regulations, obtaining a score of <strong className="font-mono font-bold text-[#39A900]">{score}%</strong> in the formative evaluation.
                  </>
                )
                : (
                  <>
                    Completó satisfactoriamente la etapa de <strong className="font-bold text-[#00324D]">Inducción Institucional de 40 Horas</strong>, 
                    demostrando dominio y compromiso con los <strong className="font-bold text-slate-900">Derechos, Deberes, Prohibiciones y Trámites</strong> establecidos 
                    en el Reglamento del Aprendiz SENA, obteniendo una calificación del <strong className="font-mono font-bold text-[#39A900]">{score}%</strong> en la evaluación formativa.
                  </>
                )
              }
            </p>

            {/* Academic Program Box */}
            <div className="max-w-xl mx-auto p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              <div className="font-bold text-[#00324D] text-sm">
                {profile.program}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-slate-600 font-mono text-[11px]">
                <span>{t.certFichaLabel} <strong>{profile.ficha}</strong></span>
                <span>·</span>
                <span>{t.modalityLabel}: <strong>{profile.modality}</strong></span>
                <span>·</span>
                <span>{t.jornadaLabel}: <strong>{profile.jornada}</strong></span>
              </div>
            </div>
          </div>

          {/* Signatures & Verification Area */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center border-t border-slate-200">
            {/* Signature 1 */}
            <div className="space-y-2">
              <div className="font-serif italic text-base text-slate-700 tracking-wider">
                Dr. Hernando Gómez P.
              </div>
              <div className="border-t border-slate-400 pt-1 text-[11px] text-slate-600">
                <strong className="block text-slate-900">{language === 'en' ? 'Center Subdirector' : 'Subdirector de Centro'}</strong>
                <span>{language === 'en' ? 'SENA Training Center' : 'Centro de Formación SENA'}</span>
              </div>
            </div>

            {/* Central Verification Stamp / QR */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="p-2 border border-slate-300 rounded-lg bg-slate-50 inline-block shadow-2xs">
                <QrCode className="w-14 h-14 text-slate-800" />
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                ID: <span className="text-slate-900 font-bold">{verificationCode}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                <ShieldCheck className="w-3 h-3" />
                <span>{language === 'en' ? 'Verified Document' : 'Documento Verificado'}</span>
              </div>
            </div>

            {/* Signature 2 */}
            <div className="space-y-2">
              <div className="font-serif italic text-base text-slate-700 tracking-wider">
                Dra. Patricia Salamanca M.
              </div>
              <div className="border-t border-slate-400 pt-1 text-[11px] text-slate-600">
                <strong className="block text-slate-900">{language === 'en' ? 'Training Coordination' : 'Coordinación de Formación'}</strong>
                <span>{language === 'en' ? 'Evaluation and Follow-up Committee' : 'Comité de Evaluación y Seguimiento'}</span>
              </div>
            </div>
          </div>

          {/* Certificate Footer Line */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>{t.certIssueDateLabel} {formattedDate}</span>
            <span>{language === 'en' ? 'Official nationwide validity · SENA Management System' : 'Validez oficial nacional · Sistema de Gestión SENA'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
