/* ═══════════════════════════════════════════════════════════════════════════
   PowerShell & Scripting Ultimate Guide - JavaScript
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeSearch();
    initializeCopyButtons();
    initializeMobileToggle();
    highlightCurrentPage();
});

/* ─────────────────────────────────────────────────────────────────────────────
   Sidebar Navigation
   ───────────────────────────────────────────────────────────────────────────── */
function initializeSidebar() {
    const sections = document.querySelectorAll('.nav-section');
    const STORAGE_KEY = 'ps-guide-sidebar-state';
    
    // Load saved state from localStorage
    let savedState = {};
    try {
        savedState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
        savedState = {};
    }
    
    sections.forEach((section, index) => {
        const header = section.querySelector('.nav-section-header');
        const sectionId = section.dataset.section || `section-${index}`;
        
        // Apply saved state
        if (savedState[sectionId] === true) {
            section.classList.add('collapsed');
        }
        
        // Toggle on click
        header.addEventListener('click', function() {
            section.classList.toggle('collapsed');
            
            // Save state
            savedState[sectionId] = section.classList.contains('collapsed');
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
            } catch (e) {
                console.warn('Could not save sidebar state');
            }
        });
    });
    
    // Auto-expand section containing current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentLink = document.querySelector(`.nav-link[href="${currentPage}"]`);
    
    if (currentLink) {
        const parentSection = currentLink.closest('.nav-section');
        if (parentSection) {
            parentSection.classList.remove('collapsed');
            const sectionId = parentSection.dataset.section;
            if (sectionId) {
                savedState[sectionId] = false;
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
                } catch (e) {}
            }
        }
    }
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ─────────────────────────────────────────────────────────────────────────────
   Search Functionality
   ───────────────────────────────────────────────────────────────────────────── */
