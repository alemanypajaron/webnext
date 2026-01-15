'use client';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl?: string;
  type: 'contacto' | 'presupuesto';
}

export default function SuccessModal({ isOpen, onClose, whatsappUrl, type }: SuccessModalProps) {
  if (!isOpen) return null;

  const handleWhatsAppClick = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank');
    }
  };

  const title = type === 'contacto' ? '¡Mensaje enviado correctamente!' : '¡Solicitud recibida correctamente!';
  const subtitle = type === 'contacto' 
    ? 'Hemos recibido tu mensaje. Te responderemos en menos de 24 horas.'
    : 'Hemos recibido tu solicitud de presupuesto. Te contactaremos pronto para discutir tu proyecto.';

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg sm:rounded-xl shadow-2xl w-[calc(100%-1.5rem)] max-w-[360px] sm:max-w-md overflow-hidden animate-in zoom-in-95 duration-300 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con checkmark */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3.5 sm:p-5 text-center border-b border-green-100">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full mx-auto mb-2.5 sm:mb-3 flex items-center justify-center animate-in zoom-in duration-500 delay-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-7 sm:h-7"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-primary mb-1.5 sm:mb-2">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Body - Sección WhatsApp */}
        {whatsappUrl && (
          <div className="p-3.5 sm:p-5 bg-gradient-to-br from-green-50/50 to-white">
            <div className="flex items-start gap-2 mb-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-accent to-yellow-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  className="sm:w-[18px] sm:h-[18px]"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-bold text-primary mb-0.5 sm:mb-1">
                  ¿Necesitas una respuesta inmediata?
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Envíanos también este mensaje por WhatsApp para una respuesta más rápida.
                </p>
              </div>
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="sm:w-5 sm:h-5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Enviar por WhatsApp
            </button>

            {/* Warning suave */}
            <div className="mt-2.5 sm:mt-3 flex items-start gap-1.5 sm:gap-2 bg-blue-50 border border-blue-100 rounded-lg p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="flex-shrink-0 text-blue-600 mt-0.5 sm:w-4 sm:h-4"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <p className="text-[10px] sm:text-xs text-blue-800 leading-relaxed">
                <strong>Recuerda:</strong> Deberás dar a "Enviar" desde la app de WhatsApp para que recibamos tu mensaje.
              </p>
            </div>
          </div>
        )}

        {/* Footer con botón cerrar */}
        <div className="p-3.5 sm:p-5 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 sm:py-2.5 px-4 rounded-lg border-2 border-gray-200 transition-all duration-200 hover:border-gray-300 text-xs sm:text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
