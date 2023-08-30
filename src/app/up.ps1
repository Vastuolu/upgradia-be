param (
    [string]$folderName,
        [string]$name
	)

if (-not $folderName -or -not $name) {
	    Write-Host "Usage: up.ps1 -folderName <folder_name> -name <user>"
	        exit 1
}

$currentDir = Get-Location

$newDirPath = Join-Path -Path $currentDir -ChildPath $folderName
New-Item -ItemType Directory -Path $newDirPath | Out-Null
Set-Location -Path $newDirPath

$sampleContent = "This is a sample content for $folderName."
$sampleContent | Set-Content -Path "SampleFile.txt"

$controllerContent = "This is the controller content for $name."
$controllerContent | Set-Content -Path "controller.$name.ts"

$serviceContent = "This is the service content for $name."
$serviceContent | Set-Content -Path "service.$name.ts"

$interfaceContent = "This is the interface content for $name."
$interfaceContent | Set-Content -Path "interfaces.$name.ts"

$routesContent = "This is the routes content for $name."
$routesContent | Set-Content -Path "routes.$name.ts"

Write-Host "New directory '$folderName' and files created successfully!"
