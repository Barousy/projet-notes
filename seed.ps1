# Script PowerShell pour exécuter le seed
Write-Host "🌱 Exécution du script de seed..." -ForegroundColor Green

# Essayer différents chemins possibles pour Node.js
$nodePaths = @(
    "C:\Program Files\nodejs\node.exe",
    "C:\Program Files (x86)\nodejs\node.exe",
    "C:\Users\$env:USERNAME\AppData\Local\Programs\nodejs\node.exe",
    "C:\Users\$env:USERNAME\AppData\Roaming\npm\node.exe"
)

$nodeFound = $false
foreach ($path in $nodePaths) {
    if (Test-Path $path) {
        Write-Host "✅ Node.js trouvé: $path" -ForegroundColor Green
        & $path prisma/seed.mjs
        $nodeFound = $true
        break
    }
}

if (-not $nodeFound) {
    Write-Host "❌ Node.js non trouvé. Veuillez installer Node.js ou l'ajouter au PATH." -ForegroundColor Red
    Write-Host "Téléchargez Node.js depuis: https://nodejs.org/" -ForegroundColor Yellow
}