const searchIndex = [
    // Section 1: Scripting Fundamentals
    { title: 'Scripting Overview', section: 'Fundamentals', href: '1-1-scripting-overview.html', keywords: 'scripting programming interpreted compiled' },
    { title: 'Choosing the Right Tool', section: 'Fundamentals', href: '1-2-choosing-right-tool.html', keywords: 'powershell bash python batch comparison' },
    { title: 'Terminal Basics', section: 'Fundamentals', href: '1-3-terminal-basics.html', keywords: 'terminal command prompt navigation cd dir' },
    { title: 'Shell Comparison', section: 'Fundamentals', href: '1-4-shell-comparison.html', keywords: 'cmd powershell bash features comparison' },
    { title: 'Script Execution', section: 'Fundamentals', href: '1-5-script-execution.html', keywords: 'execution policies permissions signing shebang' },
    { title: 'Variables & Data Types', section: 'Fundamentals', href: '1-6-variables-datatypes.html', keywords: 'variables data types casting conversion' },
    { title: 'Operators', section: 'Fundamentals', href: '1-7-operators.html', keywords: 'arithmetic comparison logical operators' },
    { title: 'Control Flow', section: 'Fundamentals', href: '1-8-control-flow.html', keywords: 'if else switch loops for while' },
    { title: 'Functions & Modules', section: 'Fundamentals', href: '1-9-functions-modules.html', keywords: 'functions modules parameters scope' },
    { title: 'Error Handling', section: 'Fundamentals', href: '1-10-error-handling.html', keywords: 'try catch finally error exception' },
    { title: 'Input/Output', section: 'Fundamentals', href: '1-11-input-output.html', keywords: 'input output file io pipeline' },
    { title: 'Debugging', section: 'Fundamentals', href: '1-12-debugging.html', keywords: 'debugging breakpoints troubleshooting verbose' },
    
    // Section 2: PowerShell Deep Dive
    { title: 'PowerShell Introduction', section: 'PowerShell', href: '2-1-powershell-intro.html', keywords: 'powershell monad history ps core' },
    { title: 'Cmdlet Anatomy', section: 'PowerShell', href: '2-2-cmdlet-anatomy.html', keywords: 'cmdlet verb noun get-command get-help' },
    { title: 'Pipeline Mastery', section: 'PowerShell', href: '2-3-pipeline-mastery.html', keywords: 'pipeline where-object select-object sort' },
    { title: 'Objects & Properties', section: 'PowerShell', href: '2-4-objects-properties.html', keywords: 'objects properties methods get-member pscustomobject' },
    { title: 'Providers & Drives', section: 'PowerShell', href: '2-5-providers-drives.html', keywords: 'psdrive registry certificate provider' },
    { title: 'WMI & CIM', section: 'PowerShell', href: '2-6-wmi-cim.html', keywords: 'wmi cim get-wmiobject get-ciminstance' },
    { title: 'Remoting', section: 'PowerShell', href: '2-7-remoting.html', keywords: 'remoting psremoting enter-pssession invoke-command winrm' },
    { title: 'Modules Management', section: 'PowerShell', href: '2-8-modules-management.html', keywords: 'modules psgallery find-module install-module' },
    { title: 'Profile Customization', section: 'PowerShell', href: '2-9-profile-customization.html', keywords: 'profile customization prompt aliases' },
    { title: 'Regex in PowerShell', section: 'PowerShell', href: '2-10-regex-powershell.html', keywords: 'regex match replace pattern' },
    { title: 'File Operations', section: 'PowerShell', href: '2-11-file-operations.html', keywords: 'file get-content csv json xml' },
    { title: 'Registry Operations', section: 'PowerShell', href: '2-12-registry-operations.html', keywords: 'registry hklm hkcu persistence' },
    { title: 'Services & Processes', section: 'PowerShell', href: '2-13-services-processes.html', keywords: 'services processes get-process get-service' },
    { title: 'Scheduled Tasks', section: 'PowerShell', href: '2-14-scheduled-tasks.html', keywords: 'scheduled tasks scheduledtask persistence' },
    { title: 'Event Log Analysis', section: 'PowerShell', href: '2-15-eventlog-analysis.html', keywords: 'eventlog security log get-winevent' },
    { title: 'Active Directory', section: 'PowerShell', href: '2-16-active-directory.html', keywords: 'active directory ad get-aduser ldap' },
    { title: 'Networking Commands', section: 'PowerShell', href: '2-17-networking-commands.html', keywords: 'networking test-connection ping dns' },
    { title: 'Web Requests', section: 'PowerShell', href: '2-18-web-requests.html', keywords: 'web invoke-webrequest api rest' },
    { title: 'Background Jobs', section: 'PowerShell', href: '2-19-background-jobs.html', keywords: 'jobs background parallel runspaces' },
    { title: 'DSC Basics', section: 'PowerShell', href: '2-20-dsc-basics.html', keywords: 'dsc desired state configuration compliance' },
    
    // Section 3: Bash Scripting
    { title: 'Bash Introduction', section: 'Bash', href: '3-1-bash-intro.html', keywords: 'bash shell linux unix wsl' },
    { title: 'Bash Basics', section: 'Bash', href: '3-2-bash-basics.html', keywords: 'bash script shebang chmod executable' },
    { title: 'Bash Variables', section: 'Bash', href: '3-3-bash-variables.html', keywords: 'variables environment special substitution' },
    { title: 'Bash Strings', section: 'Bash', href: '3-4-bash-strings.html', keywords: 'strings quotes heredoc manipulation' },
    { title: 'Bash Arrays', section: 'Bash', href: '3-5-bash-arrays.html', keywords: 'arrays indexed associative loop' },
    { title: 'Bash Conditionals', section: 'Bash', href: '3-6-bash-conditionals.html', keywords: 'if elif else test conditional' },
    { title: 'Bash Loops', section: 'Bash', href: '3-7-bash-loops.html', keywords: 'for while until loop break continue' },
    { title: 'Bash Functions', section: 'Bash', href: '3-8-bash-functions.html', keywords: 'functions arguments return local' },
    { title: 'I/O Redirection', section: 'Bash', href: '3-9-bash-io-redirection.html', keywords: 'stdin stdout stderr redirect pipe tee' },
    { title: 'Text Processing', section: 'Bash', href: '3-10-text-processing.html', keywords: 'grep sed awk cut sort uniq' },
    { title: 'Bash Regex', section: 'Bash', href: '3-11-bash-regex.html', keywords: 'regex egrep pattern matching' },
    { title: 'Bash Networking', section: 'Bash', href: '3-12-bash-networking.html', keywords: 'curl wget netcat nc nmap' },
    { title: 'System Administration', section: 'Bash', href: '3-13-bash-system-admin.html', keywords: 'user process cron systemd admin' },
    { title: 'Security Tools Integration', section: 'Bash', href: '3-14-bash-security-tools.html', keywords: 'security tools automation scanning' },
    { title: 'Bash Best Practices', section: 'Bash', href: '3-15-bash-best-practices.html', keywords: 'shellcheck best practices security' },
    
    // Section 4: Batch/CMD
    { title: 'Batch Introduction', section: 'Batch', href: '4-1-batch-intro.html', keywords: 'batch cmd bat command legacy' },
    { title: 'Batch Basics', section: 'Batch', href: '4-2-batch-basics.html', keywords: 'echo off rem variables delayed expansion' },
    { title: 'Batch Commands', section: 'Batch', href: '4-3-batch-commands.html', keywords: 'commands copy move del ping ipconfig' },
    { title: 'Batch Control Flow', section: 'Batch', href: '4-4-batch-control-flow.html', keywords: 'if for goto call subroutine' },
    { title: 'Batch Arguments', section: 'Batch', href: '4-5-batch-arguments.html', keywords: 'arguments parameters shift parsing' },
    { title: 'Batch Error Handling', section: 'Batch', href: '4-6-batch-errorhandling.html', keywords: 'errorlevel exit code error handling' },
    { title: 'Batch Security Tasks', section: 'Batch', href: '4-7-batch-security-tasks.html', keywords: 'security enumeration network service' },
    { title: 'Batch to PowerShell', section: 'Batch', href: '4-8-batch-to-powershell.html', keywords: 'migration powershell conversion hybrid' },
    
    // Section 5: Security Automation
    { title: 'Security Scripting Overview', section: 'Security', href: '5-1-security-scripting-overview.html', keywords: 'security automation ethical documentation' },
    { title: 'Log Analysis Scripts', section: 'Security', href: '5-2-log-analysis-scripts.html', keywords: 'log analysis windows syslog alerting' },
    { title: 'User Audit Scripts', section: 'Security', href: '5-3-user-audit-scripts.html', keywords: 'user audit privilege inactive password' },
    { title: 'Network Security Scripts', section: 'Security', href: '5-4-network-security-scripts.html', keywords: 'network port scanning firewall dns' },
    { title: 'Malware Analysis Scripts', section: 'Security', href: '5-5-malware-analysis-scripts.html', keywords: 'malware hash virustotal ioc pe' },
    { title: 'Incident Response Scripts', section: 'Security', href: '5-6-incident-response-scripts.html', keywords: 'incident response ir evidence timeline' },
    { title: 'Threat Hunting Scripts', section: 'Security', href: '5-7-threat-hunting-scripts.html', keywords: 'threat hunting persistence registry wmi' },
    { title: 'Vulnerability Scripts', section: 'Security', href: '5-8-vulnerability-scripts.html', keywords: 'vulnerability patch cis benchmark' },
    { title: 'Compliance Scripts', section: 'Security', href: '5-9-compliance-scripts.html', keywords: 'compliance policy gpo audit evidence' },
    { title: 'SIEM Integration', section: 'Security', href: '5-10-siem-integration.html', keywords: 'siem splunk sentinel elastic log forwarding' },
    { title: 'EDR Automation', section: 'Security', href: '5-11-edr-automation.html', keywords: 'edr defender crowdstrike cortex xdr' },
    { title: 'Cloud Security Scripts', section: 'Security', href: '5-12-cloud-security-scripts.html', keywords: 'cloud aws azure gcp iam security' },
    { title: 'Email Security Scripts', section: 'Security', href: '5-13-email-security-scripts.html', keywords: 'email exchange phishing header mailbox' },
    { title: 'Reporting Automation', section: 'Security', href: '5-14-reporting-automation.html', keywords: 'reporting html csv pdf email dashboard' },
    { title: 'Orchestration Basics', section: 'Security', href: '5-15-orchestration-basics.html', keywords: 'soar orchestration webhook api workflow' },
    
    // Section 6: Offensive Scripting
    { title: 'Offensive Introduction', section: 'Offensive', href: '6-1-offensive-intro.html', keywords: 'offensive ethical hacking authorization' },
    { title: 'Recon Scripts', section: 'Offensive', href: '6-2-recon-scripts.html', keywords: 'recon osint dns subdomain scanning' },
    { title: 'Exploitation Frameworks', section: 'Offensive', href: '6-3-exploitation-frameworks.html', keywords: 'empire cobalt strike metasploit payload' },
    { title: 'Credential Attacks', section: 'Offensive', href: '6-4-credential-attacks.html', keywords: 'credential password spray mimikatz kerberoasting' },
    { title: 'Lateral Movement', section: 'Offensive', href: '6-5-lateral-movement.html', keywords: 'lateral movement winrm psexec wmi dcom' },
    { title: 'Persistence Techniques', section: 'Offensive', href: '6-6-persistence-techniques.html', keywords: 'persistence registry task service wmi' },
    { title: 'Defense Evasion', section: 'Offensive', href: '6-7-defense-evasion.html', keywords: 'evasion amsi bypass obfuscation lolbins' },
    { title: 'Data Exfiltration', section: 'Offensive', href: '6-8-data-exfiltration.html', keywords: 'exfiltration transfer dns http encoding' },
    { title: 'AD Attacks', section: 'Offensive', href: '6-9-ad-attacks.html', keywords: 'ad active directory bloodhound dcsync golden' },
    { title: 'Detection Engineering', section: 'Offensive', href: '6-10-detection-engineering.html', keywords: 'detection sigma rules red blue' },
    
    // Section 7: Defensive Scripting
    { title: 'Defensive Overview', section: 'Defensive', href: '7-1-defensive-overview.html', keywords: 'defensive automation proactive reactive' },
    { title: 'Hardening Scripts', section: 'Defensive', href: '7-2-hardening-scripts.html', keywords: 'hardening windows linux cis baseline' },
    { title: 'Monitoring Scripts', section: 'Defensive', href: '7-3-monitoring-scripts.html', keywords: 'monitoring process file registry network' },
    { title: 'Detection Scripts', section: 'Defensive', href: '7-4-detection-scripts.html', keywords: 'detection ioc yara behavior anomaly' },
    { title: 'Response Automation', section: 'Defensive', href: '7-5-response-automation.html', keywords: 'response containment isolation evidence' },
    { title: 'Recovery Scripts', section: 'Defensive', href: '7-6-recovery-scripts.html', keywords: 'recovery restore backup cleanup validation' },
    { title: 'Threat Intel Scripts', section: 'Defensive', href: '7-7-threat-intel-scripts.html', keywords: 'threat intel ioc feed blocking enrichment' },
    { title: 'Hunting Playbooks', section: 'Defensive', href: '7-8-hunting-playbooks.html', keywords: 'hunting playbook data collection analysis' },
    
    // Section 8: Real-World Projects
    { title: 'SOC Toolkit Project', section: 'Projects', href: '8-1-project-soc-toolkit.html', keywords: 'soc toolkit automation menu' },
    { title: 'IR Collector Project', section: 'Projects', href: '8-2-project-ir-collector.html', keywords: 'ir incident response collector evidence' },
    { title: 'Vulnerability Scanner Project', section: 'Projects', href: '8-3-project-vuln-scanner.html', keywords: 'vulnerability scanner configuration reporting' },
    { title: 'Log Analyzer Project', section: 'Projects', href: '8-4-project-log-analyzer.html', keywords: 'log analyzer pattern alert dashboard' },
    { title: 'AD Auditor Project', section: 'Projects', href: '8-5-project-ad-auditor.html', keywords: 'ad auditor privilege configuration html' },
    { title: 'Network Monitor Project', section: 'Projects', href: '8-6-project-network-monitor.html', keywords: 'network monitor baseline alert historical' },
    { title: 'Phishing Analyzer Project', section: 'Projects', href: '8-7-project-phishing-analyzer.html', keywords: 'phishing email header url attachment' },
    { title: 'Compliance Checker Project', section: 'Projects', href: '8-8-project-compliance-checker.html', keywords: 'compliance checker framework evidence gap' },
    
    // Section 9: Cross-Platform
    { title: 'Cross-Platform Overview', section: 'Cross-Platform', href: '9-1-cross-platform-overview.html', keywords: 'cross platform powershell core wsl ssh' },
    { title: 'PS & Bash Integration', section: 'Cross-Platform', href: '9-2-ps-bash-integration.html', keywords: 'powershell bash integration hybrid' },
    { title: 'API Scripting', section: 'Cross-Platform', href: '9-3-api-scripting.html', keywords: 'api rest json authentication rate' },
    { title: 'Database Scripting', section: 'Cross-Platform', href: '9-4-database-scripting.html', keywords: 'database sql mysql postgresql sqlite' },
    { title: 'Container Scripting', section: 'Cross-Platform', href: '9-5-container-scripting.html', keywords: 'docker kubernetes container security deploy' },
    { title: 'CI/CD Integration', section: 'Cross-Platform', href: '9-6-ci-cd-integration.html', keywords: 'cicd github actions azure devops jenkins' },
    
    // Section 10: Best Practices
    { title: 'Coding Standards', section: 'Reference', href: '10-1-coding-standards.html', keywords: 'coding standards naming structure documentation' },
    { title: 'Security Considerations', section: 'Reference', href: '10-2-security-considerations.html', keywords: 'security credential signing policy audit' },
    { title: 'Performance Optimization', section: 'Reference', href: '10-3-performance-optimization.html', keywords: 'performance memory parallel large dataset' },
    { title: 'Testing & Validation', section: 'Reference', href: '10-4-testing-validation.html', keywords: 'testing pester tdd validation framework' },
    { title: 'Cheat Sheets', section: 'Reference', href: '10-5-cheat-sheets.html', keywords: 'cheat sheet powershell bash batch commands' },
    { title: 'Interview Preparation', section: 'Reference', href: '10-6-interview-preparation.html', keywords: 'interview questions exercises portfolio' }
];

