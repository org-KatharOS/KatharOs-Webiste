---
id: quick-start
title: Quick Start
section: getting-started
order: 2
---

# Quick Start Guide

After successfully booting into Katharos, you can securely wipe your drives in just a few steps.

## 1. Scan Drives

1. On the **main dashboard**, click **Scan Drives →**.
2. Katharos will detect all connected storage devices.
3. The drives will be displayed in an **interactive table** showing:

   - Model
   - Type (HDD, SSD, USB)
   - Size
   - Mount status
   - Available wipe methods

   - Encryption time

> **Tip:** Use your keyboard (arrow keys, Enter, Escape) or mouse to navigate and select drives.

## 2. Select a Drive

1. Click on the drive you want to wipe.
2. A **details panel** will appear showing the available wipe methods for that drive.
3. Confirm the drive is correct before proceeding.

## 3. Configure Wipe

1. Click **Configure Wipe** to open the wipe settings modal.
2. Select the **wipe method**:

   - **Zero Fill:** Overwrites with zeros (for USB/external drives)
   - **Random Data:** Overwrites with random data
   - **Multi-pass:** Multiple overwrites (for HDDs)
   - **ATA Secure Erase:** For SATA SSDs
   - **NVMe Secure Erase:** For NVMe drives
   - **Cryptographic Erase:** Destroys encryption keys for encrypted drives

3. For HDDs, select the **number of passes** if using multi-pass.

## 4. Safety Confirmations

1. A **warning modal** will appear confirming the selected drive and method.
2. Review the details carefully — wiping is irreversible.
3. Click **Confirm** to proceed.
4. Optionally, you can **abort** at any time before the wipe starts.

## 5. Start Wipe & Track Progress

1. Click **Start Wipe**.
2. The progress screen will display:

   - Actual bytes written
   - Percentage completion
   - Current and total passes
   - Device full detection

3. Progress is updated **in real-time** via WebSocket.

> **Note:** For SSDs using Secure Erase, progress may be estimated.

## 6. Completion & Certificate

1. Once the wipe is finished, the **success screen** will appear.
2. Certificates are saved to:
   `/tmp/katharos/certificates`

3. If you selected **email delivery**, the certificate will be sent automatically via Gmail.

- Certificates include:
  - Device info (model, serial, size)
  - Wipe method
  - Start/end timestamps and duration
  - Completion status
  - SHA-256 hash for verification
