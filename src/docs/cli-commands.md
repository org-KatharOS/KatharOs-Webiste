---
id: cli-commands
title: CLI Commands
section: api
order: 1
---

# CLI Commands

Complete reference for all Katharos command-line interface options.

## Basic Syntax

```bash
katharos [OPTIONS] TARGET [TARGET...]
```

## Global Options

### Help and Information
```bash
katharos --help              # Show help message
katharos --version           # Show version information
katharos --list-algorithms   # List available algorithms
katharos --list-drives       # List available drives
```

### Algorithm Selection
```bash
katharos --algorithm ALGO TARGET
katharos -a ALGO TARGET      # Short form

# Available algorithms:
# - random: Single pass with random data
# - dod: DoD 5220.22-M (3 passes)
# - gutmann: Gutmann method (35 passes)
```

### Verification Options
```bash
katharos --verify TARGET           # Enable verification
katharos --no-verify TARGET        # Disable verification (default)
katharos --verify-passes N TARGET  # Custom verification passes
```

### Progress and Output
```bash
katharos --progress TARGET         # Show progress bar
katharos --verbose TARGET          # Verbose output
katharos --quiet TARGET            # Minimal output
katharos --silent TARGET           # No output except errors
```

### Safety Options
```bash
katharos --dry-run TARGET          # Simulate operation without deletion
katharos --interactive TARGET      # Interactive mode with prompts
katharos --force TARGET            # Skip confirmation prompts
katharos --no-confirm TARGET       # Alias for --force
```

## Target Specification

### File Targets
```bash
katharos file.txt                  # Single file
katharos file1.txt file2.txt       # Multiple files
katharos *.txt                     # Wildcard patterns
katharos /path/to/file             # Absolute path
katharos ./relative/path           # Relative path
```

### Directory Targets
```bash
katharos --recursive /path/to/dir  # Recursive directory deletion
katharos -r /path/to/dir           # Short form
katharos --depth N /path/to/dir    # Limit recursion depth
```

### Drive Targets
```bash
# Linux/macOS
katharos /dev/sdb                  # Entire drive
katharos /dev/sdb1                 # Specific partition

# Windows
katharos D:                        # Drive letter
katharos \\.\PhysicalDrive1        # Physical drive
```

## Advanced Options

### Logging
```bash
katharos --log-file /path/to/log TARGET    # Custom log file
katharos --log-level LEVEL TARGET          # Log level (debug, info, warn, error)
katharos --no-log TARGET                   # Disable logging
katharos --show-log                        # Display recent log entries
```

### Performance
```bash
katharos --threads N TARGET        # Number of threads to use
katharos --buffer-size SIZE TARGET # I/O buffer size (KB/MB/GB)
katharos --priority LEVEL TARGET   # Process priority (low, normal, high)
```

### Pattern Customization
```bash
katharos --pattern HEX TARGET      # Custom hex pattern (e.g., 0xDEADBEEF)
katharos --random-source FILE TARGET # Custom random source
katharos --passes N TARGET         # Custom number of passes
```

## Examples

### Basic File Deletion
```bash
# Simple file deletion with default settings
katharos document.pdf

# With verification
katharos --verify document.pdf

# Multiple files
katharos --algorithm dod --verify file1.txt file2.txt file3.txt
```

### Directory Operations
```bash
# Recursive directory deletion
katharos --recursive --algorithm dod /tmp/sensitive-data/

# Limit recursion depth
katharos --recursive --depth 2 /home/user/old-projects/

# Interactive mode for safety
katharos --recursive --interactive /path/to/directory/
```

### Drive Operations
```bash
# Full drive wipe (Linux)
sudo katharos --algorithm gutmann --verify /dev/sdb

# Windows drive wipe (run as Administrator)
katharos --algorithm dod --progress D:

# Dry run to test
katharos --dry-run --algorithm dod /dev/sdb
```

### Advanced Usage
```bash
# Maximum security with custom settings
katharos --algorithm gutmann --verify --verify-passes 3 \
         --threads 4 --buffer-size 1MB --log-level debug \
         --log-file /var/log/katharos.log sensitive-file.txt

# Batch operation with progress monitoring
katharos --recursive --algorithm dod --progress --verbose \
         --log-file batch-operation.log /path/to/batch/
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |
| 3 | Permission denied |
| 4 | File not found |
| 5 | Verification failed |
| 6 | Operation cancelled |
| 7 | Insufficient disk space |
| 8 | Hardware error |

## Configuration File

Katharos supports configuration files for default settings:

### Location
- Linux/macOS: `~/.config/katharos/config.toml`
- Windows: `%APPDATA%\Katharos\config.toml`

### Example Configuration
```toml
[default]
algorithm = "dod"
verify = true
progress = true
log_level = "info"

[performance]
threads = 4
buffer_size = "1MB"

[safety]
interactive = false
dry_run = false
```

### Override Configuration
```bash
katharos --config /path/to/custom/config.toml TARGET
katharos --no-config TARGET  # Ignore configuration file
```

## Environment Variables

```bash
export KATHAROS_ALGORITHM=dod       # Default algorithm
export KATHAROS_VERIFY=true         # Enable verification by default
export KATHAROS_LOG_LEVEL=info      # Default log level
export KATHAROS_CONFIG=/path/config # Custom config file path
```

## Shell Integration

### Bash Completion
```bash
# Install completion
katharos --install-completion bash

# Manual completion
complete -W "$(katharos --list-algorithms)" katharos
```

### Aliases
```bash
# Common aliases
alias secure-delete='katharos --algorithm dod --verify'
alias quick-wipe='katharos --algorithm random'
alias max-security='katharos --algorithm gutmann --verify'
```