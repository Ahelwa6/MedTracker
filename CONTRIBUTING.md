# Contributing to MedTrack

Thank you for considering contributing to MedTrack! This document provides guidelines for contributing to the project.

## 🎯 Ways to Contribute

- **Bug Reports**: Report issues or bugs
- **Feature Requests**: Suggest new features
- **Code Contributions**: Submit pull requests
- **Documentation**: Improve docs and guides
- **Medical Data**: Help verify drug interaction data

## 🐛 Reporting Bugs

Before submitting a bug report:
1. Check existing issues to avoid duplicates
2. Use the latest version of the app
3. Verify it's actually a bug and not a feature

**Bug Report Template**:
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- Browser: [e.g., Chrome, Safari]
- Version: [e.g., 1.0.0]
- OS: [e.g., macOS, Windows]
```

## 💡 Feature Requests

**Feature Request Template**:
```markdown
**Feature Description**
Clear description of the feature.

**Problem it Solves**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other solutions you've thought about.
```

## 🔧 Code Contributions

### Development Setup

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/yourusername/medtrack-app.git
```

3. Create a branch:
```bash
git checkout -b feature/your-feature-name
```

4. Install dependencies:
```bash
npm install
```

5. Start dev server:
```bash
npm run dev
```

### Code Style Guidelines

- **JavaScript/React**:
  - Use functional components
  - Use hooks for state management
  - Follow existing patterns
  - Add comments for complex logic

- **Styling**:
  - Use Tailwind utility classes
  - Follow existing color scheme
  - Ensure mobile responsiveness
  - Test accessibility

- **File Organization**:
  - Components in `src/components/`
  - Utilities in `src/utils/`
  - Data in `src/data/`

### Commit Messages

Follow conventional commits:
```
feat: Add medication reminder feature
fix: Resolve interaction checker bug
docs: Update setup guide
style: Format code with prettier
refactor: Simplify schedule algorithm
test: Add tests for interaction checker
```

### Pull Request Process

1. **Before Submitting**:
   - Test your changes thoroughly
   - Ensure no console errors
   - Update documentation if needed
   - Add comments to complex code

2. **PR Template**:
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile

## Screenshots
If applicable.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added
- [ ] Documentation updated
```

3. **Review Process**:
   - Maintainers will review your PR
   - Address feedback promptly
   - Keep PR focused and small
   - Be patient and respectful

## 🏥 Medical Data Contributions

**IMPORTANT**: All medical data must be:
- From reputable sources (FDA, NIH, peer-reviewed journals)
- Properly cited with sources
- Reviewed by healthcare professionals when possible
- Conservative (err on side of caution)

### Adding Drug Interactions

1. Research thoroughly using:
   - FDA OpenFDA
   - NIH PubMed
   - DrugBank
   - Peer-reviewed journals

2. Add to `src/data/medicationDatabase.js`:
```javascript
{
  drug1: 'medication1',
  drug2: 'medication2',
  severity: 'minor|moderate|severe',
  type: 'interaction type',
  description: 'Clear explanation',
  recommendation: 'What to do',
  sources: ['FDA', 'NIH'],
}
```

3. Include source links in PR description

### Adding Medications

Include:
- Generic and brand names
- Common dosages
- Timing requirements (with food, time of day)
- Side effects
- Source citations

## 📝 Documentation

Help improve:
- README.md
- SETUP_GUIDE.md
- Code comments
- API documentation
- User guides

## 🚫 What NOT to Contribute

- **Medical Advice**: No personalized medical advice
- **Unverified Data**: Must have sources
- **Breaking Changes**: Without discussion first
- **Large Refactors**: Discuss with maintainers first

## ⚠️ Important Disclaimers

By contributing, you agree that:
1. Your contributions do NOT constitute medical advice
2. All data is for informational purposes only
3. You have the right to submit the contribution
4. You license your contribution under the MIT license

## 🎓 Learning Resources

New to open source?
- [First Timers Only](https://www.firsttimersonly.com/)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)

New to React?
- [React Documentation](https://react.dev)
- [React Tutorial](https://react.dev/learn)

## 📞 Questions?

- Open a discussion on GitHub
- Join our community chat (if available)
- Email the maintainers

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Thanked in the community

Thank you for helping make MedTrack better! 💊✨
