# Run as Administrator after reboot
# Step 2: Create Ubuntu 22.04 VM in Hyper-V
#
# Before running: download Ubuntu 22.04 LTS ISO from https://ubuntu.com/download/server
# and place it at C:\iso\ubuntu-22.04.iso

param(
    [string]$IsoPath = "C:\iso\ubuntu-22.04.iso",
    [string]$VmName = "dell-ci-runner",
    [string]$VhdPath = "C:\Hyper-V\$VmName\$VmName.vhdx",
    [long]$MemoryGB = 4,
    [int]$CpuCount = 2,
    [long]$DiskGB = 40
)

if (-not (Test-Path $IsoPath)) {
    Write-Error "ISO not found at $IsoPath. Download Ubuntu 22.04 Server ISO first."
    exit 1
}

# Create directory for VHD
$vhdDir = Split-Path $VhdPath
if (-not (Test-Path $vhdDir)) {
    New-Item -ItemType Directory -Path $vhdDir | Out-Null
}

Write-Host "Creating VM: $VmName" -ForegroundColor Yellow

# Create the VM
New-VM -Name $VmName `
    -Generation 2 `
    -MemoryStartupBytes ($MemoryGB * 1GB) `
    -Path "C:\Hyper-V" `
    -NewVHDPath $VhdPath `
    -NewVHDSizeBytes ($DiskGB * 1GB) `
    -SwitchName "Default Switch"

# Configure CPU
Set-VM -Name $VmName -ProcessorCount $CpuCount

# Disable secure boot (required for Ubuntu)
Set-VMFirmware -VMName $VmName -EnableSecureBoot Off

# Attach Ubuntu ISO
Add-VMDvdDrive -VMName $VmName -Path $IsoPath

# Set DVD as first boot device
$dvd = Get-VMDvdDrive -VMName $VmName
Set-VMFirmware -VMName $VmName -FirstBootDevice $dvd

Write-Host ""
Write-Host "VM '$VmName' created." -ForegroundColor Green
Write-Host "Starting VM — complete the Ubuntu installer, then run script 03." -ForegroundColor Cyan
Write-Host ""
Write-Host "Ubuntu install tips:" -ForegroundColor Yellow
Write-Host "  - Choose 'Ubuntu Server (minimized)'"
Write-Host "  - Set username: runner"
Write-Host "  - Enable OpenSSH server when prompted"
Write-Host "  - No extra snaps needed"

Start-VM -Name $VmName
vmconnect.exe localhost $VmName
