import multer from "multer";

// Configurar multer para almacenar los archivos subidos en una carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Carpeta de destino
  },
  filename: (req, file, cb) => {
    // Renombrar el archivo para evitar conflictos de nombres
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filtro para permitir solo ciertos tipos de archivos
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = [
    "application/pdf",                                 // PDF
    "image/jpeg", "image/jpg", "image/png", "image/gif", // Imágenes
    "text/plain",                                      // Archivos de texto
    "application/msword",                              // Archivos Word (.doc)
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Archivos Word (.docx)
    "application/vnd.ms-excel",                        // Archivos Excel (.xls)
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // Archivos Excel (.xlsx)
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

export const upload = multer({ storage, fileFilter });