function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchModal = document.getElementById('searchModal');
    const searchModalInput = document.getElementById('searchModalInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput) return;
    
    // Open modal on sidebar search focus
    searchInput.addEventListener('focus', function() {
        openSearchModal();
    });
    
    // Ctrl+K / Cmd+K shortcut
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearchModal();
        }
        
        // Close on Escape
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearchModal();
        }
    });
    
    // Close modal on backdrop click
    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }
    
    // Search input handler
    if (searchModalInput) {
        searchModalInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            displaySearchResults(query);
        });
        
        // Navigation with arrow keys
        searchModalInput.addEventListener('keydown', function(e) {
            const items = searchResults.querySelectorAll('.search-result-item');
            const activeItem = searchResults.querySelector('.search-result-item.active');
            let currentIndex = Array.from(items).indexOf(activeItem);
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentIndex < items.length - 1) {
                    items[currentIndex]?.classList.remove('active');
                    items[currentIndex + 1]?.classList.add('active');
                    items[currentIndex + 1]?.scrollIntoView({ block: 'nearest' });
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentIndex > 0) {
                    items[currentIndex]?.classList.remove('active');
                    items[currentIndex - 1]?.classList.add('active');
                    items[currentIndex - 1]?.scrollIntoView({ block: 'nearest' });
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const active = searchResults.querySelector('.search-result-item.active');
                if (active) {
                    window.location.href = active.dataset.href;
                }
            }
        });
    }
}

