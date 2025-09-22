---
id: installation
title: Installation
section: getting-started
order: 1
---

# Installation

Welcome to Katharos, the secure disk wiping utility. This guide will help you install Katharos on your system.

## Prerequisites

Before installing Katharos, ensure you have:

- Administrator/root privileges
- At least 50MB of free disk space
- A supported operating system (Windows, macOS, Linux)

## Download Options

### Option 1: Direct Download

Download the latest release from our official website:

```bash
# Windows
curl -O https://releases.katharos.dev/latest/katharos-windows.exe

# macOS
curl -O https://releases.katharos.dev/latest/katharos-macos.dmg

# Linux
curl -O https://releases.katharos.dev/latest/katharos-linux.tar.gz
```

### Option 2: Package Managers

#### Windows (Chocolatey)
```powershell
choco install katharos
```

#### macOS (Homebrew)
```bash
brew install katharos
```

#### Linux (APT)
```bash
sudo apt update
sudo apt install katharos
```

## Verification

After installation, verify Katharos is working correctly:

```bash
katharos --version
```

You should see output similar to:
```
Katharos v2.1.0 - Secure Disk Wiping Utility
```

> **Important:** Always run Katharos with administrator privileges to ensure proper disk access and secure deletion capabilities.

## Next Steps

- [Quick Start Guide](quick-start) - Get started with your first secure wipe
- [Configuration](configuration) - Customize Katharos settings
- [CLI Commands](cli-commands) - Complete command reference