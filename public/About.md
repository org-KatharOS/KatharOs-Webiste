What is Katharos?
Katharos is a secure data-sanitization solution distributed as a bootable custom Debian ISO containing:
• Electron application with React + TypeScript for a responsive, user-friendly interface
• Python backend engine with WebSocket-based real-time communication for live progress updates
• Multiple wiping methods: dd, nwipe, ATA Secure Erase, NVMe Secure Erase with real progress tracking
• Gmail-based certificate delivery system with automatic latest certificate detection
• Comprehensive safety measures with device unmounting and process cleanup
It's designed to help individuals, businesses and recyclers safely dispose or resale IT assets without fear of data recovery, featuring modern UI/UX with dark theme and accessibility support. Users boot from the ISO to access the complete wiping solution.

---

Why Katharos? — The Problem It Solves
• Millions of devices are hoarded because users fear data breaches from discarded drives.
• Existing tools are either complex, limited to experts, or lack tamper-proof certificates.
• Katharos makes secure wiping accessible, auditable, and trustworthy for general public and organizations — supporting e-waste reduction and the circular economy.

---

Timeline

1. Boot from ISO

User Flow: The process begins when the user boots their computer from the Katharos Debian-based ISO. The Katharos application auto-launches without requiring installation.

Behind the Scenes:

Bootable Debian ISO built with live-build.

Auto-starts the Electron desktop application on launch.

Tech Stack:

Debian ISO build

Electron 30.0.1, React 18.2.0, TypeScript

TailwindCSS noir theme for responsive styling

2. Real-Time Connection

User Flow: Katharos establishes a live connection to its backend, enabling seamless communication.

Behind the Scenes:

Electron frontend connects to a Python WebSocket server running at localhost:8080.

Maintains a two-way JSON-based message protocol for control and updates.

Tech Stack:

Python 3.13+, asyncio, websockets 11.0.3

JSON message protocol with ApiResponse format

3. Scan Drives

User Flow: User clicks “Scan Drives →” to enumerate all connected storage devices.

Behind the Scenes:

Python backend calls psutil + Linux utilities (lsblk, fdisk, blockdev) to scan drives.

Drive info (size, type, status) is sent to the frontend.

Tech Stack:

psutil 5.9.6, blockdev, lsblk, fdisk

Data table in React with Tailwind styling

4. Select Drive

User Flow: User selects the desired drive from an interactive data table with keyboard/mouse navigation.

Behind the Scenes:

Device selection triggers a get_drive_methods WebSocket command.

Backend responds with available wiping methods for that device.

Tech Stack:

React Table / custom grid

WebSocket JSON API for method retrieval

5. Configure Wipe

User Flow: User configures wiping preferences—method (e.g., DoD, Gutmann, Zero-fill), number of passes, and certificate options.

Behind the Scenes:

Configuration is passed to backend for execution planning.

Supports multiple wipe engines including dd, nwipe, secure erase, and cryptographic erase.

Tech Stack:

DDWrapper for dd

NwipeWrapper for nwipe

hdparm, nvme-cli, cryptsetup for hardware-supported erase

6. Safety Confirmations

User Flow: User must confirm their intent through sequential warnings and confirmations before wiping starts.

Behind the Scenes:

React modals with confirmation logic prevent accidental wipes.

Backend validates device state before execution.

Tech Stack:

Framer Motion for animated modals

React state management + backend validation

7. Real-Time Wiping

User Flow: The wipe process begins with live progress updates and an animated progress bar.

Behind the Scenes:

Backend executes wipe using chosen engine (dd/nwipe/etc.).

dd stderr parsing provides bytes written and percentage.

WebSocket streams progress to frontend.

Tech Stack:

dd with status=progress, nwipe, hardware erase tools

WebSocket real-time updates

React + TailwindCSS progress bar

8. Certificate Generation

User Flow: Once the wipe completes, Katharos generates a signed certificate of erasure in multiple formats.

Behind the Scenes:

Certificates (HTML, PDF, JSON) stored at /tmp/katharos/certificates.

Optional email delivery via Gmail API.

