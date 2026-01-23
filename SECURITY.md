# Security Policy

## Supported Versions

Currently, only the latest version of OpenCode Mastery Skill is supported.

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

### How to Report

**Do NOT open a public issue.**

Instead, send an email to:
- **Email:** digi4care@users.noreply.github.com
- **Subject:** [Security] OpenCode Mastery Skill - Vulnerability Report

Include the following information:
- Description of the vulnerability
- Steps to reproduce (if applicable)
- Impact assessment
- Suggested fix (if you have one)

### What Happens Next

1. **Confirmation**: You'll receive an acknowledgment within 48 hours
2. **Assessment**: We'll investigate the vulnerability
3. **Fix**: We'll work on a fix and release a security update
4. **Disclosure**: After the fix is released, we'll publicly disclose the vulnerability

### Response Timeline

- Initial response: Within 48 hours
- Fix assessment: Within 7 days
- Security release: As soon as fix is ready
- Public disclosure: After fix is released

## Security Best Practices

For Users

- Only install from official sources:
  - GitHub: https://github.com/digi4care/opencode-mastery
  - NPM: (if published in future)
- Verify checksums (if provided)
- Keep installation updated
- Review the install.sh script before running

For Developers

- Keep dependencies updated
- Review code changes in pull requests
- Follow secure coding practices
- Report vulnerabilities responsibly

## Dependency Security

This project uses minimal dependencies:
- Python 3.x (standard library only)
- curl (for downloading)
- bash (for installation)

### External Services

The skill downloads documentation from:
- GitHub (official OpenCode repository): `https://github.com/anomalyco/opencode`
- GitHub Raw Content: `https://raw.githubusercontent.com/`

All content is cached locally and never sent to third-party services.

## License

This project is open source under the MIT License. Security fixes follow the same license terms.

## Contact

For security-related questions:
- Email: digi4care@users.noreply.github.com
- GitHub: https://github.com/digi4care/opencode-mastery/security/advisories

For non-security issues:
- Open a regular issue: https://github.com/digi4care/opencode-mastery/issues
- Discussions: https://github.com/digi4care/opencode-mastery/discussions
