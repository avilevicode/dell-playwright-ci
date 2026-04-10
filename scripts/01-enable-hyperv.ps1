# Run as Administrator
# Step 1: Enable Hyper-V

$feature = Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All

if ($feature.State -eq 'Enabled') {
    Write-Host "Hyper-V is already enabled." -ForegroundColor Green
} else {
    Write-Host "Enabling Hyper-V..." -ForegroundColor Yellow
    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All -All
    Write-Host "Restart required. Run script 02 after reboot." -ForegroundColor Cyan
}