function openSearchModal() {
    const searchModal = document.getElementById('searchModal');
    const searchModalInput = document.getElementById('searchModalInput');
    
    if (searchModal) {
        searchModal.classList.add('active');
        searchModalInput?.focus();
        displaySearchResults('');
    }
}

function closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    const searchModalInput = document.getElementById('searchModalInput');
    
    if (searchModal) {
        searchModal.classList.remove('active');
        if (searchModalInput) {
            searchModalInput.value = '';
        }
    }
}

function displaySearchResults(query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    let results = searchIndex;
    
    if (query) {
        results = searchIndex.filter(item => {
            const searchText = `${item.title} ${item.section} ${item.keywords}`.toLowerCase();
            return query.split(' ').every(term => searchText.includes(term));
        });
    }
    
    // Limit to 10 results
    results = results.slice(0, 10);
    
    searchResults.innerHTML = results.map((item, index) => `
        <div class="search-result-item ${index === 0 ? 'active' : ''}" data-href="${item.href}">
            <span class="search-result-icon">📄</span>
            <div>
                <div class="search-result-title">${item.title}</div>
                <div class="search-result-section">${item.section}</div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', function() {
            window.location.href = this.dataset.href;
        });
    });
}

/* ─────────────────────────────────────────────────────────────────────────────
   Copy Button Functionality
   ───────────────────────────────────────────────────────────────────────────── */
function initializeCopyButtons() {
    const codeContainers = document.querySelectorAll('.code-container');
    
    codeContainers.forEach(container => {
        const copyBtn = container.querySelector('.code-copy-btn');
        const codeBlock = container.querySelector('.code-block code, .code-block pre');
        
        if (copyBtn && codeBlock) {
            copyBtn.addEventListener('click', async function() {
                const text = codeBlock.textContent;
                
                try {
                    await navigator.clipboard.writeText(text);
                    
                    // Visual feedback
                    const originalHTML = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<span>✓</span> Copied!';
                    copyBtn.classList.add('copied');
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = originalHTML;
                        copyBtn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    
                    // Fallback for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.select();
                    
                    try {
                        document.execCommand('copy');
                        copyBtn.innerHTML = '<span>✓</span> Copied!';
                        copyBtn.classList.add('copied');
                        
                        setTimeout(() => {
                            copyBtn.innerHTML = '<span>📋</span> Copy';
                            copyBtn.classList.remove('copied');
                        }, 2000);
                    } catch (e) {
                        console.error('Fallback copy failed:', e);
                    }
                    
                    document.body.removeChild(textarea);
                }
            });
        }
    });
}

/* ─────────────────────────────────────────────────────────────────────────────
   Mobile Toggle
   ───────────────────────────────────────────────────────────────────────────── */
function initializeMobileToggle() {
    const toggle = document.querySelector('.mobile-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggle && sidebar) {
        toggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            
            // Update icon
            this.innerHTML = sidebar.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !toggle.contains(e.target)) {
                sidebar.classList.remove('active');
                toggle.innerHTML = '☰';
            }
        });
    }
}

/* ─────────────────────────────────────────────────────────────────────────────
   Syntax Highlighting Helper
   ───────────────────────────────────────────────────────────────────────────── */
function highlightPowerShell(code) {
    // Keywords
    const keywords = ['function', 'param', 'begin', 'process', 'end', 'if', 'else', 'elseif', 
                     'switch', 'for', 'foreach', 'while', 'do', 'until', 'try', 'catch', 
                     'finally', 'throw', 'return', 'break', 'continue', 'exit', 'class',
                     'enum', 'filter', 'trap', 'data', 'in', 'workflow'];
    
    // Cmdlets (common ones)
    const cmdlets = ['Get-', 'Set-', 'New-', 'Remove-', 'Add-', 'Clear-', 'Write-', 'Read-',
                    'Out-', 'Start-', 'Stop-', 'Invoke-', 'Test-', 'Update-', 'Import-',
                    'Export-', 'ConvertTo-', 'ConvertFrom-', 'Where-', 'Select-', 'Sort-',
                    'Group-', 'Measure-', 'Compare-', 'Format-', 'Enable-', 'Disable-'];
    
    let highlighted = code
        // Comments
        .replace(/(#.*)$/gm, '<span class="token-comment">$1</span>')
        // Strings
        .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="token-string">$1</span>')
        .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="token-string">$1</span>')
        // Variables
        .replace(/(\$[\w]+)/g, '<span class="token-variable">$1</span>')
        // Numbers
        .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');
    
    // Keywords
    keywords.forEach(kw => {
        const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
        highlighted = highlighted.replace(regex, '<span class="token-keyword">$1</span>');
    });
    
    return highlighted;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Smooth Scroll for Anchor Links
   ───────────────────────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ─────────────────────────────────────────────────────────────────────────────
   Table of Contents Auto-Generation (optional)
   ───────────────────────────────────────────────────────────────────────────── */
function generateTableOfContents() {
    const toc = document.getElementById('tableOfContents');
    const content = document.querySelector('.content-wrapper');
    
    if (!toc || !content) return;
    
    const headings = content.querySelectorAll('h2, h3');
    const tocItems = [];
    
    headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        heading.id = id;
        
        tocItems.push({
            id: id,
            text: heading.textContent,
            level: heading.tagName
        });
    });
    
    toc.innerHTML = tocItems.map(item => `
        <a href="#${item.id}" class="toc-link ${item.level === 'H3' ? 'toc-link-sub' : ''}">
            ${item.text}
        </a>
    `).join('');
}
