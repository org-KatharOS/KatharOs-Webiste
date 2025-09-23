---
id: common-issues
title: Common Issues
section: troubleshooting
order: 2
---

# Common Issues

## 1. ISO Won’t Boot

- Check your **BIOS/UEFI boot order** and enable USB boot.
- Verify that the USB flash drive is properly created and not corrupted, if so flash it again.
- Try another USB port or another USB drive.

## 2. Drive Not Detected

- Ensure the drive is properly connected.
- Use the **Scan Drives →** button again to refresh detection.
- Check BIOS/UEFI to confirm the drive is visible at the hardware level.
- Check partition status.

## 3. Wipe Progress Stuck

- Some SSD Secure Erase commands display estimated progress; allow extra time.
- If progress truly stalls, stop the wipe and retry after verifying the device health.

## 4. Certificate Not Sent / Missing

- Certificates are always saved locally at `/tmp/katharos/certificates/`
  check there first.
- Ensure your system has **internet access** if using email delivery.

## 5. Application Errors

- Restart the system and boot again from the KatharOS ISO.
- Check that the drive is not **busy or mounted elsewhere**.
