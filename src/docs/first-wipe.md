---
id: first-wipe
title: Your First Wipe
section: getting-started
order: 3
---

# Your First Wipe

This comprehensive guide walks you through performing your first secure wipe operation with Katharos.

## Step 1: Preparation

Before starting any wipe operation:

1. **Backup important data** - Ensure all important files are safely backed up
2. **Close applications** - Close any applications that might be using the target files
3. **Check permissions** - Ensure you have the necessary permissions

## Step 2: Choose Your Target

Identify what you want to securely delete:

### File Example
```bash
# Create a test file
echo "This is sensitive data" > test-file.txt

# Verify the file exists
ls -la test-file.txt
```

### Drive Example
```bash
# List available drives (Linux/macOS)
lsblk

# List drives (Windows)
wmic logicaldisk get size,freespace,caption
```

## Step 3: Select Algorithm

Choose an appropriate algorithm based on your security needs:

| Algorithm | Passes | Use Case |
|-----------|--------|----------|
| `random` | 1 | Quick deletion, low security |
| `dod` | 3 | Standard secure deletion |
| `gutmann` | 35 | Maximum security, slow |

## Step 4: Execute the Wipe

### Basic File Wipe
```bash
katharos --algorithm dod --verify test-file.txt
```

### Interactive Mode
```bash
katharos --interactive /path/to/target
```

This will prompt you for:
- Confirmation of target
- Algorithm selection
- Verification preferences

## Step 5: Monitor Progress

Watch the wipe operation in real-time:

```bash
katharos --progress --verbose --algorithm dod test-file.txt
```

Expected output:
```
Katharos v2.1.0 - Starting secure wipe operation
Target: test-file.txt (1.2 KB)
Algorithm: DoD 5220.22-M (3 passes)

Pass 1/3: Writing 0x00... [████████████████████] 100%
Pass 2/3: Writing 0xFF... [████████████████████] 100%
Pass 3/3: Writing random... [████████████████████] 100%

Verification: [████████████████████] 100%
✓ Secure wipe completed successfully
```

## Step 6: Verification

Katharos automatically verifies the wipe operation when using `--verify`:

- Checks that data is completely overwritten
- Ensures no recoverable traces remain
- Provides confirmation of successful deletion

## Troubleshooting

### Permission Denied
```bash
# Linux/macOS
sudo katharos /path/to/target

# Windows (Run as Administrator)
katharos /path/to/target
```

### File in Use
```bash
# Check what's using the file
lsof /path/to/file  # Linux/macOS
handle /path/to/file  # Windows
```

### Drive Not Found
```bash
# Refresh drive list
katharos --list-drives
```

## Best Practices

1. **Always use verification** - Add `--verify` to ensure complete deletion
2. **Test with dummy files** - Practice with non-important files first
3. **Monitor system resources** - Large operations may impact system performance
4. **Keep logs** - Use `--log-file` to maintain operation records

## Example: Complete Workflow

Here's a complete example of securely wiping a sensitive document:

```bash
# 1. Create backup (if needed)
cp sensitive-doc.pdf sensitive-doc-backup.pdf

# 2. Perform secure wipe with verification
katharos --algorithm dod --verify --progress sensitive-doc.pdf

# 3. Confirm deletion
ls -la sensitive-doc.pdf  # Should show "No such file or directory"

# 4. Check system logs
katharos --show-log
```

> **Success!** You've completed your first secure wipe operation. The file has been permanently and securely deleted.

## Next Steps

- [Secure Deletion](secure-deletion) - Learn how secure deletion algorithms work
- [Batch Operations](batch-operations) - Wipe multiple files or directories
- [Configuration](configuration) - Customize Katharos for your workflow