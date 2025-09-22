---
id: quick-start
title: Quick Start
section: getting-started
order: 2
---

# Quick Start

Get up and running with Katharos in minutes. This guide covers the essential commands to perform your first secure disk wipe.

## Basic Usage

The simplest way to use Katharos is with the default settings:

```bash
katharos /path/to/file-or-drive
```

## Common Examples

### Wipe a Single File
```bash
katharos /home/user/sensitive-document.pdf
```

### Wipe an Entire Drive
```bash
# Linux/macOS
sudo katharos /dev/sdb

# Windows
katharos D:
```

### Wipe with Verification
```bash
katharos --verify /path/to/target
```

## Algorithm Selection

Choose from multiple secure deletion algorithms:

```bash
# DoD 5220.22-M (3 passes)
katharos --algorithm dod /path/to/target

# Gutmann method (35 passes)
katharos --algorithm gutmann /path/to/target

# Random overwrite (1 pass)
katharos --algorithm random /path/to/target
```

## Progress Monitoring

Monitor the wiping progress in real-time:

```bash
katharos --progress --verbose /path/to/target
```

## Safety Features

Katharos includes several safety features:

- **Confirmation prompts** - Always confirms before wiping
- **Dry run mode** - Test commands without actual deletion
- **Backup verification** - Ensures you have backups before proceeding

### Dry Run Example
```bash
katharos --dry-run /path/to/target
```

> **Warning:** Secure deletion is irreversible. Always ensure you have proper backups before proceeding with any wipe operation.

## What's Next?

- [Your First Wipe](first-wipe) - Detailed walkthrough of a complete wipe operation
- [Secure Deletion](secure-deletion) - Understanding how secure deletion works
- [Multiple Algorithms](multiple-algorithms) - Choosing the right algorithm for your needs