Tech Stack:

WeasyPrint for PDF

HTML templates + JSON metadata

Gmail API + OAuth2 for secure email delivery

9. Completion

User Flow: A success screen shows the certificate location and confirms email delivery (if enabled).

Behind the Scenes:

Certificate logs stored locally.

Wipe process cleanup ensures device unmounting and sync.

Tech Stack:

Process cleanup utilities, sync command

React success screen UI


------

Key Features — What the User Sees
Feature What it does
Bootable ISO Application Custom Debian ISO with pre-installed Electron app featuring modern React interface and dark noir theme.
Smart Device Detection Auto-detects and lists all connected drives with detailed information (model, type, size, mount status, device path).
Interactive Drive Selection Data table-based drive listing with keyboard navigation (arrow keys, Enter, Escape) and click selection.
Dynamic Wipe Methods Method selection based on drive type and encryption status - cryptographic erase for encrypted drives, secure erase for SSDs, multi-pass for HDDs.
Real-time Progress Tracking Live progress updates via WebSocket with actual bytes written, percentage calculation, current/total passes, device full detection, and animated progress bar.
Tamper-proof Certificates Signed certificates stored locally at /tmp/katheros/certificates with optional email delivery.
Safety UX Multiple confirmation modals (warning → confirmation), clear destructive action warnings, and graceful abort handling.
Email Integration Gmail API-based certificate delivery with OAuth2, automatic latest certificate detection, and success confirmation.
Modern UI/UX Responsive design with custom CSS variables, smooth animations, hover effects, and accessibility features.
Keyboard Shortcuts Full keyboard navigation support for drive selection and modal interactions.

---

How Certificates Work — Current Implementation

1. Wipe Execution: Real-time monitoring of dd/nwipe processes with progress tracking and completion detection.
2. Data Capture: Device info (model, serial, size), wipe method, start/end timestamps, duration, status.
3. Certificate Generation: HTML template rendering, PDF conversion via WeasyPrint, JSON metadata storage with SHA-256 hashing.
4. File Storage: Certificates saved to /tmp/katheros/certificates/ with unique IDs (KATH-YYYYMMDD-HHMMSS).
5. Integrity Protection: SHA-256 hash generation for certificate data to ensure tamper detection.
6. Email Delivery: Gmail API integration finds latest certificate by modification time and sends to user.
7. Verification: Certificate includes all wipe parameters, timestamps, SHA-256 hash, and completion status for audit trail.
   Current Status: Certificate generation with SHA-256 hashing implemented. Future: Digital signatures, blockchain anchoring, public verification portal.

---

**Device-specific Wiping & Verification Logic**
**USB/External Drives**
• Method: dd zero fill or random data with real-time progress tracking
• Verify: Process exit codes (0 or 1 for ENOSPC), device full detection
• Progress: Actual bytes written parsed from dd stderr output
**HDD (rotational)**
• Method: Multi-pass overwrite with dd, configurable pass count
• Verify: dd exit codes, bytes written verification, filesystem sync
• Progress: Per-pass tracking with total progress calculation
**SATA SSD**
• Method: ATA Secure Erase via hdparm OR dd overwrite as fallback
• Verify: hdparm success codes, dd completion verification
• Progress: Command completion status, estimated progress for secure erase
**NVMe SSD**
• Method: NVMe sanitize commands via nvme-cli OR dd overwrite
• Verify: nvme-cli exit codes, sanitize completion status
• Progress: Command status monitoring, completion detection
**Encrypted Drives (All Types)**
• Method: Cryptographic erase via key destruction - detects LUKS encryption and destroys encryption keys
• Verify: LUKS header destruction verification, cryptsetup status checks
• Progress: Key destruction and header overwrite completion
• Advantage: Instant secure erase regardless of drive size - renders all data unrecoverable
Safety Measures
• Device Detection: Automatic drive type detection via lsblk and device paths
• Unmount Safety: All partitions unmounted before wiping begins
• Process Monitoring: Real-time progress with stuck detection and cleanup
• Error Recovery: Graceful handling of device busy, permission, and hardware errors

