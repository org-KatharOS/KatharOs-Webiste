---
id: secure-deletion
title: Secure Deletion
section: features
order: 1
---

# Secure Deletion

Understanding how Katharos ensures your data is permanently and securely deleted.

## Why Secure Deletion Matters

When you delete a file normally, the operating system only removes the file's entry from the directory table. The actual data remains on the disk until it's overwritten by new data, making it potentially recoverable with specialized tools.

## How Katharos Works

Katharos performs secure deletion by:

1. **Overwriting data** - Replaces original data with patterns
2. **Multiple passes** - Repeats the process to ensure complete removal
3. **Verification** - Confirms data has been properly overwritten
4. **Metadata cleanup** - Removes file system metadata

## Deletion Algorithms

### DoD 5220.22-M (Recommended)
```bash
katharos --algorithm dod /path/to/file
```

- **Passes:** 3
- **Pattern:** 0x00, 0xFF, Random
- **Security:** High
- **Speed:** Fast
- **Use case:** Most secure deletion needs

### Gutmann Method
```bash
katharos --algorithm gutmann /path/to/file
```

- **Passes:** 35
- **Pattern:** Complex sequence of patterns
- **Security:** Maximum
- **Speed:** Very slow
- **Use case:** Extremely sensitive data

### Random Overwrite
```bash
katharos --algorithm random /path/to/file
```

- **Passes:** 1
- **Pattern:** Cryptographically secure random data
- **Security:** Good
- **Speed:** Very fast
- **Use case:** Quick deletion with reasonable security

## Verification Process

Katharos includes built-in verification to ensure deletion success:

```bash
katharos --verify --algorithm dod /path/to/file
```

The verification process:
1. Reads the overwritten sectors
2. Confirms no original data patterns remain
3. Validates the overwrite patterns are correct
4. Reports any verification failures

## Security Considerations

### SSD vs HDD

**Hard Disk Drives (HDD):**
- Traditional overwriting methods are effective
- Multiple passes provide additional security
- Magnetic traces are eliminated

**Solid State Drives (SSD):**
- Wear leveling may leave data in unmapped sectors
- TRIM command support is important
- Consider full disk encryption as additional protection

### File System Impact

Different file systems handle deletion differently:

- **NTFS** - Supports secure deletion features
- **ext4** - Good compatibility with overwrite methods
- **APFS** - Modern features but requires special handling

## Best Practices

1. **Use appropriate algorithms** - DoD for most cases, Gutmann for maximum security
2. **Enable verification** - Always verify deletion success
3. **Consider full disk encryption** - Adds an extra layer of protection
4. **Regular secure deletion** - Don't let sensitive data accumulate

## Example: Maximum Security Deletion

For extremely sensitive data:

```bash
# Step 1: Encrypt the file first (optional but recommended)
gpg --symmetric --cipher-algo AES256 sensitive-file.txt

# Step 2: Secure delete with maximum security
katharos --algorithm gutmann --verify --progress sensitive-file.txt.gpg

# Step 3: Clear system caches
sync && echo 3 > /proc/sys/vm/drop_caches  # Linux
```

> **Note:** Even with secure deletion, consider the entire data lifecycle including backups, temporary files, and system caches.

## Technical Details

### Overwrite Patterns

Different algorithms use specific patterns:

| Algorithm | Pass 1 | Pass 2 | Pass 3 | Additional |
|-----------|--------|--------|--------|------------|
| DoD | 0x00 | 0xFF | Random | - |
| Random | Random | - | - | - |
| Gutmann | Complex 35-pass sequence | | | |

### Performance Impact

Factors affecting deletion speed:
- **Storage type** - SSDs are generally faster than HDDs
- **File size** - Larger files take proportionally longer
- **Algorithm** - More passes = longer time
- **System load** - Other processes can slow deletion

## Compliance

Katharos algorithms meet various compliance standards:

- **DoD 5220.22-M** - US Department of Defense standard
- **NIST 800-88** - National Institute of Standards guidelines
- **Common Criteria** - International security evaluation standard