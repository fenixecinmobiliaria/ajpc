# Crear archivo cors.json
@'
[
  {
    "origin": ["http://localhost:4200", "https://jpcelectronics-52996.web.app", "https://jpcelectronics-52996.firebaseapp.com"],
    "method": ["GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS"],
    "responseHeader": ["Content-Type", "x-goog-meta-*"],
    "maxAgeSeconds": 3600
  }
]
'@ | Out-File -Encoding utf8 cors.json

Write-Host "cors.json creado correctamente."

# Aplicar CORS al bucket
Write-Host "Aplicando configuración CORS..."
gsutil cors set cors.json gs://jpcelectronics-52996.appspot.com

# Verificar
Write-Host "Configuración aplicada. Mostrando CORS actual:"
gsutil cors get gs://jpcelectronics-52996.appspot.com