---

How Katharos Is Different — Competitive Positioning

| Tool               | Katharos                       | DBAN / nwipe      | Vendor Tools    |
| ------------------ | ------------------------------ | ----------------- | --------------- |
| Bootable Solution  | Custom Debian ISO + Modern GUI | Basic bootable    | Linux Varies    |
| Real-time Progress | WebSocket + cli parsing        | Basic text output | Limited         |
| Email Certificates | Gmail API integration          | No certificates   | Local only      |
| Multi-platform     | Bootable on any system         | Linux bootable    | Vendor specific |
| Safety Features    | Auto-unmount + cleanup         | Basic             | Varies          |
| UI/UX              | React + TypeScript             | CLI/ncurses       | Vendor GUIs     |

Katharos combines the power of professional wiping tools with modern desktop UX and automated certificate delivery — making secure data destruction accessible to everyone.

---


---

Implementation Details — Current Status

Backend Engine (Python)
• WebSocket Server: Runs on localhostwith JSON message protocol
• API integration for communication between App and Engine.
• Progress Updates: Real-time WebSocket broadcasts with ApiResponse format consistency
• DD Wrapper: Parses dd stderr for actual bytes written, handles ENOSPC detection, multi-pass support
• Device Safety: Automatic unmounting via lsblk, force unmount fallback, filesystem sync
• Process Management: Graceful termination, force kill fallback, file descriptor cleanup

Wipe Methods Supported
• Zero Fill: dd if=/dev/zero with real progress tracking
• Random Data: dd if=/dev/urandom with bytes written monitoring
• ATA Secure Erase: hdparm-based secure erase for SATA SSDs
• NVMe Secure Erase: nvme-cli sanitize commands for NVMe drives
• Cryptographic Erase: Automatic detection of LUKS encryption with key destruction for instant secure wipe
• Multi-pass: Configurable pass count with per-pass progress tracking

Certificate System
• Storage: /tmp/katheros/certificates/ with HTML, PDF, and JSON formats
• Content: Device info, wipe method, start/end times, duration, status
• Email Delivery: Gmail API with OAuth2, sends latest generated certificate
• Automatic Detection: Finds most recent certificate by modification time

Safety Features
• Device Unmounting: Checks lsblk output, unmounts all partitions before wiping
• Process Cleanup: Terminates dd processes, closes file descriptors, runs filesystem sync
• Error Handling: Graceful failure handling, proper error messages, cleanup on failure
• Test Mode: Simulated wiping for development and testing without touching devices

Frontend Integration
• WebSocket Client: Connects to localhost:8080 for real-time communication
• Progress Display: Shows actual progress percentage, current/total passes, bytes written
• Email Form: Input validation for certificate delivery via email
• Type Safety: Proper TypeScript interfaces for all API responses and data structures

---

Deployment & Distribution

Development Setup
• Backend: Python 3.13+ with asyncio, websockets, psutil dependencies
• Frontend: Node.js with Electron, React, TypeScript, Tailwind CSS
• Email Service: Gmail API credentials (OAuth2) for certificate delivery
• Testing: Test mode for safe development without touching real devices
• ISO Building: Custom Debian live-build configuration with application integration

Production Distribution
• Bootable ISO: Custom Debian-based live system with Katharos pre-installed and configured
• Auto-launch: Application starts automatically on boot with backend services
• Credentials: Embedded Gmail API credentials for certificate delivery functionality
• User Distribution: Single ISO file download - users boot directly from USB/DVD
• No Installation Required: Complete solution runs from live environment

Security Considerations
• Gmail Credentials: OAuth2 tokens embedded in ISO, secure credential management
• Sudo Access: Pre-configured in live environment for dd operations, device access, unmounting partitions
• Process Isolation: Proper cleanup, graceful termination, resource management
• Certificate Storage: Temporary storage at /tmp/katheros/certificates, email delivery for persistence
• Live Environment: No persistent storage on host system, certificates only saved via email delivery
• ISO Integrity: Checksums and digital signatures for ISO verification and authenticity
