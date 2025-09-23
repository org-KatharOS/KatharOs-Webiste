---
id: installation
title: Installation
section: getting-started
order: 1
---

# Installation

Welcome to KatharOS, a secure disk wiping software. This guide will help you install KatharOS and prepare your bootable flash drive.

## 1. Prerequisites

### 1.1 Hardware Requirements

1. USB flash drive (minimum 4GB, 8GB+ recommended)
2. Computer with USB boot support
3. Minimum 2GB RAM

### 1.2 Software Requirements

1. ISO flashing tool:
   1. Windows: [Rufus](https://rufus.ie/)
   2. Cross-platform: [Balena Etcher](https://www.balena.io/etcher/)
2. Administrative/root privileges
3. KatharOS ISO file

## 2. Download KatharOS

1. Download the ISO file: [Download KatharOS ISO](https://www.kathara.org/download.html)

## 3. Creating Bootable USB

Once you have the ISO downloaded, follow the steps below to flash it onto a USB drive.

### 3.1 Using Rufus (Windows)

1. Download and open [Rufus](https://rufus.ie/).
2. Insert your USB flash drive.
3. Configure Rufus:
   1. **Device:** Select your USB drive
   2. **Boot selection:** Choose the KatharOS ISO file
   3. **Partition scheme:** Select `GPT`
   4. **File system:** Choose `FAT32`
4. Click **Start** and wait for the process to complete.

### 3.2 Using Balena Etcher (Cross-platform)

1. Download and install [Balena Etcher](https://www.balena.io/etcher/).
2. Open Etcher and follow the prompts:
   1. Click **Flash from file** and select the KatharOS ISO
   2. Click **Select target** and choose your USB drive
   3. Click **Flash!** and wait for the process to complete
