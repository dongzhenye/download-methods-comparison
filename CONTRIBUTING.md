# Contributing to Download Methods Comparison

Thank you for your interest in contributing to Download Methods Comparison! We welcome contributions from the community.

## How to Contribute

### Reporting Issues

- Check if the issue has already been reported
- Use the issue templates when available
- Include steps to reproduce the issue
- Provide system information (OS, browser version, etc.)

### Submitting Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/dongzhenye/download-methods-comparison.git
   cd download-methods-comparison
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature"
   ```
   
   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding or updating tests
   - `chore:` Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Ensure all checks pass

### Development Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development server:
   ```bash
   pnpm run dev
   ```

3. Run linting:
   ```bash
   pnpm run lint
   ```

### Code Style Guidelines

- Use ES6+ features
- Follow React hooks best practices
- Keep components small and focused
- Add appropriate comments for complex logic
- Use meaningful variable and function names

### Adding New Download Methods

If you want to add a new download method:

1. Add the method configuration in `App.jsx`
2. Implement the download handler function
3. Update the comparison table in both code and README
4. Add appropriate error handling
5. Test in different scenarios

### Translations

We welcome translations! To add a new language:

1. Update the README with your language section
2. Keep the structure consistent with existing translations
3. Ensure technical terms are accurately translated

## Questions?

Feel free to open an issue if you have any questions about contributing.

Thank you for contributing! 🎉