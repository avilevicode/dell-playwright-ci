#!/bin/bash
# Run inside the Ubuntu VM after installation
# Step 3: Install dependencies and register the GitHub Actions self-hosted runner
#
# Usage:
#   chmod +x 03-setup-runner.sh
#   ./03-setup-runner.sh <GITHUB_TOKEN>
#
# Get your token from:
#   GitHub repo → Settings → Actions → Runners → New self-hosted runner → copy the token

set -e

REPO="avilevicode/dell-playwright-ci"
RUNNER_VERSION="2.322.0"
TOKEN="${1:?Usage: $0 <GITHUB_TOKEN>}"

echo "==> Installing system dependencies..."
sudo apt-get update -qq
sudo apt-get install -y -qq \
    curl \
    wget \
    git \
    unzip \
    libglib2.0-0 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2

echo "==> Installing Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "==> Creating runner directory..."
mkdir -p ~/actions-runner && cd ~/actions-runner

echo "==> Downloading GitHub Actions runner v${RUNNER_VERSION}..."
curl -sL "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz" \
    -o actions-runner.tar.gz
tar xzf actions-runner.tar.gz
rm actions-runner.tar.gz

echo "==> Configuring runner..."
./config.sh \
    --url "https://github.com/${REPO}" \
    --token "${TOKEN}" \
    --name "dell-ci-vm" \
    --labels "self-hosted,linux,dell-ci" \
    --work "_work" \
    --unattended

echo "==> Installing runner as a systemd service..."
sudo ./svc.sh install
sudo ./svc.sh start

echo ""
echo "Runner is live. Check status with:"
echo "  sudo ./svc.sh status"
echo ""
echo "It will appear in: GitHub → Settings → Actions → Runners"
