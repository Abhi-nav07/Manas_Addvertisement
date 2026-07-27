# Compare frontend files
Write-Output "=== FRONTEND COMPARISON ==="
Get-ChildItem -Path 'P:\M-Add\_zip_extract\M-Add-updated\manas-advertising\src' -Recurse -File | ForEach-Object {
    $zipFile = $_.FullName
    $relPath = $_.FullName.Replace('P:\M-Add\_zip_extract\M-Add-updated\manas-advertising\src\', '')
    $existFile = Join-Path 'P:\M-Add\manas-advertising\src' $relPath
    if (Test-Path $existFile) {
        $zipHash = (Get-FileHash $zipFile -Algorithm MD5).Hash
        $existHash = (Get-FileHash $existFile -Algorithm MD5).Hash
        if ($zipHash -ne $existHash) {
            $zipSize = (Get-Item $zipFile).Length
            $existSize = (Get-Item $existFile).Length
            Write-Output "DIFFER: $relPath (zip: $zipSize, existing: $existSize)"
        }
    } else {
        Write-Output "NEW: $relPath"
    }
}

# Check for files that exist in project but not in ZIP
Write-Output "`n=== FILES ONLY IN EXISTING PROJECT ==="
Get-ChildItem -Path 'P:\M-Add\manas-advertising\src' -Recurse -File | ForEach-Object {
    $existFile = $_.FullName
    $relPath = $_.FullName.Replace('P:\M-Add\manas-advertising\src\', '')
    $zipFile = Join-Path 'P:\M-Add\_zip_extract\M-Add-updated\manas-advertising\src' $relPath
    if (-not (Test-Path $zipFile)) {
        Write-Output "ONLY_EXISTING: $relPath"
    }
}

Write-Output "`n=== BACKEND COMPARISON ==="
Get-ChildItem -Path 'P:\M-Add\_zip_extract\M-Add-updated\manas-backend\src' -Recurse -File | ForEach-Object {
    $zipFile = $_.FullName
    $relPath = $_.FullName.Replace('P:\M-Add\_zip_extract\M-Add-updated\manas-backend\src\', '')
    $existFile = Join-Path 'P:\M-Add\manas-backend\src' $relPath
    if (Test-Path $existFile) {
        $zipHash = (Get-FileHash $zipFile -Algorithm MD5).Hash
        $existHash = (Get-FileHash $existFile -Algorithm MD5).Hash
        if ($zipHash -ne $existHash) {
            Write-Output "DIFFER: $relPath"
        }
    } else {
        Write-Output "NEW: $relPath"
    }
}

# Compare config files
Write-Output "`n=== CONFIG FILES ==="
$configFiles = @('package.json', 'tsconfig.json', 'next.config.mjs', 'tailwind.config.ts', '.eslintrc.json', 'postcss.config.mjs')
foreach ($f in $configFiles) {
    $zipFile = "P:\M-Add\_zip_extract\M-Add-updated\manas-advertising\$f"
    $existFile = "P:\M-Add\manas-advertising\$f"
    if ((Test-Path $zipFile) -and (Test-Path $existFile)) {
        $zipHash = (Get-FileHash $zipFile -Algorithm MD5).Hash
        $existHash = (Get-FileHash $existFile -Algorithm MD5).Hash
        if ($zipHash -ne $existHash) {
            Write-Output "DIFFER: manas-advertising/$f"
        }
    } elseif (Test-Path $zipFile) {
        Write-Output "NEW: manas-advertising/$f"
    }
}
