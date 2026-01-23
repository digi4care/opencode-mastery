# Security Checklist

## ✅ Completed

- [x] **SECURITY.md** - Security policy and vulnerability reporting
- [x] **Privacy Policy** - No data collection (local-only operation)

## 🔄 To Configure Manually

### Branch Protection (Main Branch)

Go to: https://github.com/digi4care/opencode-mastery/settings/branches

**Recommended Settings:**

1. **Require pull request reviews before merging**
   - Required approving reviews: **1**
   - Dismiss stale reviews when new commits are pushed: **✓**

2. **Require status checks to pass before merging**
   - Skip for now (no CI/CD yet)
   - Future: Add GitHub Actions with tests

3. **Restrict who can push to main branch**
   - Only allow admins: **✓**

4. **Do not allow bypassing**
   - Allow administrators: **✗** (uncheck this)

### Why Branch Protection?

- Prevents accidental deletions of main branch
- Requires code review for all changes
- Maintains quality of merged code
- Adds accountability for changes

## 🔒 Other Security Measures

### Code of Conduct

Consider adding `CODEOWNERS` file:
```txt
# Code owners
* @digi4care
*.py @digi4care
```

This ensures the owner approves all changes.

### Dependabot (Future)

For dependency security updates:
- Enable Dependabot alerts in repo settings
- Add `dependabot.yml` configuration
- Automate security patches

### Dependency Scanning

This project has minimal dependencies:
- Python 3.x (standard library only)
- curl, bash (system tools)

No dependency scanning needed for core functionality.

## 📋 Security Status

| Measure | Status |
|----------|--------|
| Vulnerability reporting | ✅ Documented |
| Branch protection | ⏳ Manual setup required |
| Private data collection | ✅ None (local-only) |
| Third-party services | ✅ GitHub only |
| Dependency updates | ⏳ To add |
| Code scanning | ⏳ No CI yet |

## 🚀 Next Steps

1. **Set up branch protection** via web interface
2. **Enable Dependabot** (optional)
3. **Add CI/CD** with GitHub Actions (future)
4. **Monitor security advisories** in GitHub
